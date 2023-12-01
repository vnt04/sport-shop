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
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import Dropdown from 'react-bootstrap/Dropdown';
import Notify from '~/components/Notify';
import FormUpdate from '~/components/pages/Suppliers/FormUpdate';

const columns = [
  {
    id: 'stt',
    label: 'STT',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'tenNcc',
    label: 'Tên nhà cung cấp',
    minWidth: 0,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'manager',
    label: 'Người liên hệ',
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
    value:'...',
    format: (value) => `<span style="font-weight: bold; font-size: 16px;">${value}</span>`, 
 },
];

function SuppliersTable() {
  //State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deletedSupplierId, setDeletedSupplierId] = useState(null);
  const [showFormUpdate, setShowFormUpdate]  = useState(false);
  const [formData, setFormData] = useState(false);
  useEffect(() => {
    axios.get('http://localhost:3005/supplier/read')
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
    setDeletedSupplierId(null);
  }
  //Delete
  const handleOK = () =>{
    const id = deletedSupplierId;
    if(deleteConfirm && id)  {
      axios.delete(`http://localhost:3005/supplier/delete/${id}`)
      .then(function (response) {
        setData(data.filter(item => item._id !== id));
      })
      .catch(function (error) {
        console.log(error);
      });
           
    }
    setDeleteConfirm(false);
    setShowDeleteWarning(false);
    setDeletedSupplierId(null);
  }
  const handleDelete = (id) => {
    setShowDeleteWarning(true); 
    setDeleteConfirm(true);
    setDeletedSupplierId(id);  
  }
  //Update

  const handleUpdate = (id) => {
    setShowFormUpdate(true);
    axios.get('http://localhost:3005/supplier/read')
      .then(function (response) {
        response.data.forEach(element => {
          if(element._id === id){
              const newData = {
              tenNcc: element.tenNcc,
              manager: element.manager,
              maThue: element.maThue,
              sdt: element.sdt,
              mail: element.mail,
              address: element.address
          };
          setFormData(newData);
        }   
        });
      })
    }
  const handleCloseFormUpdate = () =>{
    setShowFormUpdate(false);
  }
  const saveChange = () =>{
    
  }
  return (
    <>
    <FormUpdate show={showFormUpdate} handleClose={handleCloseFormUpdate} formData={formData} save={saveChange}/>
    <Notify massage="Bạn muốn xóa nhà cung cấp! " color='#f44336' show={showDeleteWarning} handleClose={handleCloseNotify} handleOK={handleOK} type='2'/>
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
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
                    } else {
                      value = row[column.id];
                    }
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ fontSize: '1.26rem' }}
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

export default SuppliersTable;
