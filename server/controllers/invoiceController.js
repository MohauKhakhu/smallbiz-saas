// server/controllers/invoiceController.js
const Invoice = require('../models/Invoice');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateInvoicePDF = async (invoiceId) => {
  const invoice = await Invoice.findById(invoiceId)
    .populate('client')
    .populate('items.product');
  
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  
  // Set up paths
  const uploadsDir = path.join(__dirname, '../../uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }
  
  const filePath = path.join(uploadsDir, `invoice_${invoiceId}.pdf`);
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);
  
  // Add floral design elements
  doc.image(path.join(__dirname, '../assets/floral-design.png'), 50, 45, { width: 50 });
  doc.image(path.join(__dirname, '../assets/floral-design.png'), 500, 45, { width: 50, rotate: 180 });
  
  // Invoice header
  doc.fillColor('#6a0dad')
     .fontSize(20)
     .text('INVOICE', 200, 50, { align: 'center' });
  
  // Client info
  doc.fillColor('#000000')
     .fontSize(12)
     .text(`Invoice #: ${invoice.invoiceNumber}`, 50, 120)
     .text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 50, 140)
     .text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`, 50, 160)
     .text(`Client: ${invoice.client.name}`, 350, 120)
     .text(`Email: ${invoice.client.email}`, 350, 140)
     .text(`Phone: ${invoice.client.phone}`, 350, 160);
  
  // Invoice items table
  let y = 220;
  doc.font('Helvetica-Bold')
     .text('Description', 50, y)
     .text('Quantity', 300, y)
     .text('Price', 400, y)
     .text('Amount', 500, y);
  
  y += 30;
  doc.font('Helvetica');
  invoice.items.forEach(item => {
    doc.text(item.product.name, 50, y)
       .text(item.quantity.toString(), 300, y)
       .text(`$${item.product.price.toFixed(2)}`, 400, y)
       .text(`$${(item.quantity * item.product.price).toFixed(2)}`, 500, y);
    y += 20;
  });
  
  // Total
  y += 20;
  doc.font('Helvetica-Bold')
     .text('Total:', 400, y)
     .text(`$${invoice.total.toFixed(2)}`, 500, y);
  
  // Footer
  doc.fontSize(10)
     .text('Thank you for your business!', 50, 750, { align: 'center' });
  
  doc.end();
  
  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => resolve(filePath));
    writeStream.on('error', reject);
  });
};

exports.generateInvoice = async (req, res) => {
  try {
    const filePath = await generateInvoicePDF(req.params.id);
    res.download(filePath);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating invoice');
  }
};