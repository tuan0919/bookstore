import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Box, TextField, Button, IconButton, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

export default function BookSeriesEditDialog({ open, onClose, book, setBooks }) {
  const [title, setTitle] = useState("");
  const [privacy, setPrivacy] = useState("public");

  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setPrivacy(book.isPrivate ? "private" : "public");
    }
  }, [book]);

  const handleSave = () => {
    const updatedBook = {
      ...book,
      title,
      isPrivate: privacy === "private"
    };

    setBooks((prev) =>
      prev.map((b) => (b.id === book.id ? updatedBook : b))
    );

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Chỉnh sửa sách
        <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {book && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <img
                src={book.image}
                alt="cover"
                style={{ width: "100%", borderRadius: 8 }}
              />
            </Box>
            <Box sx={{ flex: 2 }}>
              <TextField
                fullWidth
                label="Tiêu đề"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                inputProps={{ maxLength: 150 }}
                helperText={`${title?.length || 0}/150`}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth>
                <InputLabel>Quyền riêng tư</InputLabel>
                <Select
                  value={privacy}
                  label="Quyền riêng tư"
                  onChange={(e) => setPrivacy(e.target.value)}
                >
                  <MenuItem value="public">Công khai</MenuItem>
                  <MenuItem value="private">Riêng tư</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={handleSave}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}

BookSeriesEditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  book: PropTypes.object,
  setBooks: PropTypes.func.isRequired,
};
