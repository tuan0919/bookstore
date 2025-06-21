import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { getSummaryAboutBook, searchBooks_v2 } from "~/api/book";
import { PageBookResponseDTO, SummaryAboutBook } from "~/types/book";

// Định nghĩa type cho các param
type CategoryParams = {
  categoryId: number;
  minPrice?: number;
  maxPrice?: number;
  page: number;
  size: number;
  context: string;
};

// Utility: parse number or undefined
const parseNumberParam = (value: string | null): number | undefined =>
  value !== null && value !== undefined && value !== ""
    ? Number(value)
    : undefined;

export function useCategory() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Khởi tạo state từ query params
  const initialParams: CategoryParams = {
    categoryId: parseNumberParam(searchParams.get("categoryId")) ?? 1,
    minPrice: parseNumberParam(searchParams.get("minPrice")),
    maxPrice: parseNumberParam(searchParams.get("maxPrice")),
    page: parseNumberParam(searchParams.get("page")) ?? 1,
    size: parseNumberParam(searchParams.get("size")) ?? 5,
    context: searchParams.get("context") ?? "",
  };

  const [categoryId, setCategoryIdState] = useState<number>(
    initialParams.categoryId
  );
  const [minPrice, setMinPriceState] = useState<number | undefined>(
    initialParams.minPrice
  );
  const [maxPrice, setMaxPriceState] = useState<number | undefined>(
    initialParams.maxPrice
  );
  const [page, setPageState] = useState<number>(initialParams.page);
  const [size, setSizeState] = useState<number>(initialParams.size);
  const [context, setContextState] = useState<string>(initialParams.context);
  const [summaryAboutBook, setSummaryAboutBook] = useState<
    SummaryAboutBook | undefined
  >();
  const [books, setBooks] = useState<PageBookResponseDTO[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const fetchBook = async () => {
    const resp = await searchBooks_v2({
      categoryId,
      context,
      maxPrice,
      minPrice,
      page: page - 1 < 0 ? 0 : page - 1,
      size,
    });
    setBooks(resp.result.content);
    setTotalElements(resp.result.totalElements);
    setTotalPages(resp.result.totalPages);
  };

  // Đồng bộ state lên URL khi bất kỳ param nào thay đổi
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (categoryId !== undefined)
      newSearchParams.set("categoryId", String(categoryId));
    if (minPrice !== undefined)
      newSearchParams.set("minPrice", String(minPrice));
    if (maxPrice !== undefined)
      newSearchParams.set("maxPrice", String(maxPrice));
    if (page !== undefined) newSearchParams.set("page", String(page));
    if (size !== undefined) newSearchParams.set("size", String(size));
    if (context !== undefined && context !== "")
      newSearchParams.set("context", context);
    setSearchParams(newSearchParams, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchBook();
  }, [categoryId, minPrice, maxPrice, page, size, context]);

  // Hàm cập nhật từng param
  const setCategoryId = useCallback((v: number) => {
    setCategoryIdState(v);
    setPageState(0); // Reset page về 1 khi đổi category
  }, []);
  const setMinPrice = useCallback(
    (v: number | undefined) => setMinPriceState(v),
    []
  );
  const setMaxPrice = useCallback(
    (v: number | undefined) => setMaxPriceState(v),
    []
  );
  const setPage = useCallback((v: number) => setPageState(v), []);
  const setSize = useCallback((v: number) => setSizeState(v), []);
  const setContext = useCallback((v: string) => setContextState(v), []);

  // Hàm cập nhật đồng thời minPrice và maxPrice
  const updatePriceRange = useCallback(
    (min: number | undefined, max: number | undefined) => {
      setMinPriceState(min);
      setMaxPriceState(max);
      setPageState(1); // Reset page về 1 nếu muốn
    },
    []
  );

  // Hàm cập nhật nhiều param cùng lúc
  const updateParams = useCallback((updates: Partial<CategoryParams>) => {
    if (updates.categoryId !== undefined)
      setCategoryIdState(updates.categoryId);
    if (updates.minPrice !== undefined) setMinPriceState(updates.minPrice);
    if (updates.maxPrice !== undefined) setMaxPriceState(updates.maxPrice);
    if (updates.page !== undefined) setPageState(updates.page);
    if (updates.size !== undefined) setSizeState(updates.size);
    if (updates.context !== undefined) setContextState(updates.context);
  }, []);

  // Load summary khi mount
  useEffect(() => {
    const loadSummary = async () => {
      const { result: summary } = await getSummaryAboutBook();
      setSummaryAboutBook(summary);
      console.log("summary: ", summary);
    };
    loadSummary();
  }, []);

  return {
    categoryId,
    setCategoryId,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    page,
    setPage,
    size,
    setSize,
    context,
    setContext,
    updateParams,
    updatePriceRange,
    summaryAboutBook,
    setSummaryAboutBook,
    books,
    totalElements,
    totalPages,
  };
}
