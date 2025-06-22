import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import PropTypes from "prop-types";

export default function BookSeriesDeleteDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Bạn có chắc chắn muốn xóa không?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Không</Button>
        <Button variant="contained" color="error" onClick={onConfirm}>Có</Button>
      </DialogActions>
    </Dialog>
  );
}

BookSeriesDeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
