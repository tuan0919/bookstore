import ListCartItem from "./ListCartItem";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Sumary from "./Sumary";
import Discount from "./Discount";
import Gift from "./Gift";
import { useCart } from "~/providers/CartProvider";
import { CartItemPropertyResponseDTO } from "~/types/cart";


function Cart() {
    const {cart} = useCart();
  const [listBook, setListBook] = useState<CartItemPropertyResponseDTO[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

// Cập nhật listBook mỗi khi cart thay đổi
useEffect(() => {
 if(cart && cart.length > 0) {
      const updatedBooks: CartItemPropertyResponseDTO[] = cart.map((item) => ({
    productId: item.productId,
    title: item.title,
    price: item.price,
    quantity: item.quantity,
    imageUrl: item.imageUrl,
    discountedPrice: item.discountedPrice,
    discountPercentage: item.discountPercentage,
  }));
  setListBook(updatedBooks);
    }
   
}, [cart]);
  //  Khi số lượng thay đổi từ CartItem
  const handleQuantityChange = (bookId: number, newQuantity: number) => {
    setListBook((prev) =>
      prev.map((book) =>
        book.productId === bookId ? { ...book, quantity: newQuantity } : book
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
      setCheckedItems(listBook.map((book) => book.productId));
    }
  };

  //  Khi có thay đổi về checked hoặc listBook, tính lại total
  useEffect(() => {
    const total = listBook.reduce((sum, book) => {
      if (checkedItems.includes(book.productId)) {
        return sum + book.quantity * book.price;
      }
      return sum;
    }, 0);
    setTotalPrice(total);
  }, [listBook, checkedItems]); 
  // Truyền data sách được chọn mua cho component Sumary
    const selectedBooks = listBook.filter((book) => 
      checkedItems.includes(book.productId)
    );
  
 
  return (
    <Box display="flex" gap={3} alignItems="flex-start" padding={10} paddingTop={5}>
      {/* Bên trái - Danh sách sản phẩm */}
      <Box flex={3}>
       {localStorage.getItem("access_token") ?(
         <ListCartItem
          listBook={listBook}
          onQuantityChange={handleQuantityChange}
          onToggleCheckbox={handleToggleCheckbox}
          onToggleAll={handleToggleAll}
          checkedItems={checkedItems}
        />
       ) : null}
      </Box>

      {/* Bên phải - Khuyến mãi, quà tặng, tổng */}
      <Box flex={1} display="flex" flexDirection="column" gap={2}>
        <Discount />
        <Gift />
        <Sumary totalPrice={totalPrice} selectedBooks={selectedBooks}  />
      </Box>
    </Box>
  );
}
export default Cart;
