import { Container } from "@mui/material";
import { Grid2 } from "@mui/material";
import { CategoryContextProvider } from "~/context/CategoryContext";
import FilterSidebar from "./FilterSidebar";
import BookList from "./BookList";
function CategoryPage() {
  return (
    <>
      <CategoryContextProvider>
        <Container
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <FilterSidebar />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 9 }}>
              <BookList />
            </Grid2>
          </Grid2>
        </Container>
      </CategoryContextProvider>
    </>
  );
}

export default CategoryPage;
