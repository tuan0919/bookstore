import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  FormControl,
  styled,
} from "@mui/material";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
export interface NewBookCollectionDialogProps {
  open: boolean;
  onClose: () => void;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function NewBookCollectionDialog(props: NewBookCollectionDialogProps) {
  const { onClose, open } = props;
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Bộ sách mới"}</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "20rem",
          }}
        >
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button
              component="label"
              disableElevation
              disableFocusRipple
              disableRipple
              disableTouchRipple
              role={undefined}
              tabIndex={-1}
              sx={{
                width: "15rem",
                height: "15rem",
                backgroundSize: "100% 100%",
                backgroundPosition: "",
                backgroundImage:
                  'url("https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=")',
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              />
            </Button>
          </Box>
          <TextField label="Tiêu đề bộ sách" variant="standard" />
          <TextField label="Mô tả" variant="standard" />
          <FormControl variant="standard">
            <InputLabel id="demo-simple-select-label">
              Chế độ hiển thị
            </InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              <MenuItem value={10}>
                <Box display={"flex"} gap={2}>
                  <PublicRoundedIcon />
                  <Typography>Công khai</Typography>
                </Box>
              </MenuItem>
              <MenuItem value={5}>
                <Box display={"flex"} gap={2}>
                  <LockRoundedIcon />
                  <Typography>Riêng tư</Typography>
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleClose} autoFocus>
          Tạo
        </Button>
      </DialogActions>
    </Dialog>
  );
}
