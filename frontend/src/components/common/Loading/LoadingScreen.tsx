import { CircularProgress, Box, Typography, Button } from "@mui/material";

interface LoadingScreenProps {
  loading: boolean;
  error?: string;
  onErrorConfirm?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  loading,
  error,
  onErrorConfirm,
}) => {
  if (!loading && !error) return null; // Do not render if neither loading nor error exists

  return (
    <div style={{marginTop: "10rem"}}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
          flexDirection: "column",
        }}
      >
        {error ? (
          <>
            <Typography color="error" variant="h6" sx={{ mb: 2 }}>
              {error}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={onErrorConfirm}
            >
              OK
            </Button>
          </>
        ) : (
          <CircularProgress size="3rem" color="primary" />
        )}
      </Box>
    </div>
  );
};

export default LoadingScreen;
