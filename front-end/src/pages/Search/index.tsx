import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Grid2 from "@mui/material/Grid2";
import Filter from "./Filter";
import Content from "./Content";
function Search() {
  const [searchParams] = useSearchParams();
  const keyWord = searchParams.get("keyword") || "";
  const [filter, setFilter] = useState({
    sortBy: "default",
    ageRange: "",
    priceRange: "",
  });

  return (
    <Grid2
      container
      spacing={2}
      sx={{ maxWidth: "1200px", mx: "auto", flexWrap: "wrap", paddingTop:"10px" }}
    >
      <Grid2 size={{ xs: 12 }}  sx={{ width: { xs: "100%", md: "290px" } }}>
        <Filter filters={filter} setFilters={setFilter} />
      </Grid2>

      <Grid2 size={{ xs: 12 }}  sx={{ flex: 1 }}>
        <Content keyword={keyWord} filters={filter} />
      </Grid2>
    </Grid2>
  );
}
export default Search;
