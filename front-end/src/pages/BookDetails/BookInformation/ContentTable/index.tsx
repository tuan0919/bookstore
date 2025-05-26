import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useBookDetailsContext } from "~/context/BookDetailsContext";
import { Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

function createData(name: string, value: string) {
  return { name, value };
}

const rows = [
  createData("Mã hàng", "9784088743820"),
  createData("Tên nhà cung cấp", "Kinokuniya Book Stores"),
  createData("Tác giả", "Eiichiro Oda"),
  createData("NXB", "Shueisha/Tsai Fong Books"),
  createData("Năm xuất bản", "2007"),
  createData("Ngôn ngữ", "Tiếng Anh"),
  createData("Trọng lượng (gr)", "141"),
  createData("Kích thước bao bì", "17.4 x 11.2 x 2 cm"),
  createData("Hình thức", "Bìa mềm"),
  createData("Số trang", "200"),
];

export function ContentTable() {
  const { bookDetails } = useBookDetailsContext();
  const [detaislRows, setDetaislRows] = useState<
    {
      name: string;
      value: string;
    }[]
  >([]);
  useEffect(() => {
    if (bookDetails) {
      const details = [
        createData("Mã hàng", bookDetails.productCode),
        createData("Tên nhà cung cấp", bookDetails.publisher),
        createData("Tác giả", bookDetails.author),
        createData("NXB", bookDetails.publisher),
        createData("Năm xuất bản", bookDetails.publishYear),
        createData("Ngôn ngữ", bookDetails.language),
        createData("Trọng lượng (gr)", bookDetails.weight.toString()),
        createData("Kích thước bao bì", `${bookDetails.size}`),
        createData("Hình thức", bookDetails.format),
        createData("Số trang", bookDetails.pageCount.toString()),
      ];
      setDetaislRows(details);
    }
  }, [bookDetails]);
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }}>
        <TableBody>
          {bookDetails ? (
            detaislRows.map((row) => (
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
              <Box sx={{ width: "100%", gap: 2, display: "flex" }}>
                <Skeleton variant="text" sx={{ flex: 1 }} />
                <Skeleton variant="text" sx={{ flex: 1 }} />
              </Box>
              <Box sx={{ width: "100%", gap: 2, display: "flex" }}>
                <Skeleton variant="text" sx={{ flex: 1 }} />
                <Skeleton variant="text" sx={{ flex: 1 }} />
              </Box>
              <Box sx={{ width: "100%", gap: 2, display: "flex" }}>
                <Skeleton variant="text" sx={{ flex: 2 }} />
                <Skeleton variant="text" sx={{ flex: 1 }} />
              </Box>
              <Box sx={{ width: "100%", gap: 2, display: "flex" }}>
                <Skeleton variant="text" sx={{ flex: 3 }} />
                <Skeleton variant="text" sx={{ flex: 1 }} />
              </Box>
              <Box sx={{ width: "100%", gap: 2, display: "flex" }}>
                <Skeleton variant="text" sx={{ flex: 1 }} />
                <Skeleton variant="text" sx={{ flex: 2 }} />
              </Box>
              <Box sx={{ width: "100%", gap: 2, display: "flex" }}>
                <Skeleton variant="text" sx={{ flex: 1 }} />
                <Skeleton variant="text" sx={{ flex: 1 }} />
              </Box>
              <Box sx={{ width: "100%", gap: 2, display: "flex" }}>
                <Skeleton variant="text" sx={{ flex: 2 }} />
                <Skeleton variant="text" sx={{ flex: 5 }} />
                <Skeleton variant="text" sx={{ flex: 2 }} />
              </Box>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
