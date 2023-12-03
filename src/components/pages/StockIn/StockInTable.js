import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaRegWindowClose } from 'react-icons/fa';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Dropdown from 'react-bootstrap/Dropdown';
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
    label: 'Duyệt',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
];
  const getStatusColor = (status) => {
  switch (status) {
    case 'Chờ duyệt':
      return 'orange'; 
    case 'Đã duyệt':
      return 'green'; 
    case 'Không được duyệt':
      return 'red'; 
    default:
      return 'black'; 
  }
  };

 function StockInTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [showAccept,setShowAccept] = useState(false);
  const [showNoAccept,setShowNoAccept] = useState(false);
  const [selectedRowId,  setSelectedRowId] = useState(null);


  //gọi api hiển thị ra bảng
  useEffect(() => {
    axios.get('http://localhost:3005/stockIn/read')
      .then(function (response) {
        setData(response.data.reverse());
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
  const handleAccept = (id)=>{
    setShowAccept(true);
    setSelectedRowId(id);
  }
  const handleClose = () =>{
    setShowAccept(false);
    setShowNoAccept(false);
  }
  const handleOKAC = () => {
  axios
    .put(`http://localhost:3005/stockIn/update/${selectedRowId}`, { note: 'accept' })
    .then(function (response) {
      axios.get('http://localhost:3005/stockIn/read').then(function (response) {
        setData(response.data.reverse());
      });
      setShowAccept(false);

      const Accepted = data.find((product) => product._id === selectedRowId);
      Promise.all([
        axios.get('http://localhost:3005/product/read'),
        axios.get('http://localhost:3005/category/read'),
        axios.get('http://localhost:3005/unit/read'),
      ])
        .then(function (responses) {
          const [products, categories, units] = responses;

          const maSP = products.data.find((product) => product.tenSP === Accepted.tenSP)?.maSP;
          const maLoai = categories.data.find((loai) => loai.tenLoai === Accepted.loaiSP)?.maLoai;
          const maDVT = units.data.find((dvt) => dvt.tenDVT === Accepted.dvt)?.maDVT;

          const AcceptedProduct = {
            tenSP: Accepted.tenSP,
            gia: Accepted.giaNhap,
            state: 'Tồn kho',
            slKho: Accepted.soLuong,
            maLoai,
            maDVT,
            maSP,
          };

          axios.post('http://localhost:3005/product/add', AcceptedProduct).then(function (response) {});
        })
        .catch(function (error) {
          console.log('Lỗi khi lấy dữ liệu', error);
        });
    })
    .catch(function (error) {
      console.log('Lỗi khi cập nhật dữ liệu', error);
    });
};


  // Không duyệt
  const handleNoAccept = (id) =>{
    setShowNoAccept(true);
    setSelectedRowId(id);
  }
  const handleOKNoAC = () => {
    axios.put(`http://localhost:3005/stockIn/update/${selectedRowId}`,{note:'NoAccept'})
      .then(function(response){
        axios.get('http://localhost:3005/stockIn/read')
          .then(function(response){
            setData(response.data.reverse());
          })
        setShowNoAccept(false);
      })
      .catch(function(error){
        console.log('Lỗi khi cập nhật dữ liệu', error);
      }) 
  }

  return (
    <>

      <Notify color='red' show={showNoAccept} massage="Bạn sẽ không duyệt phiếu nhập kho này?" type='2' handleClose={handleClose} handleOK={handleOKNoAC}/>
      <Notify color='green' show={showAccept} massage="Bạn muốn duyệt phiếu nhập kho này?" type='2' handleClose={handleClose} handleOK={handleOKAC}/>
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
                                                  <Dropdown.Item onClick={() => handleAccept(row['_id']) } style={{ fontSize: '1.2rem', color: 'green' }}>
                                                    <FaCheck style={{fontSize:'1.2rem', marginRight: '5px' }} /> Duyệt
                                                  </Dropdown.Item>
                                                  <Dropdown.Item onClick={()=>handleNoAccept(row['_id'])} style={{ fontSize: '1.2rem', color: 'red' }}>
                                                    <FaRegWindowClose style={{fontSize:'1.2rem', marginRight: '5px' }} /> Không duyệt
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
                                                  fontSize: '1.28rem', 
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
        </>
  );
}

export default StockInTable;