// components/CustomSnackbar.tsx

import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import { Stack, Button,Typography } from "@mui/material";
interface AlertProps {
  onClose: () => void;
  severity: AlertColor;
  sx: object;
  children: React.ReactNode; // Add this line
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props: AlertProps,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface CustomSnackbarProps {
  open: boolean;
  onClose: () => void;
  severity: AlertColor; // "error" | "info" | "success" | "warning"
  message: string;
  duration?: number;
  actionButtons?: { label: string; onClick: () => void }[];
}

export default function CustomSnackbar({
  open,
  onClose,
  severity = "info",
  message,
  duration = 800,
  actionButtons = [],
}: CustomSnackbarProps) {
  return (
<Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      ContentProps={{
        sx: {
          padding: 0, // Bỏ hết padding mặc định
        },
      }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          padding: 1.5,
          maxWidth: "320px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          boxShadow: 3,
          minHeight: "auto", // ép auto chiều cao
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            mb: actionButtons.length > 0 ? 1 : 0,
            textAlign: "center",
            wordWrap: "break-word",
            fontWeight: 500,
          }}
        >
          {message}
        </Typography>

        {actionButtons.length > 0 && (
          <Stack direction="row" spacing={1.5} justifyContent="center">
            {actionButtons.map((btn, idx) => (
              <Button
                key={idx}
                variant="text"
                color="inherit"
                size="small"
                onClick={btn.onClick}
                sx={{
                  borderRadius: 2,
                  fontSize: "0.75rem",
                  padding: "4px 8px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                {btn.label}
              </Button>
            ))}
          </Stack>
        )}
      </Alert>
    </Snackbar>


  );
}
