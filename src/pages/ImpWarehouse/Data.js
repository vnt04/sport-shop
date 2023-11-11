import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 'stt', label: 'STT', minWidth: 100, format: (value) => value.toLocaleString('en-US') },
    { id: 'maHoaDon', label: 'Mã hóa đơn', minWidth: 100 },
    {
        id: 'resoure',
        label: 'Nhà cung cấp',
        minWidth: 0,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'day',
        label: 'Ngày nhập',
        minWidth: 100,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'creator',
        label: 'Tạo bởi',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    { id: 'state', label: 'Trạng thái', minWidth: 100 },

    { id: 'act', label: 'Hành động', minWidth: 10, align: ' center' },
];
var counter = 0;
function createData(maHoaDon, resoure, day, creator, state, act) {
    counter++;
    const stt = counter;
    return { stt, maHoaDon, resoure, day, creator, state, act };
}

const rows = [
    createData('NK01', 'MU Arena', '11/11/2023', 'Nghiep Van', 'Chờ duyệt', '...'),

    createData('NK01', 'MU Arena', '11/11/2023', 'Nghiep Van', 'Chờ duyệt', '...'),

    createData('NK01', 'MU Arena', '11/11/2023', 'Nghiep Van', 'Chờ duyệt', '...'),

    createData('NK01', 'MU Arena', '11/11/2023', 'Nghiep Van', 'Chờ duyệt', '...'),
    createData('NK01', 'MU Arena', '11/11/2023', 'Nghiep Van', 'Chờ duyệt', '...'),
    createData('NK01', 'MU Arena', '11/11/2023', 'Nghiep Van', 'Chờ duyệt', '...'),

    createData('NK01', 'MU Arena', '11/11/2023', 'Nghiep Van', 'Chờ duyệt', '...'),

    createData('NK01', 'MU Arena', '11/11/2023', 'Nghiep Van', 'Chờ duyệt', '...'),

    createData('NK01', 'MU Arena', '11/11/2023', 'Nghiep Van', 'Chờ duyệt', '...'),
    createData('NK01', 'MU Arena', '11/11/2023', 'Nghiep Van', 'Chờ duyệt', '...'),
    createData('NK01', 'MU Arena', '11/11/2023', 'Nghiep Van', 'Chờ duyệt', '...'),

    createData('NK01', 'MU Arena', '11/11/2023', 'Nghiep Van', 'Chờ duyệt', '...'),

    createData('NK01', 'MU Arena', '11/11/2023', 'Nghiep Van', 'Chờ duyệt', '...'),

    createData('NK01', 'MU Arena', '11/11/2023', 'Nghiep Van', 'Chờ duyệt', '...'),
    createData('NK01', 'MU Arena', '11/11/2023', 'Nghiep Van', 'Chờ duyệt', '...'),
    createData('NK01', 'MU Arena', '11/11/2023', 'Nghiep Van', 'Chờ duyệt', '...'),

    createData('NK01', 'MU Arena', '11/11/2023', 'Nghiep Van', 'Chờ duyệt', '...'),

    createData('NK01', 'MU Arena', '11/11/2023', 'Nghiep Van', 'Chờ duyệt', '...'),

    createData('NK01', 'MU Arena', '11/11/2023', 'Nghiep Van', 'Chờ duyệt', '...'),
    createData('NK01', 'MU Arena', '11/11/2023', 'Nghiep Van', 'Chờ duyệt', '...'),
];

export default function Data() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'scroll' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        fontWeight: 'bold',
                                        fontSize: '1.8rem',
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    style={{ cursor: 'pointer' }}
                                    tabIndex={-1}
                                    key={row.code}
                                >
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ fontSize: '1.8rem' }}
                                            >
                                                {column.format && typeof value === 'number'
                                                    ? column.format(value)
                                                    : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
