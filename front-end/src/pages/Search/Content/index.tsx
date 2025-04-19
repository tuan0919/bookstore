import { useState, useEffect } from "react";
import { Typography, Box, Pagination, Stack } from "@mui/material";
import { Grid2 } from "@mui/material";
import { BookCard } from "~/components/BookCard";
import bookImage from "~/assets/product/mockup_1.png";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface ContentProps {
  keyword: string;
  filters: {
    sortBy: string;
    ageRange: string;
    priceRange: string;
  };
}

export interface Book {
  id: number;
  title: string;
  price: number;
  quantity: number;
  img: string;
  salePrice: number;
  age: number;
}

function Content({ keyword, filters }: ContentProps) {
  const initialBooks: Book[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Naruto - Tập ${i + 1}`,
    price: 50000 + i * 1000,
    quantity: 1,
    img: bookImage,
    salePrice: 45000 + i * 1000,
    age: 17,
  }));
  const [listBook, setListBook] = useState<Book[]>(initialBooks);
  const [listFilterBook, setListFilterBook] = useState<Book[]>(initialBooks);
  const [page, setPage] = useState(0);
  const booksPerPage = 8;

  // Filter logic
  useEffect(() => {
    const { ageRange, priceRange } = filters;
    const filtered = listBook.filter((book) => {
      let matchAge = null;
      let matchPrice = null;
      if (ageRange.includes("+")) {
        const ageTemp = parseInt(ageRange.split("+")[0]);
        matchAge = ageTemp ? book.age > ageTemp : true;
      } else {
        const [minAge, maxAge] = ageRange.split("-").map(Number);
        matchAge = ageRange ? book.age >= minAge && book.age <= maxAge : true;
      }
      if (priceRange.includes("+")) {
        const priceTemp = parseInt(priceRange.split("+")[0]);
        matchPrice = priceTemp ? book.salePrice >= priceTemp : true;
      } else {
        const [minPrice, maxPrice] = priceRange.split("-").map(Number);
        matchPrice = priceRange
          ? book.salePrice >= minPrice && book.salePrice <= maxPrice
          : true;
      }

      return matchAge && matchPrice;
    });

    setListFilterBook(filtered);
    setPage(1); // Reset page when filter changes
  }, [filters, listBook]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Pagination logic
  const start = (page - 1) * booksPerPage;
  const end = start + booksPerPage;
  const currentBooks = listFilterBook.slice(start, end);
  const totalPages = Math.ceil(listFilterBook.length / booksPerPage);
  return (
    <Box
      sx={{
        width: "auto",
        padding: 1,
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Kết quả tìm kiếm */}
      <Typography variant="h6" mb={2}>
        KẾT QUẢ TÌM KIẾM:{" "}
        <Typography component="span" color="primary" fontWeight="bold">
          {keyword} ({listFilterBook.length} kết quả)
        </Typography>
      </Typography>

      {/* Bộ sắp xếp */}
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Autocomplete
          disablePortal
          options={[
            { label: "Độ liên quan", value: "default" },
            { label: "Bán chạy tháng", value: "bestseller" },
            { label: "Giá từ thấp tới cao", value: "priceAsc" },
            { label: "Giá từ cao tới thấp", value: "priceDesc" },
            { label: "Mới nhất", value: "newest" },
          ]}
          getOptionLabel={(option) => option.label}
          onChange={(_, newValue) => {
            if (newValue) {
              // Cập nhật filter.sortBy
              // Tùy biện logic sắp xếp ở đây
            }
          }}
          sx={{ minWidth: 250 }}
          renderInput={(params) => (
            <TextField {...params} label="Sắp xếp theo" />
          )}
        />

        <Autocomplete
          disablePortal
          options={[
            { label: "Tất cả", value: "all" },
            { label: "Còn hàng", value: "available" },
          ]}
          getOptionLabel={(option) => option.label}
          onChange={(_, newValue) => {
            if (newValue) {
              console.log("Tình trạng hàng:", newValue.value);
            }
          }}
          sx={{ minWidth: 150 }}
          renderInput={(params) => <TextField {...params} label="Tình trạng" />}
        />
      </Stack>

      {/* List sách */}
      <Grid2 container spacing={2}>
        {currentBooks.map((book) => (
          <Grid2 component={"div"} key={book.id} sx={{ xs: 6, sm: 4, md: 3 }}>
            <BookCard />
          </Grid2>
        ))}
      </Grid2>

      {/* Phân trang */}
      <Box mt={4} display="flex" justifyContent="center">
        {totalPages > 0 && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        )}
      </Box>
    </Box>
  );
}

export default Content;
