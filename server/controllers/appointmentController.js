// server/controllers/appointmentController.js
const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');
const twilio = require('twilio');

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Function to send reminders
const sendReminders = async () => {
  const now = new Date();
  const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
  
  const appointments = await Appointment.find({
    dateTime: { $gte: now, $lte: oneHourFromNow },
    reminderSent: false
  }).populate('client');
  
  for (const appointment of appointments) {
    // Email reminder
    if (appointment.client.email) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: appointment.client.email,
        subject: `Reminder: ${appointment.title}`,
        html: `<p>Hello ${appointment.client.name},</p>
               <p>This is a reminder for your appointment at ${appointment.dateTime}.</p>
               <p>Thank you!</p>`
      });
    }
    
    // SMS reminder
    if (appointment.client.phone) {
      await twilioClient.messages.create({
        body: `Reminder: ${appointment.title} at ${appointment.dateTime}`,
        from: process.env.TWILIO_PHONE,
        to: appointment.client.phone
      });
    }
    
    // Mark as reminder sent
    appointment.reminderSent = true;
    await appointment.save();
  }
};

// Run this function periodically (e.g., every 15 minutes)
setInterval(sendReminders, 15 * 60 * 1000);