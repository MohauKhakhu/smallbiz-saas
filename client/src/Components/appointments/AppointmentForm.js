import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment
} from '@mui/material';
import { Save, Cancel, Person, CalendarToday, Schedule, LocationOn, Notes, Title } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';

const AppointmentsForm = ({ appointment, clients, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    clientId: '',
    title: '',
    description: '',
    start: new Date(),
    end: new Date(Date.now() + 60 * 60 * 1000), // 1 hour later
    status: 'scheduled',
    location: '',
    notes: ''
  });

  const [validationErrors, setValidationErrors] = useState({});

  // Initialize form with appointment data if provided
  useEffect(() => {
    if (appointment) {
      setFormData({
        ...appointment,
        start: new Date(appointment.start),
        end: new Date(appointment.end)
      });
    }
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear validation error when field changes
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: null
      });
    }
  };

  const handleDateChange = (name) => (date) => {
    setFormData({
      ...formData,
      [name]: date
    });
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.clientId) errors.clientId = 'Client is required';
    if (!formData.title) errors.title = 'Title is required';
    if (!formData.start) errors.start = 'Start time is required';
    if (!formData.end) errors.end = 'End time is required';
    if (formData.end <= formData.start) errors.end = 'End time must be after start time';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave({
        ...formData,
        start: format(formData.start, "yyyy-MM-dd'T'HH:mm:ss"),
        end: format(formData.end, "yyyy-MM-dd'T'HH:mm:ss")
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
          {appointment ? 'Edit Appointment' : 'Schedule New Appointment'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Client Selection */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!validationErrors.clientId}>
                <InputLabel id="client-label">Client</InputLabel>
                <Select
                  labelId="client-label"
                  name="clientId"
                  value={formData.clientId}
                  onChange={handleChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  }
                  required
                >
                  {clients.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.name}
                    </MenuItem>
                  ))}
                </Select>
                {validationErrors.clientId && (
                  <Typography variant="caption" color="error">
                    {validationErrors.clientId}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* Title */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={!!validationErrors.title}
                helperText={validationErrors.title}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Title fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                required
              />
            </Grid>

            {/* Date/Time Pickers */}
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Start Time"
                  value={formData.start}
                  onChange={handleDateChange('start')}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      fullWidth
                      error={!!validationErrors.start}
                      helperText={validationErrors.start}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarToday fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="End Time"
                  value={formData.end}
                  onChange={handleDateChange('end')}
                  minDateTime={formData.start}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      fullWidth
                      error={!!validationErrors.end}
                      helperText={validationErrors.end || "Must be after start time"}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarToday fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            {/* Status */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <Schedule fontSize="small" />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="scheduled">Scheduled</MenuItem>
                  <MenuItem value="confirmed">Confirmed</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Location */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>

            {/* Notes */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                multiline
                rows={2}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Notes fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              <Button 
                variant="outlined" 
                startIcon={<Cancel />}
                onClick={onCancel}
                sx={{ minWidth: 120 }}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                variant="contained" 
                color="secondary" 
                startIcon={<Save />}
                sx={{ minWidth: 180 }}
              >
                {appointment ? 'Update Appointment' : 'Schedule Appointment'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AppointmentsForm;