import React from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Button
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const InventoryReport = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Inventory Report
      </Typography>
      <Typography paragraph>
        Inventory report data will be displayed here.
      </Typography>
      <Button 
        variant="outlined" 
        startIcon={<ArrowBack />}
      >
        Back to Inventory
      </Button>
    </Paper>
  );
};

export default InventoryReport;