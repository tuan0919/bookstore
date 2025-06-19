import React, { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";

import BookSeriesDetails from "./BookSeriesDetails";
import { BOOK_SETS } from "./BookSeriesDetails/data";



// Dropdown sắp xếp
function SortSelect({ sortBy, onSortChange }) {
  return (
    <FormControl size="small" sx={{ minWidth: 140 }}>
      <InputLabel id="sort-label">Sắp xếp</InputLabel>
      <Select
        labelId="sort-label"
        label="Sắp xếp"
        value={sortBy}
        onChange={e => onSortChange(e.target.value)}
      >
        <MenuItem value="az">A → Z</MenuItem>
        <MenuItem value="za">Z → A</MenuItem>
        <MenuItem value="newest">Mới nhất</MenuItem>
        <MenuItem value="oldest">Cũ nhất</MenuItem>
      </Select>
    </FormControl>
  );
}

SortSelect.propTypes = {
  sortBy: PropTypes.oneOf(["az", "za", "newest", "oldest"]).isRequired,
  onSortChange: PropTypes.func.isRequired
};

// 1 bộ thẻ sách
function BookCard({ book, onSelect, onEdit, onDelete }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [title, setTitle] = useState(book.title);
  const [privacy, setPrivacy] = useState(book.isPrivate ? "private" : "public");

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleEdit = () => {
    setEditDialogOpen(true);
    handleMenuClose(); // đóng menu sau khi bấm chỉnh sửa
  };

  const handleDelete = () => {
    handleMenuClose();
    setConfirmDeleteOpen(true);
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleSave = () => {
    onEdit({
      ...book,
      title,
      isPrivate: privacy === "private",
    });
    setEditDialogOpen(false);
  };

  return (
    <>
      <Card
        onClick={() => onSelect(book)}
        sx={{
          width: 185,
          height: 250,
          m: 1,
          position: "relative",
          transition: "transform 0.2s",
          "&:hover": { transform: "scale(1.03)" }
        }}
      >
        {/* Badge */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            bgcolor: book.isPrivate ? "grey.700" : "success.main",
            color: "#fff",
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: "0.75rem",
            zIndex: 1
          }}
        >
          {book.isPrivate ? "Riêng tư" : "Công khai"}
        </Box>

        {/* Số quyển */}
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            left: 8,
            bgcolor: "rgba(0,0,0,0.6)",
            color: "#fff",
            px: 1,
            borderRadius: 1,
            fontSize: "0.75rem",
            zIndex: 1,
          }}
        >
          {book.count} quyển
        </Box>

        {/* Icon ... */}
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            bottom: 8, // same as số quyển
            right: 8,
            zIndex: 2,
            color: "#000",
            p: 0.5,
            borderRadius: 1,

          }}
          onClick={(e) => {
            e.stopPropagation();
            handleMenuOpen(e);
          }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>


        <CardMedia component="img" height="160" image={book.image} alt={book.title} />

        <CardContent sx={{ pt: 2, pb: 1 }}>
          <Typography variant="subtitle2" sx={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
            {book.title}
          </Typography>
        </CardContent>
      </Card>

      {/* Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>Chỉnh sửa</MenuItem>
        <MenuItem onClick={handleDelete}>Xóa</MenuItem>
      </Menu>

      {/* Chọn Chỉnh sửa */}
      <Dialog open={editDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Chỉnh sửa danh sách phát</span>
          <IconButton onClick={handleDialogClose}><CloseIcon /></IconButton>
        </DialogTitle>

        <DialogContent>
          {/* Bố cục chia 2 cột: ảnh trái + nội dung phải */}
          <Box sx={{ display: "flex", gap: 0.25, mb: 2 }}>
            {/* Cột ảnh */}
            <Box sx={{ flex: "1" }}>
              <img
                src={book.image}
                alt="cover"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "10px",
                  objectFit: "cover"
                }}
              />
            </Box>

            {/* Cột nội dung */}
            <Box sx={{ flex: "2", mt: 2 }}> {/* 👉 Khoảng cách phía trên */}
              {/* Tiêu đề */}
              <TextField
                fullWidth
                label="Tiêu đề"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                inputProps={{ maxLength: 150 }}
                helperText={`${title.length}/150`}
                sx={{ mb: 3 }}
              />

              {/* Chỉnh sửa quyền riêng tư */}
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

          {/* Nút lưu */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleDialogClose} sx={{ mr: 2 }}>Hủy</Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={title === book.title && (privacy === (book.isPrivate ? "private" : "public"))}>
              Lưu
            </Button>
          </Box>
        </DialogContent>

      </Dialog>

      {/* Chọn Xóa */}
      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>Bạn có muốn xóa không?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Hủy</Button>
          <Button onClick={() => {
            onDelete(book);
            setConfirmDeleteOpen(false);
          }} color="error">Xóa</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

// Component chính

export default function BookSeries() {
  const [sortBy, setSortBy] = useState("newest");
  const [seriesList, setSeriesList] = useState(BOOK_SETS);
  const navigate = useNavigate();

  const handleEdit = (updatedBook) => {
    setSeriesList(prev =>
      prev.map(book => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  const handleDelete = (deletedBook) => {
    setSeriesList(prev =>
      prev.filter(book => book.id !== deletedBook.id)
    );
  };

  const handleSelectSeries = (series) => {
    navigate(`/profileUser/book-series/index/${series.id}`);
  };

  const sortedBooks = useMemo(() => {
    return [...seriesList].sort((a, b) => {
      switch (sortBy) {
        case "az": return a.title.localeCompare(b.title);
        case "za": return b.title.localeCompare(a.title);
        case "oldest": return a.id - b.id;
        default: return b.id - a.id;
      }
    });
  }, [sortBy, seriesList]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header + Sort */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">📚 Sách theo bộ</Typography>
        <SortSelect sortBy={sortBy} onSortChange={setSortBy} />
      </Box>

      {/* Danh sách bộ sách */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
          gap: 3,
          justifyItems: "center",
          '@media (min-width: 300px)': {
            gridTemplateColumns: "repeat(4, 1fr)",
          }
        }}
      >
        {sortedBooks.map((series) => (
          <BookCard
            key={series.id}
            book={series}
            onSelect={handleSelectSeries}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </Box>

    </Box>
  );
}

