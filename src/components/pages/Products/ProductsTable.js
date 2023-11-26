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
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'gia',
    label: 'Giá sản phẩm',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'tenDVT',
    label: 'Đơn vị tính',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'slKho',
    label: 'Số lượng tồn kho',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'tenLoai',
    label: 'Loại sản phẩm',
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

 function ProductsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);

  useEffect(() => {
  let unit_map = {};
  let cate_map = {};
  axios.get('http://localhost:3005/unit/read')
    .then(function (unitResponse) {
      unitResponse.data.forEach(unit => {
        unit_map[unit.maDVT] = unit.tenDVT;
      });
    })
    axios.get('http://localhost:3005/category/read')
    .then(function(cateResponse){
      cateResponse.data.forEach(cate =>{
        cate_map[cate.maLoai] = cate.tenLoai;
      })
    })
    axios.get('http://localhost:3005/product/read')
    .then(function (productResponse) {
      const products = productResponse.data.map(prod => ({
        ...prod,
        tenDVT: unit_map[prod.maDVT] || prod.tenDVT,
        tenLoai: cate_map[prod.maLoai] || prod.tenLoai,
      }));

      setData(products); 
    })
    .catch(function (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    });
    
}, []);


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
                                        fontSize: '1.4rem',
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
                                    key={index}
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
                                                  <Dropdown.Item style={{color: 'green', fontSize:'1.2rem'}} href="#/action-1">Duyệt bán</Dropdown.Item>
                                                  <Dropdown.Item style={{color: 'red', fontSize:'1.2rem'}} href="#/action-1">Chỉnh sửa</Dropdown.Item>
                                                </Dropdown.Menu>
                                              </Dropdown>}
                                        else {
                                          value = row[column.id];
                                        }
                                        return (
                                            <TableCell
                                                key={`${column.id}-${index}`}
                                                align={column.align}
                                                style={{ fontSize: '1.4rem' }}
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

export default ProductsTable;