import { useLocation, useNavigate } from "react-router-dom";
import { Container, Breadcrumbs, Typography } from "@mui/material";
import { Grid2 } from "@mui/material";
import FilterSidebar from "./filter";
import BookList from "./content";
import Link from "@mui/material/Link";
import { yellow } from "@mui/material/colors";
import { useSearchContext } from "~/providers/SearchProvider";
import { useState } from "react";
function CategoryPage() {
  const location = useLocation();
  const path = location.pathname.replace("/category", "").trim();
  const categories = path.split("/").filter(Boolean);
  const navigate = useNavigate();
  const { searchResults } = useSearchContext();
  const handleBreadcrumbClick = (fullPath: string) => {
    navigate(fullPath); // Dùng navigate để chuyển hướng mà không reload trang
  };
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);

  return (
    <>
      <Container
        sx={{ marginTop: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator="›"
          aria-label="breadcrumb"
          sx={{
            fontSize: 12,
            "& .MuiLink-root": { fontSize: 14 },
            "& .MuiTypography-root": { fontSize: 14 },
          }}
        >
          <Link
            component="button"
            underline="none"
            color="black"
            onClick={() => handleBreadcrumbClick("/category")}
          >
            TẤT CẢ NHÓM SẢN PHẨM
          </Link>
          {categories.map((category, index) => {
            const fullPath = `/category/${categories
              .slice(0, index + 1)
              .join("/")}`;
            const isLast = index === categories.length - 1;

            return isLast ? (
              <Typography key={category} color={yellow[700]} fontWeight="bold">
                {category.replace(/-/g, " ")}
              </Typography>
            ) : (
              <Link
                key={category}
                component="button"
                underline="hover"
                color="inherit"
                onClick={() => handleBreadcrumbClick(fullPath)}
              >
                {category.replace(/-/g, " ")}
              </Link>
            );
          })}
        </Breadcrumbs>

        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <FilterSidebar currentSlug={path} 
            onPriceFilterChange={setSelectedPrices}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 9 }}>
            <BookList books={searchResults} selectedPrices={selectedPrices} />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}

export default CategoryPage;
