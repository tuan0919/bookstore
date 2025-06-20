import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";
import { ContextFilter } from "./ContextFilter";

export default function FilterSidebar() {
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
      <CategoryFilter />
      <PriceFilter />
      <ContextFilter />
    </Box>
  );
}
