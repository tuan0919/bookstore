import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, InputBase, Grid, Box, Typography, Button, CardMedia
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";

// Giả lập danh sách allBooks
const allBooks = [
  { id: 100, title: "Sách mới A", image: "https://via.placeholder.com/100" },
  { id: 101, title: "Sách mới B", image: "https://via.placeholder.com/100" },
];

export default function BookAddDialog({ open, onClose, books, setBooks }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const handleAdd = () => {
    if (selectedBook && !books.some((b) => b.id === selectedBook.id)) {
      setBooks([selectedBook, ...books]);
    }
    setSelectedBook(null);
    setSearchTerm("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Tìm kiếm và thêm sách
        <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "24px", px: 2, py: 1, mb: 2 }}>
          <InputBase
            placeholder="Tìm sách theo tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            sx={{ fontSize: 15 }}
          />
          <IconButton><SearchIcon sx={{ color: "red" }} /></IconButton>
        </Box>

        <Grid container spacing={2}>
          {allBooks
            .filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
              !books.some((b) => b.id === book.id))
            .map((book) => (
              <Grid item xs={6} sm={4} md={3} key={book.id}>
                <Box
                  onClick={() => setSelectedBook(book)}
                  sx={{
                    cursor: "pointer",
                    border: selectedBook?.id === book.id ? "2px solid #1976d2" : "1px solid #ccc",
                    borderRadius: 1,
                    p: 1,
                  }}
                >
                  <CardMedia component="img" image={book.image} alt={book.title} sx={{ width: "100%", height: 150, borderRadius: 1 }} />
                  <Typography variant="body2" mt={1}>{book.title}</Typography>
                </Box>
              </Grid>
            ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" disabled={!selectedBook} onClick={handleAdd}>Thêm</Button>
      </DialogActions>
    </Dialog>
  );
}

BookAddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  setBooks: PropTypes.func.isRequired,
};
