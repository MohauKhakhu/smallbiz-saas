import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Grid
} from '@mui/material';
import { PictureAsPdf, Print, ArrowBack, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const InvoiceView = ({ invoice, client }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button 
          component={Link} 
          to="/invoices" 
          startIcon={<ArrowBack />}
        >
          Back to Invoices
        </Button>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            color="secondary"
            startIcon={<PictureAsPdf />}
          >
            Download PDF
          </Button>
          <Button 
            variant="outlined"
            startIcon={<Print />}
          >
            Print Invoice
          </Button>
          <Button 
            component={Link}
            to={`/invoices/edit/${invoice.id}`}
            variant="contained"
            startIcon={<Edit />}
          >
            Edit Invoice
          </Button>
        </Box>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ color: 'primary.main' }}>
              INVOICE
            </Typography>
            <Typography variant="h5">
              #{invoice.number}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body1">
              <strong>Date:</strong> {new Date(invoice.date).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              <strong>Due Date:</strong> {new Date(invoice.dueDate).toLocaleDateString()}
            </Typography>
            <Chip 
              label={invoice.status} 
              sx={{ 
                mt: 1,
                backgroundColor: invoice.status === 'Paid' ? 'success.light' : 'warning.light',
                color: invoice.status === 'Paid' ? 'success.dark' : 'warning.dark'
              }} 
            />
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Bill To:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {client.name}
            </Typography>
            <Typography variant="body1">{client.email}</Typography>
            <Typography variant="body1">{client.phone}</Typography>
            <Typography variant="body1">
              {client.address.street}<br />
              {client.address.city}, {client.address.state} {client.address.zip}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ bgcolor: 'primary.light' }}>
                  <TableRow>
                    <TableCell sx={{ color: 'white' }}>Item</TableCell>
                    <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
                    <TableCell sx={{ color: 'white' }}>Price</TableCell>
                    <TableCell sx={{ color: 'white' }}>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoice.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Box sx={{ width: '70%' }}>
                <List>
                  <ListItem>
                    <ListItemText primary="Subtotal" />
                    <Typography>${invoice.subtotal.toFixed(2)}</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Tax (10%)" />
                    <Typography>${(invoice.total * 0.1).toFixed(2)}</Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary={<strong>Total</strong>} />
                    <Typography variant="h6">
                      <strong>${invoice.total.toFixed(2)}</strong>
                    </Typography>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Grid>

          {invoice.notes && (
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
                Notes
              </Typography>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography>{invoice.notes}</Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default InvoiceView;