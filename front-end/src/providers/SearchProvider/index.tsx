/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState } from "react";
import { PageBookResponseDTO } from "~/types/book";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
interface SearchContextType {
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  searchResults: PageBookResponseDTO[];
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
  isResetDefaultFilters: boolean;
  resetDefaultFilters: () => void;
  setIsResetDefaultFilters: React.Dispatch<React.SetStateAction<boolean>>;
}
const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<PageBookResponseDTO[]>([]);
  const defaultFilters = {
    page: 0,
    size: 12,
    context: "",
    categoryId: 5,
    minPrice: 0,
    maxPrice: 200000000000,
  };
  const [isResetDefaultFilters, setIsResetDefaultFilters] = useState(true);
  const location = useLocation();
  function resetDefaultFilters() {
    setFilters(defaultFilters);
  }
  const [filters, setFilters] = useState(defaultFilters);
  // Khi rời khỏi /category, reset filter
  useEffect(() => {
    if (!location.pathname.startsWith("/category/")) {
      resetDefaultFilters(); 
      setIsResetDefaultFilters(true);
    } else {
      setIsResetDefaultFilters(false); 
    }
  }, [location.pathname]);
  return (
    <SearchContext.Provider
      value={{
        searchKeyword,
        setSearchKeyword,
        searchResults,
        setSearchResults,
        filters,
        setFilters,
        isResetDefaultFilters,
        setIsResetDefaultFilters,
        resetDefaultFilters,
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
