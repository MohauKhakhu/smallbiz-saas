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
  Grid
} from '@mui/material';
import { PictureAsPdf, Print, ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const InventoryReport = ({ inventory }) => {
  // Calculate summary data
  const totalItems = inventory.length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const lowStock = inventory.filter(item => item.quantity < 10).length;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button 
          component={Link} 
          to="/inventory" 
          startIcon={<ArrowBack />}
        >
          Back to Inventory
        </Button>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            color="secondary"
            startIcon={<PictureAsPdf />}
          >
            Export PDF
          </Button>
          <Button 
            variant="outlined"
            startIcon={<Print />}
          >
            Print Report
          </Button>
        </Box>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
          Inventory Summary Report
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Total Items</Typography>
              <Typography variant="h3" sx={{ color: 'primary.main' }}>{totalItems}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Total Value</Typography>
              <Typography variant="h3" sx={{ color: 'primary.main' }}>
                ${totalValue.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Low Stock Items</Typography>
              <Typography variant="h3" sx={{ color: lowStock > 0 ? 'error.main' : 'primary.main' }}>
                {lowStock}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
          Detailed Inventory
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: 'primary.light' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Product</TableCell>
                <TableCell sx={{ color: 'white' }}>SKU</TableCell>
                <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
                <TableCell sx={{ color: 'white' }}>Price</TableCell>
                <TableCell sx={{ color: 'white' }}>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell sx={{ 
                    color: item.quantity < 10 ? 'error.main' : 'inherit',
                    fontWeight: item.quantity < 10 ? 'bold' : 'normal'
                  }}>
                    {item.quantity}
                  </TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default InventoryReport;