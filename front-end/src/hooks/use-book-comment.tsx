import { useState } from "react";
import { getBookReviews } from "~/api/review";
import { ReviewBookResponseDTO } from "~/types/review";

export function useBookComment() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [reviews, setReviews] = useState<ReviewBookResponseDTO[]>([]);
  const fetchReviews = async (bookId: number, page: number, size: number) => {
    const dto = await getBookReviews(bookId, page, size);
    setReviews(dto.result.content);
    console.log("reviews: ", dto.result.content);
  };

  return {
    page,
    setPage,
    size,
    setSize,
    reviews,
    setReviews,
    fetchReviews,
  };
}
