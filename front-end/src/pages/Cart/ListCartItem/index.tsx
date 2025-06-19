import { Box, Divider, Typography, Checkbox } from "@mui/material";
import { useCart } from "~/providers/CartProvider";
import CartItem from "../CartItem/";
import { CartItemPropertyResponseDTO } from "~/types/cart";
import { useEffect, useState } from "react";
interface ListCartItemProps {
  listBook: CartItemPropertyResponseDTO[];
  onQuantityChange: (bookId: number, newQuantity: number) => void;
  onToggleCheckbox: (bookId: number) => void;
  onToggleAll: () => void;
  checkedItems: number[];
}

function ListCartItem({
  listBook ,
  onToggleCheckbox,
  checkedItems,
  onToggleAll,
}: ListCartItemProps) {
  const {  cart, increaseItem, decreaseItem, removeItem } = useCart();
 const [listBookData, setListBook] = useState(listBook);
 useEffect(() => {
    setListBook(cart); 
  }, [cart]);
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
       sx={{
         overflowY:"auto",
        maxHeight:"calc(100vh - 200px)"
       }}
      >
        {listBookData.length > 0 &&  listBookData.map((item) => (
          <Box key={item.productId}>
            <CartItem
             book={item}
             
              onToggleCheckbox={onToggleCheckbox}
              isChecked={checkedItems.includes(item.productId)}
              increaseItem={increaseItem}
              decreaseItem={decreaseItem}
              removeItem={removeItem}
            />
            {item.productId !== listBookData.length - 1 && <Divider sx={{ my: 2 }} />}
          </Box>
        ))}
     
      </Box>
    </Box>
  );
}

export default ListCartItem;
