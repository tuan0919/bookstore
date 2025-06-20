import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useBookDetailsContext } from "~/context/BookDetailsContext";
import { Box, Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";

function createData(name: string, value: string) {
  return { name, value };
}

export function ContentTable() {
  const { bookDetails } = useBookDetailsContext();
  const { t } = useTranslation();

  const detailsRows = bookDetails
    ? [
        createData(t('page.bookDetail.bookInfo.second.itme1'), bookDetails.productCode),
        createData(t('page.bookDetail.bookInfo.second.itme2'), bookDetails.publisher),
        createData(t('page.bookDetail.bookInfo.second.itme3'), bookDetails.author),
        createData(t('page.bookDetail.bookInfo.second.itme4'), bookDetails.publisher),
        createData(t('page.bookDetail.bookInfo.second.itme5'), bookDetails.publishYear),
        createData(t('page.bookDetail.bookInfo.second.itme6'), bookDetails.language),
        createData(t('page.bookDetail.bookInfo.second.itme7'), bookDetails.weight.toString()),
        createData(t('page.bookDetail.bookInfo.second.itme8'), `${bookDetails.size}`),
        createData(t('page.bookDetail.bookInfo.second.itme9'), bookDetails.format),
        createData(t('page.bookDetail.bookInfo.second.itme10'), bookDetails.pageCount.toString()),
      ]
    : [];

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }}>
        <TableBody>
          {bookDetails ? (
            detailsRows.map((row) => (
              <TableRow key={row.name} sx={{ border: 0 }}>
                <TableCell
                  component="th"
                  scope="row"
                  width={200}
                  sx={{ fontWeight: "medium" }}
                >
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.value}</TableCell>
              </TableRow>
            ))
          ) : (
            <>
              {[...Array(7)].map((_, index) => (
                <Box key={index} sx={{ width: "100%", gap: 2, display: "flex" }}>
                  <Skeleton variant="text" sx={{ flex: 1 }} />
                  <Skeleton variant="text" sx={{ flex: 1 }} />
                </Box>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
