// components/CustomSnackbar.tsx

import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";

interface AlertProps {
  onClose: () => void;
  severity: AlertColor;
  sx: object;
  children: React.ReactNode; // Add this line
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props : AlertProps, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface CustomSnackbarProps {
  open: boolean;
  onClose: () => void;
  severity: AlertColor; // "error" | "info" | "success" | "warning"
  message: string;
  duration?: number;
}

export default function CustomSnackbar({
  open,
  onClose,
  severity = "info",
  message,
  duration = 800,
}: CustomSnackbarProps) {
  return (
    <Snackbar
    sx={{
        width: "auto",
        display: "flex",
        justifyContent: "center",
    }}
    open={open} autoHideDuration={duration} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
