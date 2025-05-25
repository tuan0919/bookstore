import { useState, useEffect } from "react";
import { Box, Typography, Link } from "@mui/material";
import { grey, orange, red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {getCategories} from "../../mapper/CategoryMapper";
export interface Category {
  id : number;
  name: string;
  slug: string;
  subCategories: Category[];
}

// const categories: Category[] = [
//   {
//     name: "Sách tiếng Việt",
//     slug: "sach-tieng-viet",
//     subCategories: [
//       {
//         name: "Manga",
//         slug: "manga",
//         subCategories: [
//           { name: "Shounen", slug: "shounen" },
//           { name: "Shoujo", slug: "shoujo" },
//         ],
//       },
//       { name: "Comic", slug: "comic" },
//       { name: "Manhwa", slug: "manhwa" },
//       { name: "Manhua", slug: "manhua" },
//       { name: "Light Novel", slug: "light-novel" },
//     ],
//   },
//   {
//     name: "Sách ngoại văn",
//     slug: "sach-ngoai-van",
//     subCategories: [
//       { name: "Manga", slug: "manga" },
//       { name: "Comic", slug: "comic" },
//       { name: "Manhwa", slug: "manhwa" },
//       { name: "Manhua", slug: "manhua" },
//       { name: "Light Novel", slug: "light-novel" },
//     ],
//   },
//   {
//     name: "Sách tiếng Nhật",
//     slug: "sach-tieng-nhat",
//   },
//   {
//     name: "Sản phẩm giới hạn",
//     slug: "san-pham-gioi-han",
//   },
// ];
const categories: Category[] = getCategories();
const ageGroups = ["Dưới 6 tuổi", "6-12 tuổi", "12-18 tuổi", "Trên 18 tuổi"];
const priceRanges = ["Dưới 100K", "100K - 300K", "300K - 500K", "Trên 500K"];
const genres = ["Hành động", "Phiêu lưu", "Tình cảm", "Hài hước", "Kinh dị"];

interface FilterSidebarProps {
  currentSlug?: string;
  
}

export default function FilterSidebar({ currentSlug }: FilterSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: boolean;
  }>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (currentSlug) {
      const slugParts = currentSlug.split("/").filter(Boolean);

      if (slugParts.length > 0) {
        setShowAllCategories(false);

        const expanded = new Set<string>();
        let parentSlug = "";

        slugParts.forEach((slug) => {
          parentSlug = parentSlug ? `${parentSlug}/${slug}` : slug;
          expanded.add(parentSlug);
        });

        setExpandedCategories(expanded);
        console.log("Expanded categories:", expanded);
      }
    } else {
      setShowAllCategories(true);
      setExpandedCategories(new Set());
    }
  }, [currentSlug]);

  const handleCategoryClick = (fullSlug: string) => {
    navigate(`/category/${fullSlug}`);
  };
  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };
  const renderCategories = (
    categoriesToRender: Category[],
    parentSlug = "",
    level = 0
  ) => {
    return categoriesToRender.map((category) => {
     console.log("parentSlug ban đầu thế nào:", parentSlug);
      const fullSlug = parentSlug
        ? `${parentSlug}/${category.slug}`
        : `${category.slug}`;
        console.log("fullSlug ban đầu có rỗng ko:", fullSlug);
      const hasSubCategories =
        category.subCategories && category.subCategories.length > 0;

      // **Chỉ đổi màu đỏ cho mục đang chọn**
      const isSelected = currentSlug?.slice(1) === fullSlug;
      console.log("Current isSelected:", isSelected);
      console.log(" fullSlug:", fullSlug);
      console.log(" currentSlug:", currentSlug);
      return (
        <Box key={category.slug} pl={level * 2}>
          <Link
            underline="none"
            sx={{
              display: "block",
              py: 0.5,
              fontWeight: isSelected ? "bold" : "normal",
              color: isSelected ? red[600] : grey[800], // ❗Chỉ mục được chọn mới đỏ
              "&:hover": { color: orange[600] },
            }}
            onClick={() => {
              handleCategoryClick(fullSlug);
            }}
          >
            {category.name}
          </Link>

          {expandedCategories.has(fullSlug) && hasSubCategories && (
            <Box pl={3}>
              {renderCategories(category.subCategories!, fullSlug, level + 1)}
            </Box>
          )}
        </Box>
      );
    });
  };

  return (
    <Box
      p={2}
      border={1}
      borderColor={grey[300]}
      borderRadius={2}
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{
        backgroundColor: "white"
      }}
    >
      {/* Nhóm sản phẩm */}
      <Box p={2} border={1} borderColor={grey[300]} borderRadius={2}>
        <Typography fontWeight={700} fontSize={16} color={grey[800]}>
          NHÓM SẢN PHẨM
        </Typography>

        <Link
          href="/category"
          underline="none"
          color={showAllCategories ? red[600] : grey[800]}
          sx={{
            display: "block",
            py: 0.5,
            fontWeight: showAllCategories ? "bold" : "normal",
          }}
          onClick={(e) => {
            e.preventDefault();
            setShowAllCategories(true);
            setExpandedCategories(new Set());
            navigate("/category");
          }}
        >
          Tất Cả Nhóm Sản Phẩm
        </Link>

        {showAllCategories
          ? renderCategories(categories)
          : renderCategories(
              categories.filter((category) =>
                expandedCategories.has(category.slug)
              )
            )}
      </Box>
      {/* Nhóm Tuổi */}
      <Box>
        <Typography fontWeight={700} fontSize={16} color={grey[800]}>
          NHÓM TUỔI
        </Typography>
        {ageGroups.map((age) => (
          <FormControlLabel
            key={age}
            sx={{ display: "block" }} // Ép checkbox xuống dòng
            control={
              <Checkbox
                checked={!!selectedFilters[age]}
                onChange={() => handleFilterChange(age)}
              />
            }
            label={age}
          />
        ))}
      </Box>

      {/* Giá Tiền */}
      <Box>
        <Typography fontWeight={700} fontSize={16} color={grey[800]}>
          GIÁ TIỀN
        </Typography>
        {priceRanges.map((price) => (
          <FormControlLabel
            key={price}
            sx={{ display: "block" }} // Ép checkbox xuống dòng
            control={
              <Checkbox
                checked={!!selectedFilters[price]}
                onChange={() => handleFilterChange(price)}
              />
            }
            label={price}
          />
        ))}
      </Box>

      {/* Thể Loại */}
      <Box>
        <Typography fontWeight={700} fontSize={16} color={grey[800]}>
          THỂ LOẠI
        </Typography>
        {genres.map((genre) => (
          <FormControlLabel
            key={genre}
            sx={{ display: "block" }} // Ép checkbox xuống dòng
            control={
              <Checkbox
                checked={!!selectedFilters[genre]}
                onChange={() => handleFilterChange(genre)}
              />
            }
            label={genre}
          />
        ))}
      </Box>
    </Box>
  );
}
