import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export interface SaveBookDialogProps {
  open: boolean;
  onClose: () => void;
  onClickAddBtn: () => void;
}

export function SaveBookDialog(props: SaveBookDialogProps) {
  const { onClose, open, onClickAddBtn } = props;
  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Lưu sách vào bộ..."}</DialogTitle>
      <DialogContent>
        <DialogContentText display={"flex"} flexDirection={"column"}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Tuyển tập truyện shounen"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Tuyển tập truyện tình cảm"
          />
          <FormControlLabel control={<Checkbox />} label="Nên mua" />
          <FormControlLabel control={<Checkbox />} label="Sẽ mua sau" />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Truyện ít tái bản"
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddRoundedIcon />}
          onClick={() => onClickAddBtn()}
          sx={{ borderRadius: 23, px: 2 }}
        >
          Tạo bộ sách mới
        </Button>
      </DialogActions>
    </Dialog>
  );
}
