import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';

const ClientList = ({ clients = [], onEdit = () => {}, onDelete = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = Array.isArray(clients)
    ? clients.filter(
        (client) =>
          client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <Box>
      <TextField
        fullWidth
        label="Search clients..."
        variant="outlined"
        size="small"
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />,
        }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.light' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Phone</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography align="center">No clients found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name || 'N/A'}</TableCell>
                  <TableCell>{client.email || 'N/A'}</TableCell>
                  <TableCell>{client.phone || 'N/A'}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => onEdit(client)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => onDelete(client.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClientList;