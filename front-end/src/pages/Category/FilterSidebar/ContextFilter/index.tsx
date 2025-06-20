import { Box, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState, useEffect } from "react";
import { useCategoryContext } from "~/context/CategoryContext";
import { useTranslation } from "react-i18next";

export function ContextFilter() {
  const { context, setContext } = useCategoryContext();
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(context);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== context) {
        setContext(inputValue);
      }
    }, 500); // debounce 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, context, setContext]);

  return (
    <Box>
      <Typography fontWeight={700} fontSize={16} color={grey[800]} mb={1}>
        {t("page.search.filter.context")}
      </Typography>
      <TextField
        size="small"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={t("page.search.filter.placeholder")}
      />
    </Box>
  );
}
