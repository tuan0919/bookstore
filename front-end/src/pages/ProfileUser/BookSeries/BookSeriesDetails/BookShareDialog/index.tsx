import React from "react";
import {
  Dialog, DialogTitle, DialogContent, TextField,
  Button, IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

export default function BookShareDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Chia sẻ đường dẫn
        <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField fullWidth value={window.location.href} InputProps={{ readOnly: true }} />
        <Button fullWidth variant="outlined" sx={{ mt: 2 }} onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          onClose();
          alert("Đã copy đường dẫn!");
        }}>
          Sao chép đường dẫn
        </Button>
      </DialogContent>
    </Dialog>
  );
}

BookShareDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
