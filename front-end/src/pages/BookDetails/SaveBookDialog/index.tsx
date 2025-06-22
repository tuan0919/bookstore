import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  CircularProgress,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import NewBookCollectionDialog from "./NewBookCollectionDialog";

export default function SaveBookDialog({ open, onClose, selectedBookId }) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCollectionIds, setSelectedCollectionIds] = useState([]);
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [noCollection, setNoCollection] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: "", severity: "" });

  const fetchCollections = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/collections");
      const data = res.data?.content || []; 
      setCollections(data);
      setNoCollection(data.length === 0);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách bộ sách", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (open) {
      fetchCollections();
      setSelectedCollectionIds([]);
    }
  }, [open]);

  const handleCheckboxChange = (collectionId) => {
    setSelectedCollectionIds((prev) =>
      prev.includes(collectionId)
        ? prev.filter((id) => id !== collectionId)
        : [...prev, collectionId]
    );
  };

  const handleSave = async () => {
    if (!selectedCollectionIds.length) return;
    try {
      await Promise.all(
        selectedCollectionIds.map((id) =>
          axios.post(`/api/collections/${id}/books`, {
            bookIds: [selectedBookId],
          })
        )
      );
      setSnackbar({ message: "Đã lưu sách vào bộ thành công!", severity: "success" });
      onClose();
    } catch (err) {
      console.error("Lỗi khi lưu sách vào bộ:", err);
      setSnackbar({ message: "Có lỗi xảy ra khi lưu", severity: "error" });
    }
  };

  const handleNewCollectionCreated = (newCollection) => {
    setNewDialogOpen(false);
    fetchCollections();
    if (newCollection?.id) {
      setSelectedCollectionIds((prev) => [...prev, newCollection.id]);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>📚 Lưu sách vào bộ</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box display="flex" justifyContent="center" p={2}>
              <CircularProgress />
            </Box>
          ) : collections.length === 0 ? (
            <Typography> Bạn chưa có bộ sách nào.</Typography>
          ) : (
            <Stack spacing={1} mt={1}>
              {collections.map((col) => (
                <FormControlLabel
                  key={col.id}
                  control={
                    <Checkbox
                      checked={selectedCollectionIds.includes(col.id)}
                      onChange={() => handleCheckboxChange(col.id)}
                    />
                  }
                  label={col.name}
                />
              ))}
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewDialogOpen(true)}>Tạo bộ mới</Button>
          <Button
            onClick={handleSave}
            disabled={!selectedCollectionIds.length}
            variant="contained"
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      <NewBookCollectionDialog
        open={newDialogOpen}
        onClose={() => setNewDialogOpen(false)}
        onCreated={handleNewCollectionCreated}
        selectedBookId={selectedBookId}
      />

      <Snackbar
        open={!!snackbar.message}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ message: "", severity: "" })}
      >
        <Alert
          severity={snackbar.severity || "info"}
          onClose={() => setSnackbar({ message: "", severity: "" })}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
