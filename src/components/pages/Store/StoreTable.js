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
import { Button } from 'react-bootstrap';
import UpdatePrice from './UpdatePrice';
import Notify from '~/components/Notify';


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
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  
  {
    id: 'giaBan',
    label: 'Giá bán',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'soLuong',
    label: 'Số lượng',
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
    id: 'tenLoai',
    label: 'Loại sản phẩm',
    minWidth: 100,
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

function StoreTable({ searchQuery,sortOrder }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [selectedRowId,setSelectedRowId] = useState(null);
    const [showUpdatePrice,setShowUpdatePrice] = useState(false);
    const [formData,setFormData] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [showAdmin, setShowAdmin]  = useState(false);

    const user = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  let unitData = {};
  let cateData = {};
  const getData = async () => {
    try {
      const unitResponse = await axios.get('http://localhost:3005/unit/read');
      const cateResponse = await axios.get('http://localhost:3005/category/read');
      const storeResponse = await axios.get('http://localhost:3005/store/read');

      unitData = unitResponse.data.reduce((acc, unit) => {
        acc[unit.maDVT] = unit.tenDVT;
        return acc;
      }, {});

      cateData = cateResponse.data.reduce((acc, cate) => {
        acc[cate.maLoai] = cate.tenLoai;
        return acc;
      }, {});

      const processedStore = storeResponse.data.map(prod => ({
        ...prod,
        tenDVT: unitData[prod.maDVT] || prod.tenDVT,
        tenLoai: cateData[prod.maLoai] || prod.tenLoai,
      }));

      return processedStore;
    } catch (error) {
      // Xử lý lỗi ở đây nếu cần
      console.error('Đã xảy ra lỗi khi lấy dữ liệu:', error);
      throw error;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const processedData = await getData();
        setData(processedData);
      } catch (error) {
        // Xử lý lỗi ở đây nếu cần
        console.error('Đã xảy ra lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchData();
  }, []);
  
      
  const handleClose = () =>{
    setShowUpdatePrice(false);
    setShowAdmin(false);
  }
  const handleOK = () =>{
    axios.post(`http://localhost:3005/store/update/${selectedRowId}`,formData)
      .then(function(response){
          
      })
    const fetchData = async () => {
      try {
        const processedData = await getData();
        setData(processedData);
      } catch (error) {
        // Xử lý lỗi ở đây nếu cần
        console.error('Đã xảy ra lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchData();
    setShowUpdatePrice(false);
  }
  const handleUpdate = (id) =>{
    if(user.type==='2'){
      setShowAdmin(true);
    }
    else{
      setShowUpdatePrice(true);
      setSelectedRowId(id);
    }
    
  }
  //search
  useEffect(() => {
    // Lọc dữ liệu dựa trên từ khóa tìm kiếm
    const filtered = data.filter(
      (item) =>
        item.tenSP.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
    }, [searchQuery, data]);

  //sort
  useEffect(() => {
    let sortedData = [...filteredData];

    if (sortOrder === 'ascending') {
      sortedData.sort((a, b) => a.giaBan - b.giaBan);
    } else if (sortOrder === 'descending') {
      sortedData.sort((a, b) => b.giaBan - a.giaBan);
    }

    setSortedData(sortedData);
  }, [filteredData, sortOrder]);

  return (
    <>  
        <Notify show={showAdmin} massage='Bạn phải đăng nhập với tư cách admin' color='red' handleClose={handleClose} />
        <UpdatePrice show={showUpdatePrice} formData={formData} setFormData={setFormData} handleClose={handleClose} save={handleOK}/>
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
                                        fontSize: '1.6rem',
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
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
                                            (<Button 
                                                onClick={() => handleUpdate(row['_id'])}
                                                style={{fontSize:'12px'}}
                                                variant='success' >
                                                Chỉnh sửa giá
                                            </Button>)
                                        } else {
                                          value = row[column.id];
                                        }
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ fontSize: '1.36rem', color:(column.id ==='state')?'red':'black' }}
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
        </>
  );
}

export default StoreTable;