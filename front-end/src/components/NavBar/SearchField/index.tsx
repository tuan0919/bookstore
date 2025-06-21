import { Box, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchContext } from "~/providers/SearchProvider";
import { useDebounce } from "~/custom_hook/useDebounce";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { searchBooks } from "~/api/book";
interface SearchBookParams {
  context?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
}
export function SearchField() {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoangding, setLoading] = useState(false);
  const {
    searchKeyword,
    setSearchKeyword,
    setSearchResults,
    filters,
    setIsResetDefaultFilters,
  } = useSearchContext();

  setIsResetDefaultFilters(true);

  // Xài kỹ thuật debounce để tránh việc gọi API liên tục khi người dùng gõ
  const debounce = useDebounce(searchKeyword, 100) ?? "";
  useEffect(() => {
    if (debounce.trim() === "") {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);
  const handleClearResult = () => {
    setSearchKeyword(""); // Xóa ô input
    if (inputRef.current) {
      (inputRef.current as HTMLInputElement).focus();
    }
  };
  const searchingBook = () => {
    setLoading(true);
    searchBooks({
      context: debounce,
      categoryId: filters.categoryId,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      page: filters.page,
      size: filters.size,
    } as SearchBookParams)
      .then((res) => {
        setSearchResults(res.result.content);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setLoading(false);
      });
    const url = `/category?categoryId=1&page=1&size=12&context=${searchKeyword}`;
    if (location.pathname === "/category") {
      // Nếu đang ở category, refresh lại trang với URL mới
      window.location.href = url;
    } else {
      // Nếu không, chuyển hướng như bình thường
      navigate(url);
    }
  };
  return (
    <Box
      sx={{
        position: "relative",
        border: "1px solid #4d4d4d",
        paddingX: "8px",
        paddingY: "2px",
        borderRadius: 2,
        flex: {
          md: 1,
          xs: 0,
        },
        width: {
          md: "auto",
          xs: 190,
        },
        backgroundColor: {
          xs: "white",
        },
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Icon clear key search */}
      {searchKeyword && !isLoangding && (
        <FontAwesomeIcon
          style={{
            position: "absolute",
            top: "50%",
            right: "calc(0.5rem + 70px )",
            transform: "translateY(-50%)",
            color: "rgba(22, 24, 35, 0.34)",
            fontSize: "1rem",
            cursor: "pointer",
            zIndex: 2,
          }}
          onClick={handleClearResult}
          icon={faCircleXmark}
        />
      )}

      <TextField
        ref={inputRef}
        placeholder="One Piece - Đảo Hải Tặc tập 63"
        variant="standard"
        sx={{
          width: 400,
        }}
        slotProps={{
          select: {
            disableUnderline: true,
          },
          input: {
            disableUnderline: true,
          },
        }}
        onFocus={() => {
          setTimeout(() => {
            if (inputRef.current) {
              const newValue =
                (inputRef.current as HTMLInputElement).value ?? "";
              if (newValue.trim() !== "" && newValue !== searchKeyword) {
                setSearchKeyword(newValue);
              }
            }
          }, 100); // Delay nhẹ để đợi autofill xong
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchKeyword(e.target.value);
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            const inputValue = (e.target as HTMLInputElement).value;
            setSearchKeyword(inputValue.trim());
            searchingBook();
          }
        }}
        value={searchKeyword ?? ""}
      />
      <Button
        variant="contained"
        size="small"
        disableTouchRipple
        color="error"
        sx={{
          paddingY: "4px",
          display: {
            xs: "none",
            md: "flex",
          },
          alignItems: "center",
        }}
        onClick={searchingBook}
      >
        <SearchIcon fontSize="small" />
      </Button>
    </Box>
  );
}
