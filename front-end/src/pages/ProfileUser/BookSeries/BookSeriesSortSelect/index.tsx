import { Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import PropTypes from "prop-types";

export default function BookSeriesSortSelect({ sortBy, onSortChange }) {
    return (
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel id="sort-label">Sắp xếp</InputLabel>
        <Select
          labelId="sort-label"
          label="Sắp xếp"
          value={sortBy}
          onChange={e => onSortChange(e.target.value)}
        >
          <MenuItem value="az">A → Z</MenuItem>
          <MenuItem value="za">Z → A</MenuItem>
          <MenuItem value="newest">Mới nhất</MenuItem>
          <MenuItem value="oldest">Cũ nhất</MenuItem>
        </Select>
      </FormControl>
    );
  }
  
  BookSeriesSortSelect.propTypes = {
    sortBy: PropTypes.oneOf(["az", "za", "newest", "oldest"]).isRequired,
    onSortChange: PropTypes.func.isRequired
  };
