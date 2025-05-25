import React from "react";
import { SearchProvider } from "./SearchProvider";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      {children}
    </SearchProvider>
  );
}