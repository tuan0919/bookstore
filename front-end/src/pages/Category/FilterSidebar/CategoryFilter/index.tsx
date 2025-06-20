import { Box, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { useCategoryContext } from "~/context/CategoryContext";
import { CategoryResponseDTO } from "~/types/book";

export function CategoryFilter() {
  const {
    summaryAboutBook: summary,
    categoryId,
    setCategoryId,
  } = useCategoryContext();

  // Đệ quy render category, click sẽ setCategoryId và reset page về 1
  const renderCategories = (category: CategoryResponseDTO, level = 0) => {
    if (!category) return null;
    const isSelected = category.id === categoryId;
    return (
      <Box
        key={category.id}
        pl={level * 2}
        py={0.5}
        sx={{ cursor: "pointer", userSelect: "none" }}
        onClick={(e) => {
          e.stopPropagation();
          console.log("category.id", category.id);
          setCategoryId(category.id);
        }}
      >
        <Typography
          fontWeight={isSelected ? 700 : level === 0 ? 700 : 400}
          fontSize={level === 0 ? 16 : 14}
          color={isSelected ? red[600] : grey[800]}
        >
          {category.name}
        </Typography>
        {Array.isArray(category.children) &&
          category.children.length > 0 &&
          category.children.map((child) => renderCategories(child, level + 1))}
      </Box>
    );
  };

  return (
    <Box p={2} border={1} borderColor={grey[300]} borderRadius={2}>
      <Typography fontWeight={700} fontSize={16} color={grey[800]} mb={1}>
        Danh mục sản phẩm
      </Typography>
      {summary?.categoryResponseDTOs ? (
        renderCategories(summary.categoryResponseDTOs)
      ) : (
        <Typography color={grey[500]}>Không có danh mục</Typography>
      )}
    </Box>
  );
}
