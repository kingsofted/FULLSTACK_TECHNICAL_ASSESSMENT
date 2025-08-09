import React from 'react';

export enum SnackbarSeverity {
  SUCCESS = 'success',
  ERROR = 'error',
}

export function useSnackbar() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState(SnackbarSeverity.SUCCESS);
  const callbackRef = React.useRef<(() => void) | null>(null);

  const showSnackbar = (
    message: string,
    severity = SnackbarSeverity.SUCCESS,
    callback?: () => void
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
    callbackRef.current = callback || null; // store callback
  };

  const handleClose = () => {
    setSnackbarOpen(false);
    if (callbackRef.current) {
      callbackRef.current(); // run the stored callback
      callbackRef.current = null; // clear it
    }
  };

  return {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    showSnackbar,
    handleClose,
  };
}
