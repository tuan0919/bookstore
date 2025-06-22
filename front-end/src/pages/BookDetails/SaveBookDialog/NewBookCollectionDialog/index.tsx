import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

export default function NewBookCollectionDialog({
  open,
  onClose,
  onCreated,
  selectedBookId,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: "", severity: null });

const handleSubmit = async () => {
  if (!title.trim()) {
    setSnackbar({ message: "Vui lòng nhập tiêu đề", severity: "error" });
    return;
  }

  setLoading(true);

  // 🧪 DÒNG NÀY: In ra payload gửi lên
  console.log("📦 Payload gửi lên:", {
    name: title.trim(),
    description: description.trim(),
    bookIds: selectedBookId ? [selectedBookId] : [],
  });

  try {
    const res = await axios.post("/api/collections", {
      name: title.trim(),
      description: description.trim(),
      bookIds: selectedBookId ? [selectedBookId] : [],
    });

    const newCollection = res.data?.result;
    if (!newCollection?.id) {
      throw new Error("Không nhận được ID từ server");
    }

    setSnackbar({ message: "✅ Tạo bộ sách thành công!", severity: "success" });
    setTitle("");
    setDescription("");
    onClose();
    onCreated?.(newCollection);
  } catch (err) {
    console.error("❌ Lỗi tạo bộ sách:", err);

    // 🧪 DÒNG NÀY: In ra lỗi chi tiết từ server (nếu có)
    if (axios.isAxiosError(err)) {
      console.error("📥 Response từ BE:", err.response?.data);
    }

    setSnackbar({ message: "❌ Lỗi khi tạo bộ sách", severity: "error" });
  } finally {
    setLoading(false);
  }
};



  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle> Tạo bộ sách mới</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Tiêu đề bộ sách"
              variant="standard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              autoFocus
            />
            <TextField
              label="Mô tả"
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "Tạo"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!snackbar.severity}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ message: "", severity: null })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ message: "", severity: null })}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
