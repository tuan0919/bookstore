import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getTopWeeklyBooks, searchBooks } from "~/api/book";
import {
  PageBookResponseDTO,
  PageBookResponse,
  BookDetailsDTO,
  ListBookDetailsDTO,
} from "~/types/book";
import { ApiResponse } from "~/types/api";

interface HomeContextType {
  lnBooks: PageBookResponseDTO[];
  mangaBooks: PageBookResponseDTO[];
  topWeekly: BookDetailsDTO[];
  isLoading: boolean;
  error: string | null;
}

const HomeContext = createContext<HomeContextType>({
  lnBooks: [],
  mangaBooks: [],
  topWeekly: [],
  isLoading: false,
  error: null,
});

export const useHomeContext = () => useContext(HomeContext);

interface HomeProviderProps {
  children: ReactNode;
}

export const HomeProvider = ({ children }: HomeProviderProps) => {
  const [lnBooks, setLnBooks] = useState<PageBookResponseDTO[]>([]);
  const [mangaBooks, setMangaBooks] = useState<PageBookResponseDTO[]>([]);
  const [topWeekly, setTopWeekly] = useState<BookDetailsDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true);
      try {
        const [lnRes, mangaRes, topWeeklyBooksRes]: [
          ApiResponse<PageBookResponse>,
          ApiResponse<PageBookResponse>,
          ApiResponse<ListBookDetailsDTO>
        ] = await Promise.all([
          searchBooks({ categoryId: 6, context: " " }), // LN
          searchBooks({ categoryId: 5, context: " " }), // Manga
          getTopWeeklyBooks(),
        ]);

        setLnBooks(lnRes.result.content);
        setMangaBooks(mangaRes.result.content);
        setTopWeekly(topWeeklyBooksRes.result.books);
      } catch (err) {
        console.error(err);
        setError("Failed to load books");
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  return (
    <HomeContext.Provider
      value={{ lnBooks, mangaBooks, topWeekly, isLoading, error }}
    >
      {children}
    </HomeContext.Provider>
  );
};
