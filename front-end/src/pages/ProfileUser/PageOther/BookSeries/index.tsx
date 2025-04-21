import React, { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from "@mui/material";
import PropTypes from "prop-types";
import BookSeriesDetails from "./BookSeriesDetails";

// Mẫu dữ liệu với danh sách sách con
const BOOK_SETS = [
  {
    id: 1,
    title: "Thanh Gươm Diệt Quỷ Kimetsu No Yaiba",
    count: 3,
    image: "https://cdn1.fahasa.com/media/catalog/product/r/t/rtgdqqqqqqbia-thuong.jpg",
    isPrivate: false,
    books: [
      {
        id: 1, title: "Thanh Gươm Diệt Quỷ - Kimetsu No Yaiba - Tập 1 - Tàn Khốc (Tái Bản)",
        image: "https://cdn1.fahasa.com/media/catalog/product/t/h/thanh-guom-diet-quy-tap-1_2.jpg"
      },
      {
        id: 2, title: "Thanh Gươm Diệt Quỷ - Kimetsu No Yaiba - Tập 2 - Ngươi Là...",
        image: "https://cdn1.fahasa.com/media/catalog/product/t/h/thanh-guom-diet-quy-tap-2.jpg"
      },
      {
        id: 3, title: "Thanh Gươm Diệt Quỷ - Kimetsu No Yaiba - Tập 3 - Khích Lệ Bản Thân",
        image: "https://cdn1.fahasa.com/media/catalog/product/t/h/thanh-guom-diet-quy-tap-3.jpg"
      },
    ]
  },
  {
    id: 2,
    title: "Attack On Titan",
    count: 4,
    image: "https://cdn1.fahasa.com/media/catalog/product/9/7/9781646512362.jpg",
    isPrivate: false,
    books: [
      {
        id: 1, title: "Attack On Titan - Tập 26",
        image: "https://cdn1.fahasa.com/media/catalog/product/n/x/nxbtre_full_11242025_112431.jpg"
      },
      {
        id: 2, title: "Attack On Titan - Tập 17",
        image: "https://cdn1.fahasa.com/media/catalog/product/n/x/nxbtre_full_24372024_023745.jpg"
      },
      {
        id: 3, title: "Attack On Titan - Tập 19",
        image: "https://cdn1.fahasa.com/media/catalog/product/n/x/nxbtre_full_29342024_033447.jpg"
      },
      {
        id: 4, title: "Attack On Titan - Tập 10",
        image: "https://cdn1.fahasa.com/media/catalog/product/n/x/nxbtre_full_09452024_034532.jpg"
      },]
  },
  {
    id: 3,
    title: "Thám Tử Lừng Danh Conan",
    count: 4,
    image: "https://cdn1.fahasa.com/media/catalog/product/t/h/tham-tu-lung-danh-conan_ban-thuong_bia_tap-104.jpg",
    isPrivate: true,
    books: [
      {
        id: 1, title: "Thám Tử Lừng Danh Conan - Tập 104",
        image: "https://cdn1.fahasa.com/media/catalog/product/t/h/tham-tu-lung-danh-conan_ban-thuong_bia_tap-104.jpg"
      },
      {
        id: 2, title: "Thám Tử Lừng Danh Conan - Tập 103",
        image: "https://cdn1.fahasa.com/media/catalog/product/t/h/tham-tu-lung-danh-conan_bia_tap-103.jpg"
      },
      {
        id: 3, title: "Thám Tử Lừng Danh Conan - Tập 102",
        image: "https://cdn1.fahasa.com/media/catalog/product/c/o/conan_bia_tap-102.jpg"
      },
      {
        id: 4, title: "Thám Tử Lừng Danh Conan - Tập 101",
        image: "https://cdn1.fahasa.com/media/catalog/product/t/h/tham-tu-lung-danh-conan_bia_tap-101.jpg"
      },]
  },
  {
    id: 4,
    title: "Học Viện Siêu Anh Hùng",
    count: 5,
    image: "https://cdn1.fahasa.com/media/catalog/product/h/o/hoc-vien-sieu-anh-hung_my-hero-academy_bia_bookmark_tap-38-1.jpg",
    isPrivate: false,
    books: [
      {
        id: 1, title: "My Hero Academia - Học Viện Siêu Anh Hùng - Tập 38 - Hi Vọng",
        image: "https://cdn1.fahasa.com/media/catalog/product/h/o/hoc-vien-sieu-anh-hung_my-hero-academy_bia_bookmark_tap-38-1.jpg"
      },
      {
        id: 2, title: "My Hero Academia - Học Viện Siêu Anh Hùng - Tập 37: Người Bảo Hộ, Kẻ Xâm Lăng - Tặng Kèm Bookmark",
        image: "https://cdn1.fahasa.com/media/catalog/product/h/o/hoc-vien-sieu-anh-hung_bia_bookmark_tap-37.jpg"
      },
      {
        id: 3, title: "My Hero Academia - Học Viện Siêu Anh Hùng - Tập 36 - Hai Nguồn Lửa Sáng - Tặng Kèm Bookmark",
        image: "https://cdn1.fahasa.com/media/catalog/product/h/o/hoc-vien-sieu-anh-hung_bia_bookmark_tap-36.jpg"
      },
      {
        id: 4, title: "My Hero Academia - Học Viện Siêu Anh Hùng - Tập 34 - Nước Mĩ",
          image: "https://cdn1.fahasa.com/media/catalog/product/8/9/8935244886139.jpg"
      },
      {
        id: 5, title: "My Hero Academia - Học Viện Siêu Anh Hùng - Tập 33 - Từ Lớp A Đến OFA",
          image: "https://cdn1.fahasa.com/media/catalog/product/8/9/8935244886122.jpg"
      },]
  },
  {
    id: 5,
    title: "Sword Art Online",
    count: 6,
    image: "https://cdn1.fahasa.com/media/catalog/product/z/4/z4716125662404_63b26ad29a809f23270263625cf4e561.jpg",
    isPrivate: true,
    books: [
      {
        id: 1, title: "MSword Art Online 26: Unital Ring V",
        image: "https://cdn1.fahasa.com/media/catalog/product/z/4/z4716125662404_63b26ad29a809f23270263625cf4e561.jpg"
      },
      {
        id: 2, title: "Sword Art Online 25: Unital Ring IV",
        image: "https://cdn1.fahasa.com/media/catalog/product/s/a/sao_25_-_bia_1_2.jpg"
      },
      {
        id: 3, title: "Sword Art Online 17",
        image: "https://cdn1.fahasa.com/media/catalog/product/b/i/bia-sao-17_11-9-2020-1_2.jpg  "
      },
      {
        id: 4, title: "Sword Art Online 14",
          image: "https://cdn1.fahasa.com/media/catalog/product/b/_/b_a-1-sao-14.jpg"
      },
      {
        id: 5, title: "Sword Art Online 13",
          image: "https://cdn1.fahasa.com/media/catalog/product/b/i/bia-ao-sao-13.jpg"
      },
      {
        id: 6, title: "Sword Art Online 12",
          image: "https://cdn1.fahasa.com/media/catalog/product/b/i/bia-1-sao-12.jpg"
      },]
  },
];

// Dropdown sắp xếp
function SortSelect({ sortBy, onSortChange }) {
  return (
    <FormControl size="small" sx={{ minWidth: 140 }}>
      <InputLabel id="sort-label">Sắp xếp</InputLabel>
      <Select
        labelId="sort-label"
        label="Sắp xếp"
        value={sortBy}
        onChange={e => onSortChange(e.target.value)}
      >
        <MenuItem value="az">A → Z</MenuItem>
        <MenuItem value="za">Z → A</MenuItem>
        <MenuItem value="newest">Mới nhất</MenuItem>
        <MenuItem value="oldest">Cũ nhất</MenuItem>
      </Select>
    </FormControl>
  );
}

SortSelect.propTypes = {
  sortBy: PropTypes.oneOf(["az", "za", "newest", "oldest"]).isRequired,
  onSortChange: PropTypes.func.isRequired
};

// 1 thẻ sách
function BookCard({ book, onSelect }) {
  return (
    <Card
      onClick={() => onSelect(book)}
      sx={{
        width: 200,
        m: 1,
        position: "relative",
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.03)" }
      }}
    >
      {/* Badge */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          bgcolor: book.isPrivate ? "grey.700" : "success.main",
          color: "#fff",
          px: 1,
          py: 0.5,
          borderRadius: 1,
          fontSize: "0.75rem",
          zIndex: 1
        }}
      >
        {book.isPrivate ? "Riêng tư" : "Công khai"}
      </Box>

      <CardMedia component="img" height="140" image={book.image} alt={book.title} />

      {/* Số quyển */}
      <Box
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
          bgcolor: "rgba(0,0,0,0.6)",
          color: "#fff",
          px: 1,
          borderRadius: 1,
          fontSize: "0.75rem"
        }}
      >
        {book.count} quyển
      </Box>

      <CardContent sx={{ pt: 2, pb: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {book.title}
        </Typography>
      </CardContent>
    </Card>
  );
}

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};

// Component chính
export default function BookSeries() {
  const [sortBy, setSortBy] = useState("newest");
  const [selectedSeries, setSelectedSeries] = useState(null);

  // Sắp xếp
  const sortedBooks = useMemo(() => {
    return [...BOOK_SETS].sort((a, b) => {
      switch (sortBy) {
        case "az": return a.title.localeCompare(b.title);
        case "za": return b.title.localeCompare(a.title);
        case "oldest": return a.id - b.id;
        default: return b.id - a.id;
      }
    });
  }, [sortBy]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header + Sort */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">📚 Sách theo bộ</Typography>
        <SortSelect sortBy={sortBy} onSortChange={setSortBy} />
      </Box>

      {/* Danh sách Flex-wrap */}
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
        {sortedBooks.map(series => (
          <BookCard key={series.id} book={series} onSelect={setSelectedSeries} />
        ))}
      </Box>

      {/* Chi tiết khi chọn */}
      {selectedSeries && (
        <BookSeriesDetails series={selectedSeries} onClose={() => setSelectedSeries(null)} />
      )}
    </Box>
  );
}