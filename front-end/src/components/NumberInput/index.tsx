import * as React from "react";
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
interface QuantityInputProps extends Omit<NumberInputProps, "onChange"> {
  bookId: string;
  onIncrease?: (bookId: string, newQuantity: number) => void;
  onDecrease?: (bookId: string, newQuantity: number) => void;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: number | null
  ) => void;
}
const NumberInput = React.forwardRef(function CustomNumberInput(
  {
    bookId,
    onIncrease,
    onDecrease,
    onChange,
    value,
    ...rest
  }: QuantityInputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const handleIncrease = () => {
    if (onIncrease) onIncrease(bookId, +1);
  };

  const handleDecrease = () => {
    if (onDecrease) onDecrease(bookId, -1);
  };
  return (
    <BaseNumberInput
      value={value}
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: "increment",
          onClick: handleIncrease,
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
          onClick: handleDecrease,
        },
        input: {
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            const parsed = parseInt(e.target.value, 10);
            const val = isNaN(parsed) ? null : parsed;

            // Nếu value (từ props) là giới hạn tối đa:
            const maxQuantity = typeof value === "number" ? value : Infinity;

            if (val !== null && val > maxQuantity) {
              // Nếu vượt quá giới hạn, reset về max (hoặc không gọi gì cả)
              e.target.value = String(maxQuantity);
              if (onChange) onChange(e, maxQuantity);
            } else {
              if (onChange) onChange(e, val);
            }
          },
        },
      }}
      {...rest}
      ref={ref}
    />
  );
});

export default function QuantityInput(props: QuantityInputProps) {
  return <NumberInput aria-label="Quantity Input" min={1} {...props} />;
}

const red = {
  100: "#c12530",
  200: "#b6daff",
  300: "#66b2ff",
  400: "#3399ff",
  500: "#007fff",
  600: "#0072e5",
  700: "#0059B2",
  800: "#004c99",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 0px 5px;
`
);

const StyledInput = styled("input")(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  border: 0;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 3rem;
  text-align: center;



  &:focus-visible {
    outline: 0;
  }
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
  background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  width: 20px;
  height: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  
  &:hover {
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? red[100] : red[100]};
    border-color: ${theme.palette.mode === "dark" ? red[100] : red[100]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`
);
