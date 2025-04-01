import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    name: string,
    value: string,
) {
    return { name, value };
}

const rows = [
    createData('Mã hàng', '9784088743820'),
    createData('Tên nhà cung cấp', 'Kinokuniya Book Stores'),
    createData('Tác giả', 'Eiichiro Oda'),
    createData('NXB', 'Shueisha/Tsai Fong Books'),
    createData('Năm xuất bản', '2007'),
    createData('Ngôn ngữ', 'Tiếng Anh'),
    createData('Trọng lượng (gr)', '141'),
    createData('Kích thước bao bì', '17.4 x 11.2 x 2 cm'),
    createData('Hình thức', 'Bìa mềm'),
    createData('Số trang', '200'),
];

export function ContentTable() {
    return (
        <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }}>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ border: 0 }}
                        >
                            <TableCell component="th" scope="row" width={200} sx={{ fontWeight: 'medium' }}>
                                {row.name}
                            </TableCell>
                            <TableCell align="left">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
