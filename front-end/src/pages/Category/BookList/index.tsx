import React from "react";
import { Box, MenuItem, Select, Pagination } from "@mui/material";
import { BookCard } from "~/components/BookCard";
import { SelectChangeEvent } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useTranslation } from "react-i18next";
import { useCategoryContext } from "~/context/CategoryContext";

const perPageOptions = [12, 24, 48];

export default function BookList() {
  const { books, page, setPage, size, setSize, totalPages } =
    useCategoryContext();
  const [sort, setSort] = React.useState("latest");
  const { t } = useTranslation();

  const mapSortOptions = [
    { key: "page.search.filterContent.label1.item1", value: "latest" },
    { key: "page.search.filterContent.label1.item2", value: "best-seller" },
    { key: "page.search.filterContent.label1.item3", value: "price-asc" },
    { key: "page.search.filterContent.label1.item4", value: "price-desc" },
  ];

  const sortOptions = mapSortOptions.map((option) => ({
    label: t(option.key),
    value: option.value,
  }));

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSort(event.target.value);
  };

  const handlePerPageChange = (event: SelectChangeEvent<string>) => {
    setSize(Number(event.target.value));
    setPage(1); // Reset về trang 1 khi đổi số sản phẩm/trang
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Sắp xếp sách theo sort
  const sortedBooks = [...books];
  switch (sort) {
    case "price-asc":
      sortedBooks.sort((a, b) => a.discountedPrice - b.discountedPrice);
      break;
    case "price-desc":
      sortedBooks.sort((a, b) => b.discountedPrice - a.discountedPrice);
      break;
    default:
      break;
  }

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
          value={String(size)}
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
        {sortedBooks.map((book) => (
          <BookCard
            key={book.bookId}
            card={{
              discountPercentage: book.discountPercentage,
              thumbnail: book.imageUrl,
              title: book.title,
              discountPrice: book.discountedPrice,
              originallPrice: book.price,
              bookId: book.bookId,
            }}
          />
        ))}
      </Box>

      {/* Phân trang */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          color={"primary"}
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
