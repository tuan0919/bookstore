import { Box, Button, Rating, TextField } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { useState } from "react";

export function InputBox({
  sx = undefined,
}: {
  sx?: SxProps<Theme> | undefined;
}) {
  const [focused, setFocused] = useState(false);
  const [rating, setRating] = useState<number | null>(0);

  const handleCancel = () => {
    setFocused(false);
    setRating(0);
  };

  return (
    <Box sx={sx}>
      <Rating
        name="half-rating"
        precision={1}
        value={rating}
        onChange={(_, newValue) => setRating(newValue)}
      />

      <TextField
        sx={{ width: "100%", mt: 1 }}
        variant="standard"
        onFocus={() => setFocused(true)}
      />

      {focused && (
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 1 }}
        >
          <Button onClick={handleCancel}>Hủy</Button>
          <Button variant="contained" color="primary">
            Bình luận
          </Button>
        </Box>
      )}
    </Box>
  );
}
