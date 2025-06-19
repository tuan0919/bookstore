import React from "react";
import { SearchProvider } from "./SearchProvider";
import {CartProvider} from "./CartProvider";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <CartProvider>
      {children}
      </CartProvider>
    </SearchProvider>
  );
}