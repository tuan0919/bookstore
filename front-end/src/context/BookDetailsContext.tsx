import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useParams } from "react-router-dom";
import { getBookDetails, searchBooks } from "~/api/book";
import { getCategoryChainOfBook } from "~/api/category";
import { BookDetailsDTO, PageBookResponseDTO } from "~/types/book";
import { CategoryChainDTO } from "~/types/category";

interface BookDetailsContextType {
  bookDetails: BookDetailsDTO | null;
  categoryChain: CategoryChainDTO | null;
  relatedBooks: PageBookResponseDTO[] | null;
  isLoading: boolean;
  error: string | null;
}

const BookDetailsContext = createContext<BookDetailsContextType>({
  bookDetails: null,
  categoryChain: null,
  relatedBooks: null,
  isLoading: false,
  error: null,
});

export const useBookDetailsContext = () => useContext(BookDetailsContext);

interface BookDetailsProviderProps {
  children: ReactNode;
}

export const BookDetailsProvider = ({ children }: BookDetailsProviderProps) => {
  const [bookDetails, setBookDetails] = useState<BookDetailsDTO | null>(null);
  const [categoryChain, setCategoryChain] = useState<CategoryChainDTO | null>(
    null
  );
  const [relatedBooks, setRelatedBooks] = useState<
    PageBookResponseDTO[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { "*": id } = useParams();
  useEffect(() => {
    const bookId = id ? parseInt(id, 10) : -1;
    const loadBooks = async () => {
      setIsLoading(true);
      try {
        const detailsRes = await getBookDetails(bookId);
        setBookDetails(detailsRes.result);
        const chainRes = await getCategoryChainOfBook(detailsRes.result.bookId);
        setCategoryChain(chainRes.result);
        const relatedRes = await searchBooks({
          categoryId: chainRes.result.list[chainRes.result.list.length - 1].id,
          context: " ",
        });
        setRelatedBooks(relatedRes.result.content);
      } catch (err) {
        console.error(err);
        setError("Failed to load books");
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, [id, setCategoryChain]);

  return (
    <BookDetailsContext.Provider
      value={{ bookDetails, relatedBooks, categoryChain, isLoading, error }}
    >
      {children}
    </BookDetailsContext.Provider>
  );
};
