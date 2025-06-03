import { createContext, useContext, useEffect, useState } from "react";
import { getCart, addToCart,removeFromCart } from "~/api/cart";
import { CartItemPropertyResponseDTO as CartItem } from "~/types/cart";


interface CartContextType {
  cart: CartItem[];
  fetchCart: () => void;
  increaseItem: (bookId: string, quantity: number) => void;
  decreaseItem: (bookId: string, quantity: number) => void;
  removeItem?: (bookId: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCart(res.result.items);
    } catch (err) {
      console.error("Lỗi khi lấy giỏ hàng:", err);
    }
  };

  const increaseItem = async (bookId: string, quantity: number) => {
    try {
      await addToCart(bookId,quantity);
      fetchCart();
    } catch (err) {
      console.error("Lỗi khi tăng số lượng:", err);
    }
  };

  const decreaseItem = async (bookId: string, quantity: number) => {
    try {
      await addToCart(bookId, quantity);
      fetchCart();
    } catch (err) {
      console.error("Lỗi khi giảm số lượng:", err);
    }
  };
  const removeItem = async (bookId: string) => {
    try {
      await removeFromCart(bookId);
      fetchCart();
    } catch (err) {
      console.error("Lỗi khi xóa sách:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, fetchCart, increaseItem, decreaseItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}
