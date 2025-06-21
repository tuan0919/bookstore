import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useCategoryContext } from "~/context/CategoryContext";
import { useTranslation } from "react-i18next";

export function PriceFilter() {
  const { maxPrice, minPrice, updatePriceRange } = useCategoryContext();
  const { t } = useTranslation();

  const priceValues = [
    { maxPrice: 100000, minPrice: undefined }, // Dưới 100k
    { maxPrice: 300000, minPrice: 100000 }, // 100k - 300k
    { maxPrice: 500000, minPrice: 300000 }, // 300k - 500k
    { maxPrice: undefined, minPrice: 500000 }, // Trên 500k
  ];
  const priceKeys = [
    "page.search.filter.price.item1",
    "page.search.filter.price.item2",
    "page.search.filter.price.item3",
    "page.search.filter.price.item4",
  ];
  const priceRanges = priceKeys.map((key) => t(key));

  // Hàm tìm index khớp
  const findMatchingIndex = (
    minP: number | undefined,
    maxP: number | undefined
  ) => {
    for (let i = 0; i < priceValues.length; i++) {
      const val = priceValues[i];
      if (
        (val.minPrice === undefined
          ? minP === undefined
          : val.minPrice === minP) &&
        (val.maxPrice === undefined
          ? maxP === undefined
          : val.maxPrice === maxP)
      ) {
        return i;
      }
    }
    return -1;
  };

  // Tự động chọn nếu minPrice/maxPrice match
  const [selectedPrice, setSelectedPrice] = useState("");
  useEffect(() => {
    const idx = findMatchingIndex(minPrice, maxPrice);
    if (idx !== -1) {
      setSelectedPrice(priceRanges[idx]);
    } else {
      setSelectedPrice("");
    }
    // eslint-disable-next-line
  }, [minPrice, maxPrice, t]); // t để re-render khi đổi ngôn ngữ

  // onChange chỉ xử lý chọn mới
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const clickedValue = event.target.value;
    if (clickedValue !== selectedPrice) {
      setSelectedPrice(clickedValue);
      const idx = priceRanges.findIndex((label) => label === clickedValue);
      if (idx !== -1) {
        updatePriceRange(priceValues[idx].minPrice, priceValues[idx].maxPrice);
      }
    }
    // Nếu click lại radio đã chọn, không làm gì ở đây (sẽ xử lý ở onClick)
  };

  // onClick xử lý undo (bấm lại radio đã chọn)
  const handleRadioClick = (label: string) => {
    if (selectedPrice === label) {
      setSelectedPrice("");
      updatePriceRange(undefined, undefined);
    }
  };

  return (
    <Box>
      <Typography fontWeight={700} fontSize={16} color={grey[800]} mb={1}>
        {t("page.search.filter.price.title")}
      </Typography>
      <RadioGroup
        value={selectedPrice}
        onChange={handlePriceChange}
        name="price-filter"
      >
        {priceRanges.map((price) => (
          <FormControlLabel
            key={price}
            value={price}
            control={<Radio />}
            label={price}
            sx={{ display: "block" }}
            onClick={() => handleRadioClick(price)}
          />
        ))}
      </RadioGroup>
    </Box>
  );
}
