import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Button,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import SortSelect from "./BookSortSelect";
import { BookCard } from "~/components/BookCard";
import BookAddDialog from "./BookAddDialog";
import BookEditDialog from "./BookEditDialog";
import BookShareDialog from "./BookShareDialog";
import BookDeleteDialog from "./BookDeleteDialog";

import axios from "axios";

export default function BookSeriesDetails() {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [collectionInfo, setCollectionInfo] = useState({});
  const [sortBy, setSortBy] = useState("newest");

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCollectionDetails();
  }, [id]);

  const fetchCollectionDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/collections/${id}`);
      setBooks(response.data.books || []);
      setCollectionInfo(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết bộ sách:", error);
    } finally {
      setLoading(false);
    }
  };

  const sortedBooks = useMemo(() => {
    return [...books].sort((a, b) => {
      switch (sortBy) {
        case "az": return a.title.localeCompare(b.title);
        case "za": return b.title.localeCompare(a.title);
        case "oldest": return a.bookId - b.bookId;
        default: return b.bookId - a.bookId;
      }
    });
  }, [sortBy, books]);

  const handleAddBook = async (newBook) => {
    try {
      await axios.post(`/api/collections/${id}/books`, {
        bookIds: [newBook.bookId]
      });
      setBooks(prev => [...prev, newBook]);
    } catch (error) {
      console.error("Lỗi khi thêm sách:", error);
    }
  };

  const handleEditBook = (updatedBook) => {
    setBooks(prev =>
      prev.map(book => book.bookId === updatedBook.bookId ? updatedBook : book)
    );
  };

  const handleDeleteBook = (deletedBook) => {
    setBooks(prev => prev.filter(book => book.bookId !== deletedBook.bookId));
  };

  return (
    <Box sx={{ p: 3 }}>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Box>
              <Typography variant="h5">📘 {collectionInfo.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {collectionInfo.description}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <SortSelect sortBy={sortBy} onSortChange={setSortBy} />
              <Tooltip title="Chia sẻ">
                <Button variant="outlined" onClick={() => setShareDialogOpen(true)}>Chia sẻ</Button>
              </Tooltip>
              <Tooltip title="Thêm sách">
                <IconButton color="primary" onClick={() => setAddDialogOpen(true)}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 2 }}>
            {sortedBooks.map(book => (
              <BookCard
                key={book.bookId}
                book={book}
                onEdit={() => {
                  setSelectedBook(book);
                  setEditDialogOpen(true);
                }}
                onDelete={() => {
                  setSelectedBook(book);
                  setDeleteConfirmOpen(true);
                }}
              />
            ))}
          </Box>

          {/* Dialogs */}
          <BookAddDialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} onAdd={handleAddBook} />
          <BookEditDialog open={editDialogOpen} book={selectedBook} onClose={() => setEditDialogOpen(false)} onSave={handleEditBook} />
          <BookShareDialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)} />
          <BookDeleteDialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} onConfirm={() => {
            handleDeleteBook(selectedBook);
            setDeleteConfirmOpen(false);
          }} />
        </>
      )}
    </Box>
  );
}
