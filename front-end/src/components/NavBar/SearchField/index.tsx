import { Box, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchContext } from "~/providers/SearchProvider";
import { useDebounce } from "~/custom_hook/useDebounce";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export function SearchField() {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [isLoangding, setLoading] = useState(false);
  const {
    searchKeyword,
    setSearchKeyword,
    searchResults,
    setSearchResults,
    filters,
    setFilters,
  } = useSearchContext();
  // Xài kỹ thuật debounce để tránh việc gọi API liên tục khi người dùng gõ
  const debounce = useDebounce(searchKeyword, 1000);
  useEffect(() => {
    async function fetchData() {
      const bare_token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5YXRvIiwiaWF0IjoxNzQ4MDc0MjkwLCJleHAiOjE3NTA2NjYyOTB9.ThI_l6-lTMjMT8BMWXTcXrRTwn6Jz06PdQ-AVeGbPvc";
      const queryParams = new URLSearchParams({
        page: filters.page.toString(),
        size: filters.size.toString(),
        context: debounce,
        categoryId: filters.categoryId.toString(),
        minPrice: filters.minPrice.toString(),
        maxPrice: filters.maxPrice.toString(),
      }).toString();
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/book?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bare_token}`,
          },
        }
      );
      const data = await response.json();
      setLoading(false);
      setSearchResults(data);
    }
    if (debounce.trim() === "") {
      setSearchResults([]);
      return;
    } else {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);
  const handleClearResult = () => {
    setSearchResults([]); // Xóa kết quả tìm kiếm
    setSearchKeyword(""); // Xóa ô input
    if (inputRef.current) {
      (inputRef.current as HTMLInputElement).focus();
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchKeyword(e.target.value);
        }}
        value={searchKeyword}
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
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            navigate("/category");
          }, 1000);
        }}
      >
        <SearchIcon fontSize="small" />
      </Button>
    </Box>
  );
}
