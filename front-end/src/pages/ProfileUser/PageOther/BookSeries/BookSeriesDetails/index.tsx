import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 9999
  },
  modal: {
    width: '80%', maxHeight: '80%', padding: 16, overflowY: 'auto'
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16
  }
};

export default class BookBookSeriesDetail extends Component {
  static propTypes = {
    series: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      count: PropTypes.number,
      books: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.number, title: PropTypes.string, image: PropTypes.string })
      )
    }).isRequired,
    onClose: PropTypes.func.isRequired
  };

  render() {
    const { series, onClose } = this.props;
    return (
      <Box sx={styles.overlay} onClick={onClose}>
        <Card sx={styles.modal} onClick={e => e.stopPropagation()}>
          <Box sx={styles.header}>
            <Typography variant="h6">
              {series.title} ({series.count} quyển)
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container spacing={2}>
            {series.books.map(book => (
              <Grid item xs={6} md={4} key={book.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="250"
                    image={book.image}
                    alt={book.title}
                  />
                  <CardContent>
                    <Typography variant="body2" noWrap>
                      {book.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Box>
    );
  }
}
