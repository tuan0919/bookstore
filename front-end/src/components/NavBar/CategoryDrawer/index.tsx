import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionSummaryProps,
  Box,
  Divider,
  Drawer,
  styled,
  Typography,
  Link,
} from "@mui/material";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import shadows from "@mui/material/styles/shadows";
import { grey, red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { Category } from "~/pages/Category/FilterSidebar";
import { getCategories } from "~/mapper/CategoryMapper";
interface CategoryDrawerProps {
  open: boolean;
  setClose: () => void;
}

const CustomizeAccordion = styled(Accordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  cursor: "pointer",
  "&.Mui-expanded": {
    margin: 0,
  },
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const CustomizeLink = styled(Link)(() => ({
  color: grey["900"],
  textDecoration: "none",
  margin: "5px 0",
  fontSize: 14,
  "&:hover": {
    color: red["900"],
    textDecoration: "underline",
    fontWeight: 500,
  },
}));

const CustomizeAccordionSummary = styled((props: AccordionSummaryProps) => {
  return (
    <AccordionSummary
      disableRipple
      disableTouchRipple
      slots={{
        root: Box, // Thay button bằng Box
      }}
      slotProps={{
        root: {
          sx: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: 2,
            px: 1,
            pl: 2,
          },
        },
      }}
      {...props} // Tránh truyền các props lỗi vào Box
    />
  );
})({});

const CustomizeAccordionDetails = styled(AccordionDetails)(() => ({
  paddingLeft: 30,
  display: "flex",
  flexDirection: "column",
}));

export function CategoryDrawer({ open, setClose }: CategoryDrawerProps) {
  const navigate = useNavigate();
  // Hàm xử lý khi click vào thể loại
  const handleCategoryClick = (categoryPath: string) => {
    navigate(`/category/${categoryPath}`);
    setClose(); // Đóng Drawer sau khi chọn
  };
  const categories: Category[] = getCategories();

  return (
    <Drawer
      open={open}
      sx={{
        "& .MuiPaper-root": {
          overflowY: "visible",
        },
      }}
    >
      <Box display={"flex"} py={2} px={3} position={"relative"}>
        <Typography fontWeight={"bold"}>Khám phá sách theo danh mục</Typography>
        <Box
          borderRadius={300}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          bgcolor={"white"}
          position={"absolute"}
          right={-13}
          onClick={setClose}
          sx={{ cursor: "pointer" }}
          boxShadow={shadows["10"]}
        >
          <KeyboardArrowLeftRoundedIcon />
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          width: 300,
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "&::-webkit-scrollbar-track": {
            display: "none",
          },
        }}
      >
        {categories.map((category) => {
          return (
            <CustomizeAccordion key={category.id}>
              <CustomizeAccordionSummary
                expandIcon={<KeyboardArrowDownRoundedIcon />}
              >
                <Typography fontWeight={"bold"}>{category.name}</Typography>
              </CustomizeAccordionSummary>
              <CustomizeAccordionDetails>
                {category.subCategories.map((subCategory) => {
                  return (
                    <CustomizeLink
                      key={subCategory.id}
                      onClick={() =>
                        handleCategoryClick(
                          category.slug + "/" + subCategory.slug
                        )
                      }
                    >
                      {subCategory.name}
                    </CustomizeLink>
                  );
                })}
              </CustomizeAccordionDetails>
            </CustomizeAccordion>
          );
        })}
      </Box>
    </Drawer>
  );
}
