import { useState, useEffect } from "react";
import { Box, Typography, Link } from "@mui/material";
import { grey, orange, red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { getCategories } from "../../mapper/CategoryMapper";
import { getGenres } from "../../mapper/CategoryMapper";
import { useSearchContext } from "~/providers/SearchProvider";
import { useTranslation } from "react-i18next";
export interface Category {
  id: number;
  name: string;
  slug: string;
  subCategories: Category[];
}

const categories: Category[] = getCategories();

const genres = getGenres();

interface FilterSidebarProps {
  currentSlug?: string;
  onPriceFilterChange?: (selectedPrices: string[]) => void;
}

export default function FilterSidebar({
  currentSlug,
  onPriceFilterChange,
}: FilterSidebarProps) {
  const { t } = useTranslation();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: boolean;
  }>({});
  const navigate = useNavigate();
  const { setFilters } = useSearchContext();
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
      }
    } else {
      setShowAllCategories(true);
      setExpandedCategories(new Set());
    }
  }, [currentSlug]);
  const priceKeys = [
    'page.search.filter.price.item1',
    'page.search.filter.price.item2',
    'page.search.filter.price.item3',
    'page.search.filter.price.item4'
  ];

  // Map sang mảng đã dịch
  const priceRanges = priceKeys.map(key => t(key));
  const handleCategoryClick = (fullSlug: string, categoryId: number) => {
    navigate(`/category/${fullSlug}`);
    setFilters((prev) => ({ ...prev, categoryId: categoryId }));
  };
  const handleFilterChange = (filter: string) => {
    const updated = { ...selectedFilters, [filter]: !selectedFilters[filter] };
    setSelectedFilters(updated);

    // Gửi các giá tiền được chọn ra ngoài
    const selectedPrices = priceRanges.filter((price) => updated[price]);
    onPriceFilterChange?.(selectedPrices);
  };
  const renderCategories = (
    categoriesToRender: Category[],
    parentSlug = "",
    level = 0
  ) => {
    return categoriesToRender.map((category) => {
      const fullSlug = parentSlug
        ? `${parentSlug}/${category.slug}`
        : `${category.slug}`;

      const hasSubCategories =
        category.subCategories && category.subCategories.length > 0;

      // **Chỉ đổi màu đỏ cho mục đang chọn**
      const isSelected = currentSlug?.slice(1) === fullSlug;

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
              handleCategoryClick(fullSlug, category.id);
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
        backgroundColor: "white",
      }}
    >
      {/* Nhóm sản phẩm */}
      <Box p={2} border={1} borderColor={grey[300]} borderRadius={2}>
        <Typography fontWeight={700} fontSize={16} color={grey[800]}>
          {t("page.search.filter.label")}
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
          {t("page.search.filter.category")}
        </Link>

        {showAllCategories
          ? renderCategories(categories)
          : renderCategories(
              categories.filter((category) =>
                expandedCategories.has(category.slug)
              )
            )}
      </Box>

      {/* Giá Tiền */}
      <Box>
        <Typography fontWeight={700} fontSize={16} color={grey[800]}>
          {t("page.search.filter.price.title")}
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
          {t("page.search.filter.genre")}
        </Typography>
        {genres.map((genre) => (
          <FormControlLabel
            key={genre.id}
            sx={{ display: "block" }} // Ép checkbox xuống dòng
            control={
              <Checkbox
                checked={!!selectedFilters[genre.name]}
                onChange={() => handleFilterChange(genre.name)}
              />
            }
            label={genre.name}
          />
        ))}
      </Box>
    </Box>
  );
}
