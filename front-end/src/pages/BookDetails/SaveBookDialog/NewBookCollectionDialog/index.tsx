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
} from "@mui/material";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
export interface NewBookCollectionDialogProps {
  open: boolean;
  onClose: () => void;
}

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
        <Box sx={{ display: "flex", flexDirection: "column", my: 3, gap: 2 }}>
          <TextField label="Tiêu đề bộ sách" variant="outlined" />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >
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
