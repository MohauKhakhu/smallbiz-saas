import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  MenuItem
} from '@mui/material';
import { Save, Cancel, Add, Delete } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';

const InvoiceForm = ({ invoice, clients, inventory, onSave, onCancel }) => {
  const [formData, setFormData] = useState(invoice || {
    clientId: '',
    date: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    items: [],
    notes: ''
  });

  const [newItem, setNewItem] = useState({
    productId: '',
    quantity: 1,
    price: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (name) => (date) => {
    setFormData({
      ...formData,
      [name]: date
    });
  };

  const handleAddItem = () => {
    if (newItem.productId && newItem.quantity > 0) {
      const product = inventory.find(p => p.id === newItem.productId);
      setFormData({
        ...formData,
        items: [
          ...formData.items,
          {
            ...newItem,
            name: product.name,
            price: product.price
          }
        ]
      });
      setNewItem({
        productId: '',
        quantity: 1,
        price: 0
      });
    }
  };

  const handleRemoveItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    });
  };

  const totalAmount = formData.items.reduce(
    (sum, item) => sum + (item.price * item.quantity), 0
  );

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
          {invoice ? 'Edit Invoice' : 'Create New Invoice'}
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Client"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              margin="normal"
            >
              {clients.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <DatePicker
              label="Invoice Date"
              value={formData.date}
              onChange={handleDateChange('date')}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DatePicker
              label="Due Date"
              value={formData.dueDate}
              onChange={handleDateChange('dueDate')}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 2, mb: 1, color: 'primary.main' }}>
              Invoice Items
            </Typography>
            
            <TableContainer component={Paper} sx={{ mb: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formData.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleRemoveItem(index)}>
                          <Delete color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                select
                label="Product"
                value={newItem.productId}
                onChange={(e) => {
                  const product = inventory.find(p => p.id === e.target.value);
                  setNewItem({
                    ...newItem,
                    productId: e.target.value,
                    price: product ? product.price : 0
                  });
                }}
                sx={{ minWidth: 200 }}
              >
                {inventory.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name} (${product.price.toFixed(2)})
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Quantity"
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem({
                  ...newItem,
                  quantity: parseInt(e.target.value) || 0
                })}
                sx={{ width: 100 }}
              />
              <Button 
                variant="contained" 
                startIcon={<Add />}
                onClick={handleAddItem}
              >
                Add Item
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 2, color: 'primary.main' }}>
              Total: ${totalAmount.toFixed(2)}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<Cancel />}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              startIcon={<Save />}
              onClick={() => onSave({
                ...formData,
                total: totalAmount
              })}
            >
              Save Invoice
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default InvoiceForm;