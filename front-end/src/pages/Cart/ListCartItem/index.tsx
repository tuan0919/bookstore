import { Box, Divider, Typography, Checkbox } from "@mui/material";

import CartItem from "../CartItem/";
export interface Book {
  id: number;
  title: string;
  price: number;
  quantity: number;
  img: string;
  salePrice: number;
}

interface ListCartItemProps {
  listBook: Book[];
  onQuantityChange: (bookId: number, newQuantity: number) => void;
  onToggleCheckbox: (bookId: number) => void;
  onToggleAll: () => void;
  checkedItems: number[];
}

function ListCartItem({
  listBook,
  onQuantityChange,
  onToggleCheckbox,
  checkedItems,
  onToggleAll,
}: ListCartItemProps) {
  return (
    <Box bgcolor={"#f5f5f5"}>
      {/* Header */}
      <Box
        height={2}
        display="flex"
        alignItems="center"
        p={2}
        bgcolor="#fff"
        borderRadius={2}
        marginBottom={1}
        paddingLeft={8}
        paddingRight={8}
      >
        <Checkbox
          color="error"
          checked={
            checkedItems.length === listBook.length && listBook.length > 0
          }
          onChange={onToggleAll}
        />
        <Typography variant="subtitle1" fontWeight="bold" flex={1}>
          Chọn tất cả ({listBook.length} sản phẩm)
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          width={120}
          textAlign="center"
        >
          Số lượng
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          width={120}
          textAlign="right"
        >
          Thành tiền
        </Typography>
      </Box>

      {/*  Danh sách sách */}
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        p={2}
        bgcolor={"#fff"}
        borderRadius={2}
      >
        {listBook.map((book, index) => (
          <Box key={book.id}>
            <CartItem
              key={book.id}
              book={book}
              onQuantityChange={onQuantityChange}
              onToggleCheckbox={onToggleCheckbox}
              isChecked={checkedItems.includes(book.id)}
            />
            {index !== listBook.length - 1 && <Divider sx={{ my: 2 }} />}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ListCartItem;
