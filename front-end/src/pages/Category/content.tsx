import React, { useState } from "react";
import { Box, MenuItem, Select, Pagination } from "@mui/material";
import { BookCard } from "~/components/BookCard";
import { SelectChangeEvent } from "@mui/material";
import { grey } from "@mui/material/colors";
import {PageBookResponseDTO} from "~/types/book";
import { useTranslation } from "react-i18next";


const perPageOptions = [12, 24, 48];
export default function BookList({books,selectedPrices}: { books : PageBookResponseDTO [],selectedPrices?: string[];}) {
  const [sort, setSort] = useState("latest");
  const [perPage, setPerPage] = useState(12);
  const [page, setPage] = useState(1);
  const {t} = useTranslation();
  
  const mapSortOptions = [
    { key: 'page.search.filterContent.label1.item1', value: 'latest' },
    { key: 'page.search.filterContent.label1.item2', value: 'best-seller' },
    { key: 'page.search.filterContent.label1.item3', value: 'price-asc' },
    { key: 'page.search.filterContent.label1.item4', value: 'price-desc' }
  ];

  // Map key -> label
  const sortOptions  = mapSortOptions.map(option => ({
    label: t(option.key),
    value: option.value
  }));
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSort(event.target.value);
  };

  const handlePerPageChange = (event: SelectChangeEvent<string>) => {
    setPerPage(Number(event.target.value));
    setPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const listBooks : PageBookResponseDTO[] = [...books]
  const filterByPrice = (book: PageBookResponseDTO) => {
  const price = book.discountedPrice ;
  if (!selectedPrices || selectedPrices.length === 0) return true;

  return selectedPrices.some((range) => {
    switch (range) {
      case "Dưới 100K":
        return price < 100000;
      case "100K - 300K":
        return price >= 100000 && price <= 300000;
      case "300K - 500K":
        return price > 300000 && price <= 500000;
      case "Trên 500K":
        return price > 500000;
      default:
        return true;
    }
  });
};
const filteredBooks = books.filter(filterByPrice);
const paginatedBooks = filteredBooks.slice(
  (page - 1) * perPage,
  page * perPage
);

  return (
    <Box
      borderColor={grey[300]}
      borderRadius={2}
      sx={{
        backgroundColor: "white",
        padding: 1,
      }}
    >
      {/* Bộ lọc */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Select value={sort} onChange={handleSortChange} size="small">
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={String(perPage)}
          onChange={handlePerPageChange}
          size="small"
        >
          {perPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option} {t("page.search.filterContent.label2")}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Danh sách sách */}
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
        {paginatedBooks.map((book) => (
          <BookCard key={book.bookId} card={
            {
              thumbnail: book.imageUrl,
              title: book.title,
              discountPrice: book.discountedPrice,
              originallPrice: book.price,
              bookId: book.bookId,
            }
          } />
        ))}
      </Box>

      {/* Phân trang */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          color={"primary"}
          count={Math.ceil(listBooks.length / perPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
