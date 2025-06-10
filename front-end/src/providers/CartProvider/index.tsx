import { createContext, useContext, useEffect, useState } from "react";
import { getCart, addToCart,removeFromCart } from "~/api/cart";
import { CartItemPropertyResponseDTO as CartItem } from "~/types/cart";

export interface CartResult {
  code: number;
  result: string;
}

interface CartContextType {
  cart: CartItem[];
  fetchCart: () => void;
  increaseItem: (bookId: string, quantity: number) => Promise<CartResult>;
  decreaseItem: (bookId: string, quantity: number) => Promise<CartResult>;
  removeItem?: (bookId: string) => Promise<CartResult>;
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
      localStorage.setItem("userId", res.result.userId);
    } catch (err) {
      console.error("Lỗi khi lấy giỏ hàng:", err);
    }
  };

  const increaseItem = async (bookId: string, quantity: number): Promise<CartResult> => {
    try {
      const result= await addToCart(bookId,quantity);
      fetchCart();
      return result;
    } catch (err) {
      console.error("Lỗi khi tăng số lượng:", err);
       return { code: 500, result: 'Lỗi khi gọi API thêm sách trong giỏ hàng' };
    }
  };

  const decreaseItem = async (bookId: string, quantity: number): Promise<CartResult> => {
    try {
     const result= await addToCart(bookId, quantity);
      fetchCart();
      return result;
    } catch (err) {
      console.error("Lỗi khi giảm số lượng:", err);
       return { code: 500, result: 'Lỗi khi gọi API giảm sách trong giỏ hàng' };
    }
  };
  const removeItem = async (bookId: string): Promise<CartResult> => {
    try {
      const result = await removeFromCart(bookId);
      fetchCart();
      return result;
    } catch (err) {
      console.error("Lỗi khi xóa sách:", err);
        return { code: 500, result: 'Lỗi khi gọi API xóa giỏ hàng' };
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
