import bookImage from "~/assets/product/mockup_1.png";
import ListCartItem from "./ListCartItem";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Sumary from "./Sumary";
import Discount from "./Discount";
import Gift from "./Gift";
const initialBooks = [
  {
    id: 1,
    title: " Dược sư tự sự (Manga) - Tập 13",
    price: 47000,
    quantity: 1,
    img: bookImage,
    salePrice: 39950,
  },
  {
    id: 2,
    title: " Dược sư tự sự (Manga) - Tập 13",
    price: 47000,
    quantity: 1,
    img: bookImage,
    salePrice: 39950,
  },
  {
    id: 3,
    title: " Dược sư tự sự (Manga) - Tập 13",
    price: 47000,
    quantity: 1,
    img: bookImage,
    salePrice: 39950,
  },
  {
    id: 4,
    title: " Dược sư tự sự (Manga) - Tập 13",
    price: 47000,
    quantity: 1,
    img: bookImage,
    salePrice: 39950,
  },
];

function Cart() {
  const [listBook, setListBook] = useState(initialBooks);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  //  Khi số lượng thay đổi từ CartItem
  const handleQuantityChange = (bookId: number, newQuantity: number) => {
    setListBook((prev) =>
      prev.map((book) =>
        book.id === bookId ? { ...book, quantity: newQuantity } : book
      )
    );
  };
  //  Khi checkbox thay đổi
  const handleToggleCheckbox = (bookId: number) => {
    setCheckedItems((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };
  const handleToggleAll = () => {
    if (checkedItems.length === listBook.length) {
      setCheckedItems([]);
    } else {
      setCheckedItems(listBook.map((book) => book.id));
    }
  };

  //  Khi có thay đổi về checked hoặc listBook, tính lại total
  useEffect(() => {
    const total = listBook.reduce((sum, book) => {
      if (checkedItems.includes(book.id)) {
        return sum + book.quantity * book.price;
      }
      return sum;
    }, 0);
    setTotalPrice(total);
  }, [listBook, checkedItems]); // 👈 phải có cả 2
  return (
    <Box display="flex" gap={3} alignItems="flex-start" padding={10} paddingTop={5}>
      {/* Bên trái - Danh sách sản phẩm */}
      <Box flex={3}>
        <ListCartItem
          listBook={listBook}
          onQuantityChange={handleQuantityChange}
          onToggleCheckbox={handleToggleCheckbox}
          onToggleAll={handleToggleAll}
          checkedItems={checkedItems}
        />
      </Box>

      {/* Bên phải - Khuyến mãi, quà tặng, tổng */}
      <Box flex={1} display="flex" flexDirection="column" gap={2}>
        <Discount />
        <Gift />
        <Sumary totalPrice={totalPrice} />
      </Box>
    </Box>
  );
}
export default Cart;
