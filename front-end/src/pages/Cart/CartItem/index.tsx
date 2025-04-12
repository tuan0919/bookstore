import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import QuantityInput from "../../../components/NumberInput";
import { Book } from "../ListCartItem";

interface CartItemProps {
  book: Book;
  onQuantityChange: (bookId: number, newQuantity: number) => void;
  onToggleCheckbox: (bookId: number) => void;
  isChecked: boolean;
}

function CartItem({
  book,
  onQuantityChange,
  onToggleCheckbox,
  isChecked,
}: CartItemProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      p={2}
      justifyContent={"space-between"}
    >
      {/* Checkbox */}
      <Checkbox
        color="error"
        defaultChecked
        checked={isChecked}
        onChange={() => onToggleCheckbox(book.id)}
      />

      {/* Hình ảnh sách */}
      <Box width={80} height={80} flexShrink={0}>
        <img
          src={book.img}
          alt={book.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      {/* Thông tin sách */}
      <Box flex={1}>
        <Typography fontWeight="bold">{book.title}</Typography>
        <Box display="flex" gap={1} alignItems="center">
          <Typography fontWeight="bold">
            {book.price.toLocaleString()} đ
          </Typography>
          <Typography
            variant="body2"
            sx={{ textDecoration: "line-through", color: "#888" }}
          >
            {book.price.toLocaleString()} đ
          </Typography>
        </Box>
      </Box>

      {/* Bộ chọn số lượng */}
      <Box
        display="flex"
        alignItems="center"
        border="1px solid #ccc"
        borderRadius={1}
      >
        <QuantityInput
          value={book.quantity}
          onChange={(e, val) => {
            if (val !== null) {
              onQuantityChange(book.id, val); // Gọi hàm truyền lên từ cha
            }
          }}
        ></QuantityInput>
      </Box>

      {/* Tổng tiền */}
      <Typography color="error" fontWeight="bold" width={100} textAlign="right">
        {(book.price * book.quantity).toLocaleString()} đ
      </Typography>

      {/* Nút xoá */}
      <IconButton color="error">
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}

export default CartItem;
