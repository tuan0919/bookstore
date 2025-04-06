import React, { useState } from "react";
import { Box, MenuItem, Select, Pagination } from "@mui/material";
import { BookCard } from "~/components/BookCard";
import { SelectChangeEvent } from "@mui/material";
import { grey } from "@mui/material/colors";
const sortOptions = [
  { label: "Mới nhất", value: "latest" },
  { label: "Bán chạy", value: "best-seller" },
  { label: "Giá tăng dần", value: "price-asc" },
  { label: "Giá giảm dần", value: "price-desc" },
];

const perPageOptions = [12, 24, 48];

const mockBooks = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  title: `Sách mẫu ${index + 1}`,
  price: Math.floor(Math.random() * 500) + 50,
}));

export default function BookList() {
  const [sort, setSort] = useState("latest");
  const [perPage, setPerPage] = useState(12);
  const [page, setPage] = useState(1);

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

  const paginatedBooks = mockBooks.slice((page - 1) * perPage, page * perPage);

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
              {option} sản phẩm
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Danh sách sách */}
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
        {paginatedBooks.map((book) => (
          <BookCard key={book.id} />
        ))}
      </Box>

      {/* Phân trang */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          color={"primary"}
          count={Math.ceil(mockBooks.length / perPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
