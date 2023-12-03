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
import Notify from '~/components/Notify';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import FormUpdate from './FormUpdate';


const columns = [
  {
    id: 'stt',
    label: 'STT',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'tenNv',
    label: 'Tên nhân viên',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'chucVu',
    label: 'Chức vụ',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'day',
    label: 'Ngày sinh',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'sex',
    label: 'Giới tính',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'luongThang',
    label: 'Lương',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'maThue',
    label: 'Mã số thuế',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'sdt',
    label: 'Số điện thoại',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'mail',
    label: 'Email',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'address',
    label: 'Địa chỉ',
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

 function UsersTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [deletedUserId, setDeletedUserId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showFormUpdate, setShowFormUpdate]  = useState(false);
  const [updatedUserId, setUpdatedUserId] = useState(null);
  const [formData, setFormData] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3005/user/read')
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
    const handleCloseNotify = () =>{
      setDeleteConfirm(false);
      setShowDeleteWarning(false);
      setDeletedUserId(null);
    }
  //Delete
  const handleOK = () =>{
    const id = deletedUserId;
    if(deleteConfirm && id)  {
      axios.delete(`http://localhost:3005/user/delete/${id}`)
      .then(function (response) {
        setData(data.filter(item => item._id !== id));
      })
      .catch(function (error) {
        console.log(error);
      });
           
    }
    setDeleteConfirm(false);
    setShowDeleteWarning(false);
    setDeletedUserId(null);
  }
  const handleDelete = (id) => {
    setShowDeleteWarning(true); 
    setDeleteConfirm(true);
    setDeletedUserId(id);  
  }

  //Update
  const handleUpdate = (id) => {
    setShowFormUpdate(true);
    axios.get('http://localhost:3005/user/read')
      .then(function (response) {
        response.data.forEach(element => {
          if(element._id === id){
              const newData = {
              chucVu: element.chucVu,
              tenNv: element.tenNv,
              sex: element.sex,
              sdt: element.sdt,
              mail: element.mail,
              address: element.address,
              day: element.day,
              maThue: element.maThue,
              luongCoBan: element.luongCoBan,
              hsLuong: element.hsLuong,
              phuCap: element.phuCap,
          };
          setFormData(newData);
          setUpdatedUserId(id);
        }   
        });
      })
      
    }
  const handleCloseFormUpdate = () =>{
    setShowFormUpdate(false);
  }
  const saveChange = () =>{
    const id = updatedUserId;
    const luongCoBan = parseFloat(formData['luongCoBan']);
        const hsLuong = parseFloat(formData['hsLuong']);
        const phuCap = parseFloat(formData['phuCap']);

        if (!isNaN(luongCoBan) && !isNaN(hsLuong) && !isNaN(phuCap)) {
          formData['luongThang'] = luongCoBan * hsLuong + phuCap;
        } else {
          console.log('Có lỗi xảy ra trong việc đọc dữ liệu từ form.');
        }
    axios.put(`http://localhost:3005/user/update/${id}`, formData)
      .then(function(response){
        axios.get('http://localhost:3005/user/read')
          .then(function(response){
            setData(response.data);
          })
        setShowFormUpdate(false);
      })
      .catch(function(error){
        console.log('Lỗi khi cập nhật dữ liệu', error);
      })
  }
  return (
    <>
      <FormUpdate show={showFormUpdate} handleClose={handleCloseFormUpdate} formData={formData} setFormData={setFormData} save={saveChange}/>
      <Notify massage="Bạn muốn xóa nhân viên này! " color='#f44336' show={showDeleteWarning} handleClose={handleCloseNotify} handleOK={handleOK} type='2'/>
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
                                        fontSize: '1.3rem',
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
                                          value = (<Dropdown>
                                                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                          ...           
                                                        </Dropdown.Toggle>                         

                                                        <Dropdown.Menu>
                                                          <Dropdown.Item onClick={() => handleDelete(row['_id']) } style={{ fontSize: '1.2rem', color: 'red' }}>
                                                            <AiOutlineDelete style={{ marginRight: '5px' }} /> Xóa
                                                          </Dropdown.Item>
                                                          <Dropdown.Item onClick={()=>handleUpdate(row['_id'])} style={{ fontSize: '1.2rem', color: 'orange' }}>
                                                            <AiOutlineEdit style={{ marginRight: '5px' }} /> Chỉnh Sửa
                                                          </Dropdown.Item>
                                                        </Dropdown.Menu>        
                                                    </Dropdown>)
                                        }
                                         else {
                                          value = row[column.id];
                                        }
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ fontSize: '1.28rem' }}
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

export default UsersTable;