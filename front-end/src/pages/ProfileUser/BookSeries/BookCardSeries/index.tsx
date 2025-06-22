import React, { useState } from "react";
import {
    Box, Card, CardMedia, CardContent, Typography,
    IconButton, Menu, MenuItem
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookSeriesEditDialog from "../BookSeriesEditDialog";
import BookSeriesDeleteDialog from "../BookSeriesDeleteDialog";
import { useBookDetailsContext } from "~/context/BookDetailsContext";
import CustomSnackbar from "~/components/Popup/Snackbar";
import axios from "axios";

export default function BookCardSeries({ book, onSelect, onEdit, onDelete }) {
    const { addToCart } = useBookDetailsContext();

    const [anchorEl, setAnchorEl] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [initStateSnackbar, setStateSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
        duration: 800,
    });

    const handleAddToCart = async () => {
        try {
            // Gọi API thêm toàn bộ sách con vào giỏ
             await axios.post(`/api/cart/add-series/${book.id}`);

            setStateSnackbar({
                open: true,
                message: "Đã thêm vào giỏ hàng",
                severity: "success",
                duration: 800,
            });
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
            setStateSnackbar({
                open: true,
                message: "Lỗi khi thêm vào giỏ hàng",
                severity: "error",
                duration: 1500,
            });
        }
    };

    return (
        <>
            <Card onClick={() => onSelect(book)} sx={{ width: 185, height: 250, m: 1 }}>
                <Box sx={{
                    position: "absolute", top: 8, left: 8,
                    bgcolor: book.isPrivate ? "grey.700" : "success.main",
                    color: "#fff", px: 1, borderRadius: 1, fontSize: "0.75rem"
                }}>{book.isPrivate ? "Riêng tư" : "Công khai"}</Box>

                <Box sx={{ position: "absolute", bottom: 8, left: 8, bgcolor: "rgba(0,0,0,0.6)", color: "#fff", px: 1, borderRadius: 1, fontSize: "0.75rem" }}>
                    {book.count} quyển
                </Box>

                <IconButton sx={{ position: "absolute", bottom: 8, right: 8 }} onClick={(e) => {
                    e.stopPropagation(); setAnchorEl(e.currentTarget);
                }}><MoreVertIcon /></IconButton>

                <CardMedia component="img" height="160" image={book.image} />
                <CardContent><Typography variant="subtitle2">{book.name}</Typography></CardContent>
            </Card>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <MenuItem onClick={() => {
                    handleAddToCart();
                    setAnchorEl(null);
                }} >Thêm vào giỏ hàng</MenuItem>

                <MenuItem onClick={() => { setEditOpen(true); setAnchorEl(null); }}>Chỉnh sửa</MenuItem>
                <MenuItem onClick={() => { setDeleteOpen(true); setAnchorEl(null); }}>Xóa</MenuItem>
            </Menu>

            <CustomSnackbar
                open={initStateSnackbar.open}
                onClose={() =>
                    setStateSnackbar({ ...initStateSnackbar, open: false })
                }
                message={initStateSnackbar.message}
                severity={initStateSnackbar.severity}
                duration={initStateSnackbar.duration}
            />

            <BookSeriesEditDialog open={editOpen} onClose={() => setEditOpen(false)} onSave={onEdit} book={book} />
            <BookSeriesDeleteDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={() => { onDelete(book); setDeleteOpen(false); }} />
        </>
    );
}