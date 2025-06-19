import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, CardMedia, Grid, Typography, Chip,
  Stack,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ReplyIcon from "@mui/icons-material/Reply";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import { BOOK_SETS } from "./data";
import AddBookDialog from "./AddBookDialog";

// Dropdown sắp xếp
function SortSelect({ sortBy, onSortChange }) {
  return (
    <FormControl size="small" sx={{ minWidth: 140 }}>
      <InputLabel id="sort-label">Sắp xếp</InputLabel>
      <Select
        labelId="sort-label"
        label="Sắp xếp"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <MenuItem value="az">A-Z</MenuItem>
        <MenuItem value="za">Z-A</MenuItem>
        <MenuItem value="newest">Mới nhất</MenuItem>
        <MenuItem value="oldest">Cũ nhất</MenuItem>
        <MenuItem value="oldest">Ngày xuất bản (mới nhất)</MenuItem>
        <MenuItem value="oldest">Bán chạy nhất</MenuItem>
        <MenuItem value="oldest">Bán chạy nhất</MenuItem>

      </Select>
    </FormControl>
  );
}

SortSelect.propTypes = {
  sortBy: PropTypes.oneOf(["az", "za", "newest", "oldest"]).isRequired,
  onSortChange: PropTypes.func.isRequired,
};

// 1 thẻ sách
function BookCard({ book }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCart = () => {
    setEditDialogOpen(true);
    handleMenuClose(); // đóng menu sau khi bấm chỉnh sửa
  };

  const handleDelete = () => {
    handleMenuClose();
    setDeleteOpen(true);
  };

  return (
    <Box
      sx={{
        position: "relative",
        p: 1,
        borderRadius: 1,
        border: "1px solid #eee",
        bgcolor: "#fff",
      }}
    >
      {/* Bìa sách */}
      <CardMedia
        component="img"
        image={book.image}
        alt={book.title}
        sx={{
          width: "100%",
          height: 220,
          borderRadius: 1,
          objectFit: "cover",
          cursor: "pointer",
        }}
        onClick={() => window.open(book.url, "_blank")}
      />

      {/* Tiêu đề */}
      <Typography
        variant="body2"
        fontWeight="medium"
        mt={1}
        title={book.title}
        sx={{
          whiteSpace: "normal",
          wordBreak: "break-word",
          minHeight: 48, // 👈 để giữ độ cao đều khi tiêu đề ngắn
        }}
      >
        {book.title}
      </Typography>

      {/* Nút menu ở góc dưới phải */}
      <Box
        position="absolute"
        bottom={8}
        right={8}
        zIndex={2}
      >
        <IconButton size="small" onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>

        {/* Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleCart}>Thêm vào giỏ hàng</MenuItem>
          <MenuItem onClick={handleDelete}>Xóa</MenuItem>
        </Menu>

        {/* Dialog xác nhận xóa */}
        <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
          <DialogTitle>Bạn có chắc chắn muốn xóa không?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setDeleteOpen(false)}>Không</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                console.log("Đã xóa sách!");
                setDeleteOpen(false);
              }}
            >
              Có
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );


}

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
};

// Component chính
export default function BookSeriesDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const series = useMemo(() => BOOK_SETS.find((s) => s.id.toString() === id), [id]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newBook, setNewBook] = useState({ title: "", price: "", discount: "", image: "" });

  const [originalBooks, setOriginalBooks] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [allBooks, setAllBooks] = useState([]); // danh sách toàn bộ sách có thể chọn
  const [books, setBooks] = useState([]); const [selectedBookToAdd, setSelectedBookToAdd] = useState(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null); // sách đang chỉnh sửa
  const [title, setTitle] = useState("");
  const [privacy, setPrivacy] = useState("public");

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);

  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    if (series) {
      setOriginalBooks(series.books); // giữ nguyên danh sách gốc
      setBooks(series.books);         // khởi tạo books hiển thị
    }
  }, [series]);

  if (!series) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">Không tìm thấy danh sách sách với ID: {id}</Typography>
      </Box>
    );
  }

  useEffect(() => {
    if (series && books.length === 0) {
      setBooks(series.books);
    }
  }, [series]);

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setTitle(book.title || "");
    setPrivacy(book.isPrivate ? "private" : "public");
    setEditDialogOpen(true);
  };

  const handleSave = () => {
    const updatedBook = {
      ...selectedBook,
      title,
      isPrivate: privacy === "private"
    };

    const updatedBooks = books.map((b) =>
      b.id === selectedBook.id ? updatedBook : b
    );

    setBooks(updatedBooks);
    setEditDialogOpen(false);
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedBook(null);
  };

  const sortedBooks = useMemo(() => {
    const copy = [...books];
    return copy.sort((a, b) => {
      switch (sortBy) {
        case "az":
          return a.title?.toLowerCase().localeCompare(b.title?.toLowerCase());
        case "za":
          return b.title?.toLowerCase().localeCompare(a.title?.toLowerCase());
        case "oldest":
          return (a.releaseDate ?? a.id) - (b.releaseDate ?? b.id);
        case "newest":
        default:
          return (b.releaseDate ?? b.id) - (a.releaseDate ?? a.id);
      }
    });
  }, [books, sortBy]);

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" gap={2} mb={4}>
        <CardMedia
          component="img"
          image={series.image}
          alt={series.title}
          sx={{ width: 130, height: 190, borderRadius: 1 }}
        />
        <Box flex={1} display="flex" flexDirection="column" justifyContent="space-between">
          <Box>
            <Typography fontSize={20} fontWeight="bold" color="text.primary" mb={1}>
              {series.title}
            </Typography>
            <Box display="flex" gap={1} mt={2}>

              {/* Nút thêm */}
              <IconButton size="small" color="primary" onClick={() => setOpenDialog(true)}>
                <AddIcon />
              </IconButton>

              {/* Nút Chỉnh sửa*/}
              <IconButton size="small" color="primary" onClick={handleEditClick} >
                <EditIcon />
              </IconButton>

              {/* Nút Chia sẻ*/}
              <IconButton size="small" color="primary" onClick={() => setOpenShareDialog(true)}>
                <ReplyIcon />
              </IconButton>

              {/* Nút Xóa*/}
              <IconButton size="small" color="primary" onClick={() => setOpenConfirmDelete(true)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Giao diện thêm sách */}
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setSearchTerm("");
          setSelectedBookToAdd(null);
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Tìm kiếm và thêm sách
          <IconButton onClick={() => setOpenDialog(false)} sx={{ position: "absolute", top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {/* Thanh tìm kiếm giống Fahasa */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "24px",
              px: 2,
              py: 1,
              mb: 2,
              bgcolor: "#fff",
            }}
          >
            <InputBase
              placeholder="Tìm sách theo tên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              sx={{ fontSize: 15 }}
            />
            <IconButton>
              <SearchIcon sx={{ color: "red" }} />
            </IconButton>
          </Box>

          {/* Danh sách sách tìm được */}
          <Grid container spacing={2}>
            {allBooks
              .filter((book) =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !books.some((b) => b.id === book.id)
              )
              .map((book) => (
                <Grid item xs={6} sm={4} md={3} key={book.id}>
                  <Box
                    onClick={() => setSelectedBookToAdd(book)}
                    sx={{
                      cursor: "pointer",
                      border: selectedBookToAdd?.id === book.id ? "2px solid #1976d2" : "1px solid #ccc",
                      borderRadius: 1,
                      p: 1,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={book.image}
                      alt={book.title}
                      sx={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 1 }}
                    />
                    <Typography
                      variant="body2"
                      mt={1}
                      sx={{ wordBreak: "break-word", whiteSpace: "normal" }}
                    >
                      {book.title}
                    </Typography>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </DialogContent>

        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button onClick={() => {
            setOpenDialog(false);
            setSearchTerm("");
            setSelectedBookToAdd(null);
          }}>
            Hủy
          </Button>
          <Button
            variant="contained"
            disabled={!selectedBookToAdd}
            onClick={() => {
              if (selectedBookToAdd && !books.some((b) => b.id === selectedBookToAdd.id)) {
                setBooks([selectedBookToAdd, ...books]);
              }
              setOpenDialog(false);
              setSearchTerm("");
              setSelectedBookToAdd(null);
            }}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>


      {/* Giao diện chỉnh sửa */}
      <Dialog open={editDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          Chỉnh sửa sách
          <IconButton onClick={handleDialogClose} sx={{ position: "absolute", top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {selectedBook && (
            <Box sx={{ display: "flex", gap: 2 }}>
              {/* Cột ảnh */}
              <Box sx={{ flex: 1 }}>
                <img
                  src={selectedBook.image}
                  alt="cover"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 8,
                    objectFit: "cover"
                  }}
                />
              </Box>

              {/* Cột nội dung */}
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
          <Button onClick={handleDialogClose}>Hủy</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={
              title === selectedBook?.title &&
              (privacy === (selectedBook?.isPrivate ? "private" : "public"))
            }
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>


      {/* Giao diện chia sẻ */}
      <Dialog open={openShareDialog} onClose={() => setOpenShareDialog(false)}>
        <DialogTitle>
          Chia sẻ đường dẫn
          <IconButton onClick={() => setOpenShareDialog(false)} sx={{ position: "absolute", top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={window.location.href}
            InputProps={{
              readOnly: true,
            }}
          />
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setOpenShareDialog(false);
              alert("Đã copy đường dẫn vào clipboard!");
            }}
          >
            Sao chép đường dẫn
          </Button>
        </DialogContent>
      </Dialog>

      {/* Giao diện xóa */}
      <Dialog open={openConfirmDelete} onClose={() => setOpenConfirmDelete(false)}>
        <DialogTitle>Bạn có chắc chắn muốn xóa không?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDelete(false)}>Không</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              // TODO: Gọi hàm xóa hoặc điều hướng
              setOpenConfirmDelete(false);
              navigate("/profileUser/book-series"); // quay lại danh sách
            }}
          >
            Có
          </Button>
        </DialogActions>
      </Dialog>


      <Divider sx={{ mb: 3 }} />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography fontSize={18} fontWeight="bold">
          📚 {series.title}
        </Typography>
        <SortSelect sortBy={sortBy} onSortChange={setSortBy} />
      </Box>

      {/* Danh sách sách */}
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item xs={6} sm={4} md={3} key={book.id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>

    </Box>
  );
}
