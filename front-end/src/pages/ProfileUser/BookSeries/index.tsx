import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Snackbar,
} from "@mui/material";
import BookCardSeries from "./BookCardSeries";
import BookSeriesSortSelect from "./BookSeriesSortSelect";
import axios from "axios";

export default function BookSeries() {
  const [sortBy, setSortBy] = useState("newest");
  const [seriesList, setSeriesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/collections");
      const data = res.data?.content || res.data || []; // Nếu backend trả về dạng `Page`
      setSeriesList(data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách bộ sách:", error);
      setMessage("Không thể tải danh sách bộ sách");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (updatedBook) => {
    setSeriesList((prev) =>
      prev.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  const handleDelete = (deletedBook) => {
    setSeriesList((prev) =>
      prev.filter((book) => book.id !== deletedBook.id)
    );
  };

  const sortedBooks = useMemo(() => {
    return [...seriesList].sort((a, b) => {
      switch (sortBy) {
        case "az":
          return a.name.localeCompare(b.name);
        case "za":
          return b.name.localeCompare(a.name);
        case "oldest":
          return a.id - b.id;
        default:
          return b.id - a.id;
      }
    });
  }, [sortBy, seriesList]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">📚 Sách theo bộ</Typography>
        <BookSeriesSortSelect sortBy={sortBy} onSortChange={setSortBy} />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : seriesList.length === 0 ? (
        <Typography>⚠️ Chưa có bộ sách nào.</Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 3,
            justifyItems: "center",
          }}
        >
          {sortedBooks.map((book) => (
            <BookCardSeries
              key={book.id}
              book={book}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSelect={() => {
                window.location.href = `profileUser/book-series/index/${book.id}`;
              }}
            />
          ))}
        </Box>
      )}

      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        onClose={() => setMessage("")}
        message={message}
      />
    </Box>
  );
}
