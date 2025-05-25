/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState } from "react";

interface SearchContextType {
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  searchResults: any[]; // Change this to the correct type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
  filters: {
    page: number;
    size: number;
    context: string;
    categoryId: number;
    minPrice: number;
    maxPrice: number;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      page: number;
      size: number;
      context: string;
      categoryId: number;
      minPrice: number;
      maxPrice: number;
    }>
  >;
}
const SearchContext = createContext<SearchContextType | null>(null);
export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({
    page: 0,
    size: 12,
    context: "",
    categoryId: 1,
    minPrice: 0,
    maxPrice: 0,
  });
  return (
    <SearchContext.Provider
      value={{
        searchKeyword,
        setSearchKeyword,
        searchResults,
        setSearchResults,
        filters,
        setFilters,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error("useSearchContext must be used within SearchProvider");
  return context;
}
