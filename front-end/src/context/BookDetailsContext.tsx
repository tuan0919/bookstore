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
import { useCart } from "~/providers/CartProvider";
import { BookReviewOverallResponse } from "~/types/review";
import { getBookReviewOverall } from "~/api/review";

interface BookDetailsContextType {
  bookDetails: BookDetailsDTO | null;
  categoryChain: CategoryChainDTO | null;
  relatedBooks: PageBookResponseDTO[] | null;
  isLoading: boolean;
  error: string | null;
  addToCart: () => void;
  reviewOverall: BookReviewOverallResponse | null;
}

const BookDetailsContext = createContext<BookDetailsContextType>({
  bookDetails: null,
  categoryChain: null,
  relatedBooks: null,
  isLoading: false,
  error: null,
  addToCart: () => {},
  reviewOverall: null,
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
  const [reviewOverall, setReviewOverall] =
    useState<BookReviewOverallResponse | null>(null);
  const { id } = useParams();
  useEffect(() => {
    const bookId = id ? parseInt(id, 10) : -1;
    const loadBooks = async () => {
      setIsLoading(true);
      try {
        const detailsRes = await getBookDetails(bookId);
        setBookDetails(detailsRes.result);
        const chainRes = await getCategoryChainOfBook(detailsRes.result.bookId);
        console.log("chain res: ", chainRes);
        setCategoryChain(chainRes.result);
        const relatedRes = await searchBooks({
          categoryId: chainRes.result.list[chainRes.result.list.length - 1].id,
          context: " ",
        });
        setRelatedBooks(relatedRes.result.content);
        const overall = await getBookReviewOverall(Number(id));
        setReviewOverall(overall.result);
      } catch (err) {
        console.error(err);
        setError("Failed to load books");
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, [id, setCategoryChain]);
  // Thêm sách vào giỏ hàng
  const { increaseItem } = useCart();
  const addToCart = async () => {
    if (!id) return;
    increaseItem(id, 1);
  };

  return (
    <BookDetailsContext.Provider
      value={{
        bookDetails,
        relatedBooks,
        categoryChain,
        isLoading,
        error,
        addToCart,
        reviewOverall,
      }}
    >
      {children}
    </BookDetailsContext.Provider>
  );
};
