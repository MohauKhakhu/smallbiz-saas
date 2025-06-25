import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Tabs,
  Tab
} from '@mui/material';
import { Add, PictureAsPdf, Receipt } from '@mui/icons-material';
import InvoiceList from '../Components/invoices/InvoiceList';
import InvoiceForm from '../Components/invoices/InvoiceForm'; // Use correct casing for 'Components'

const Invoices = () => {
  const [tabValue, setTabValue] = useState('list');
  const [editingInvoice, setEditingInvoice] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditInvoice = (invoice) => {
    setEditingInvoice(invoice);
    setTabValue('form');
  };

  const handleFormSubmit = () => {
    setTabValue('list');
    setEditingInvoice(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h4" sx={{ color: 'primary.main' }}>
          Invoice Management
        </Typography>
        {tabValue === 'list' && (
          <Button 
            variant="contained" 
            color="secondary" 
            startIcon={<Add />}
            onClick={() => {
              setEditingInvoice(null);
              setTabValue('form');
            }}
          >
            Create Invoice
          </Button>
        )}
      </Box>

      <Tabs 
        value={tabValue} 
        onChange={handleTabChange}
        sx={{ mb: 3 }}
      >
        <Tab value="list" label="Invoice List" />
        <Tab value="form" label={editingInvoice ? 'Edit Invoice' : 'Create Invoice'} />
      </Tabs>

      {tabValue === 'list' ? (
        <InvoiceList onEdit={handleEditInvoice} />
      ) : (
        <InvoiceForm 
          invoice={editingInvoice}
          onSave={handleFormSubmit}
          onCancel={() => setTabValue('list')}
        />
      )}
    </Box>
  );
};

export default Invoices;