import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Dropdown from 'react-bootstrap/Dropdown';

const columns = [
  {
    id: 'stt',
    label: 'STT',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'tenSP',
    label: 'Tên sản phẩm',
    maxWidth:20,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'tenNcc',
    label: 'Nhà cung cấp',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id:'soLuong',
    label: 'Số lượng',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id:'giaNhap',
    label: 'Giá nhập',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'ngayNhap',
    label: 'Ngày nhập',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'user',
    label: 'Tạo bởi',
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id:'thanhTien',
    label: 'Thành tiền',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'state',
    label: 'Trạng thái',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'act',
    label: 'Hành động',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
];
  const getStatusColor = (status) => {
  switch (status) {
    case 'Chờ duyệt':
      return 'orange'; // Màu cho trạng thái Chờ duyệt
    case 'Đã duyệt':
      return 'green'; // Màu cho trạng thái Đã duyệt
    case 'Không được duyệt':
      return 'red'; // Màu cho trạng thái Không được duyệt
    default:
      return 'black'; // Màu mặc định
  }
};

 function StockInTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);


  //gọi api hiển thị ra bảng
  useEffect(() => {
    axios.get('http://localhost:3005/stockIn/read')
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  //duyệt phiếu nhập



  return (
        <Paper sx={{ width: '100%', overflow: 'scroll' }}>
            <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: '1.38rem',
                                        maxWidth: column.maxWidth,
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
                          const counter = page * rowsPerPage + index + 1;
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    style={{ cursor: 'pointer' }}
                                    tabIndex={-1}
                                    key={row.code}
                                >
                                    {columns.map((column) => {
                                        let value = row[column.id];
                                        if (column.id === 'stt') {
                                          value = counter;
                                        } else if (column.id === 'act') {
                                          value = 
                                            <Dropdown>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                  ...
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                  <Dropdown.Item 
                                                    style={{color: 'green', fontSize:'1.2rem'}} 
                                                    >Duyệt
                                                  </Dropdown.Item>
                                                  <Dropdown.Item 
                                                    style={{color: 'red', fontSize:'1.2rem'}}
                                                    >Không duyệt
                                                  </Dropdown.Item>
                                                </Dropdown.Menu>
                                              </Dropdown>
                                          
                                        } else if(column.id === 'thanhTien'){
                                            value = parseFloat(row['giaNhap']) * parseFloat(row['soLuong']) * (1+parseFloat(row['chietKhau'])/100.0 );
                                        }
                                        else {
                                          value = row[column.id];
                                        }
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                
                                                style={{ 
                                                  fontSize: '1.24rem', 
                                                  fontWeight: '3rem' ,
                                                  color:
                                                    column.id === 'state'
                                                    ? getStatusColor(row[column.id])
                                                    : 'inherit',
                                                }}
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
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
  );
}

export default StockInTable;