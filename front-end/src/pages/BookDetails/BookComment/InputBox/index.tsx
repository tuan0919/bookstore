import { Box, Button, Rating, TextField } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { useState } from "react";
import { useTranslation } from "react-i18next";
export function InputBox({
  sx = undefined,
  onSubmit,
}: {
  sx?: SxProps<Theme>;
  onSubmit?: (comment: { rating: number; text: string }) => void;
}) {
  const [focused, setFocused] = useState(false);
  const [rating, setRating] = useState<number | null>(0);
  const [text, setText] = useState("");
  const {t} = useTranslation();
  const handleCancel = () => {
    setFocused(false);
    setRating(0);
    setText("");
  };

  const handleSubmit = () => {
    if (!text.trim() || !rating) return;

    onSubmit?.({ rating, text: text.trim() });
    handleCancel();
  };

  return (
    <Box sx={sx}>
      <Rating
        name="rating"
        precision={1}
        value={rating}
        onChange={(_, newValue) => setRating(newValue)}
      />

      <TextField
        sx={{ width: "100%", mt: 1 }}
        variant="standard"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setFocused(true)}
        placeholder={t("page.bookDetail.bookComment.placeholder")}
        multiline
      />

      {focused && (
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 1 }}
        >
          <Button onClick={handleCancel}>Hủy</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!text.trim() || !rating}
          >
            Bình luận
          </Button>
        </Box>
      )}
    </Box>
  );
}
