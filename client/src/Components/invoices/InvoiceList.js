import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Typography
} from '@mui/material';
import { Add, Receipt, Delete } from '@mui/icons-material';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([
    { id: 1, number: 'INV-001', date: '2023-05-15', client: 'Acme Corp', amount: 199.99, status: 'Paid' },
    { id: 2, number: 'INV-002', date: '2023-05-20', client: 'Globex', amount: 299.99, status: 'Pending' }
  ]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
        Invoice Management
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Add />}
        >
          Create Invoice
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.light' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Invoice #</TableCell>
              <TableCell sx={{ color: 'white' }}>Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Client</TableCell>
              <TableCell sx={{ color: 'white' }}>Amount</TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.number}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Box 
                    sx={{ 
                      display: 'inline-block',
                      px: 1,
                      borderRadius: 1,
                      bgcolor: invoice.status === 'Paid' ? 'success.light' : 'warning.light',
                      color: invoice.status === 'Paid' ? 'success.dark' : 'warning.dark'
                    }}
                  >
                    {invoice.status}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Receipt />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InvoiceList;