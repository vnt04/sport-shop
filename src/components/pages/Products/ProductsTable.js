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
import Button from 'react-bootstrap/Button';
import SellForm from './SellForm';
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
  
  const getStatusColor = (status) => {
  switch (status) {
    case 'Tồn kho':
      return 'blue'; 
    case 'Đang bán':
      return 'red';  
    default:
      return 'black'; 
  }
  };
 function ProductsTable({ searchQuery }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [formData,setFormData] = useState(null);
  const [showSellForm,setShowSellForm] = useState(false);
  const [selectedRowId,setSelectedRowId] = useState(null);
  const [overed,setOvered] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  let unitData = {};
  let cateData = {};
  const getData = async () => {
    try {
      const unitResponse = await axios.get('http://localhost:3005/unit/read');
      const cateResponse = await axios.get('http://localhost:3005/category/read');
      const productResponse = await axios.get('http://localhost:3005/product/read');

      unitData = unitResponse.data.reduce((acc, unit) => {
        acc[unit.maDVT] = unit.tenDVT;
        return acc;
      }, {});

      cateData = cateResponse.data.reduce((acc, cate) => {
        acc[cate.maLoai] = cate.tenLoai;
        return acc;
      }, {});

      const processedProducts = productResponse.data.map(prod => ({
        ...prod,
        tenDVT: unitData[prod.maDVT] || prod.tenDVT,
        tenLoai: cateData[prod.maLoai] || prod.tenLoai,
      }));

      return processedProducts;
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


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClose = () =>{
    setShowSellForm(false);
    setOvered(false);
  }
  const handleSell = (id) =>{
    setShowSellForm(true);
    
    setSelectedRowId(id);
  }
  const handleOK = () => {
  axios.get('http://localhost:3005/product/read')
    .then(function (response) {
      let newStoreProduct;
      response.data.forEach(element => {
        if (element._id === selectedRowId) {
          newStoreProduct = {
            id : element._id,
            maSP: element.maSP,
            tenSP: element.tenSP,
            maDVT: element.maDVT,
            state: 'Đang bán',
            maLoai: element.maLoai,
            giaBan: element.gia,
            soLuong: formData.soLuong,
          };
          if(newStoreProduct.soLuong > element.slKho ) {
            setOvered(true);
          }
        }
      });
      
      if (newStoreProduct) {
        axios.post('http://localhost:3005/store/add', newStoreProduct)
          .then(function (response) {
            
          })
          .catch(function (error) {
            console.error('Lỗi khi gửi yêu cầu POST:', error);
          });
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
        } else {
          console.error('Không tìm thấy sản phẩm');
        }
      })
      .catch(function (error) {
        console.error('Lỗi khi gửi yêu cầu GET:', error);
      }); 
    setShowSellForm(false); 
    //window.location.reload();
};
  //search
  useEffect(() => {
    // Lọc dữ liệu dựa trên từ khóa tìm kiếm
    const filtered = data.filter(
      (item) =>
        item.tenSP.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
    }, [searchQuery, data]);

  return (
    <>
        <Notify show = {overed} color='red' massage="Số lượng sản phẩm trong kho không đủ" handleClose={handleClose}/>
        <SellForm show={showSellForm} formData={formData} setFormData={setFormData} handleClose={handleClose} save={handleOK} />
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
                        {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
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
                                            (<Button 
                                                onClick={() => handleSell(row['_id'])}
                                                style={{fontSize:'12px'}}
                                                variant='success' >
                                                Duyệt bán
                                            </Button>)
                                        }
                                        else {
                                          value = row[column.id];
                                        }
                                        return (
                                            <TableCell
                                                key={`${column.id}-${index}`}
                                                align={column.align}
                                                style={{ 
                                                  fontSize: '1.4rem',
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
                rowsPerPageOptions={[10, 50, 100]}
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

export default ProductsTable;