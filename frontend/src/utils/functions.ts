import React from 'react';

export enum SnackbarSeverity {
  SUCCESS = 'success',
  ERROR = 'error',
}


export function useSnackbar() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState(SnackbarSeverity.SUCCESS);

  const showSnackbar = (message: string, severity = SnackbarSeverity.SUCCESS) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  return {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    showSnackbar,
    handleClose,
  };
}
