import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import { Add, Assessment, Inventory as InventoryIcon } from '@mui/icons-material';

// Import components with fallbacks
let InventoryList, InventoryForm, InventoryReport;

try {
  InventoryList = require('../components/inventory/InventoryList').default;
} catch {
  InventoryList = () => (
    <Paper sx={{ p: 3, textAlign: 'center' }}>
      <Typography>Inventory List component not found</Typography>
    </Paper>
  );
}

try {
  InventoryForm = require('../components/inventory/InventoryForm').default;
} catch {
  InventoryForm = () => (
    <Paper sx={{ p: 3, textAlign: 'center' }}>
      <Typography>Inventory Form component not found</Typography>
    </Paper>
  );
}

try {
  InventoryReport = require('../components/inventory/InventoryReport').default;
} catch {
  InventoryReport = () => (
    <Paper sx={{ p: 3, textAlign: 'center' }}>
      <Typography>Inventory Report component not found</Typography>
    </Paper>
  );
}

const Inventory = () => {
  const [tabValue, setTabValue] = useState('list');
  const [editingItem, setEditingItem] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setTabValue('form');
  };

  const handleFormSubmit = () => {
    setTabValue('list');
    setEditingItem(null);
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
          Inventory Management
        </Typography>
        {tabValue === 'list' && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<Assessment />}
              onClick={() => setTabValue('report')}
            >
              Reports
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              startIcon={<Add />}
              onClick={() => {
                setEditingItem(null);
                setTabValue('form');
              }}
            >
              Add Item
            </Button>
          </Box>
        )}
      </Box>

      <Tabs 
        value={tabValue} 
        onChange={handleTabChange}
        sx={{ mb: 3 }}
      >
        <Tab value="list" label="Inventory List" />
        <Tab value="form" label={editingItem ? 'Edit Item' : 'Add Item'} />
        <Tab value="report" label="Inventory Report" />
      </Tabs>

      {tabValue === 'list' ? (
        <InventoryList onEdit={handleEditItem} />
      ) : tabValue === 'form' ? (
        <InventoryForm 
          item={editingItem}
          onSave={handleFormSubmit}
          onCancel={() => setTabValue('list')}
        />
      ) : (
        <InventoryReport />
      )}
    </Box>
  );
};

export default Inventory;