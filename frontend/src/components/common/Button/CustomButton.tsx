import React from "react";
import { Button, SxProps, Theme } from "@mui/material";
import { Link } from "react-router-dom";

interface CustomButtonProps {
  to?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void> ;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  to,
  onClick,
  children,
  sx,
  size = "small",
  disabled = false,
}) => {
  const commonStyles: SxProps<Theme> = {
    borderRadius: 50,
    background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
    textTransform: "none",
    fontWeight: "bold",
    px: 4,
    py: 1.2,
    "&:hover": {
      background: "linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)",
    },
    ...((sx as object) || {}),
  };

  if (to) {
    return (
      <Button
        component={Link}
        to={to}
        variant="contained"
        size={size}
        disabled={disabled}
        sx={commonStyles}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      size={size}
      disabled={disabled}
      sx={commonStyles}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
