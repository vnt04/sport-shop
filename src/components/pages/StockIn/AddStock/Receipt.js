import { useState,useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import Row from 'react-bootstrap/Row';
import Notify from '~/components/Notify';
import routes from '~/config/routes'

function Receipt() {    
    const [showNotify, setNotify] = useState(false); 

    const handleSubmit = async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const formObject = {};
      formData.forEach((value,key) => {
        formObject[key] = value;
      });
      formObject['ngayNhap'] = currentDate;
      formObject['state'] = 'Chờ duyệt';
      
      try {
        const response = await axios.post('http://localhost:3005/stockIn/add', formObject);
        console.log('Response from server:', response.data); 
        setNotify(true);    
      } catch (error) {
      console.error('Error sending data:', error);
    }
    };
    const handleCloseNotify = () => {
      setNotify(false);
      window.location.href = routes.stockIn;
    };
    // Lấy và hiển thị ngày hiện tại
    const [currentDate, setCurrentDate] = useState('');
    useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${day}-${month}-${year}`;
    setCurrentDate(formattedDate);
  }, []);


    // Gọi api & database
    //users
    const [dataUsers, setDataUsers] = useState([]);
    useEffect(() => {
    axios.get('http://localhost:3005/user/read')
      .then(function (response) {
         const filteredUsers = response.data.filter(user =>( user.chucVu === 'Nhân viên kho' || user.chucVu === 'Admin'));
         const names = filteredUsers.map(user => ({
          label: user.tenNv,
          value: user.tenNv
        }));
        setDataUsers(names);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);
    const [selectedUser, setSelectedUser] = useState(null);
    const handleUserChange = (selectedOption) => {
    setSelectedUser(selectedOption);
    };

    //Nhà cung cấp
    const [dataNcc, setDataNcc] = useState([]);
    useEffect(() => {
    axios.get('http://localhost:3005/supplier/read')
      .then(function (response) {
         const names = response.data.map(ncc => ({
          label: ncc.tenNcc,
          value: ncc.tenNcc
        }));
        setDataNcc(names);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);

  const [selectedNcc, setSelectedNcc] = useState(null);
  const handleNccChange = (selectedOption) => {
    setSelectedNcc(selectedOption);
  };
  

  //Loại sản phẩm
  const [dataLoaiSP, setDataLoaiSP] = useState([]);
  const [dataTenSP, setDataTenSP] = useState([]);
    useEffect(() => {
    axios.get('http://localhost:3005/category/read')
      .then(function (response) {
         const names = response.data.map(cate => ({
          label: cate.tenLoai,
          value: cate.tenLoai
        }));
        setDataLoaiSP(names);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);  

  const [selectedLoaiSP, setSelectedLoaiSP] = useState(null);
  const handleLoaiSPChange = (selectedOption) => {
    setSelectedLoaiSP(selectedOption);
  };

  //Tên sản phẩm
useEffect(() => {
  if (selectedLoaiSP) {
    axios.get('http://localhost:3005/category/read')
      .then(function (response) {
        const foundCategory = response.data.find(category => category.tenLoai === selectedLoaiSP.value);
        if (foundCategory) {
          const maLoai = foundCategory.maLoai;

          axios.get('http://localhost:3005/product/read')
            .then(function (response) {
              const filterProduct = response.data.filter(prod => prod.maLoai === maLoai);
              const names = filterProduct.map(product => ({
                label: product.tenSP,
                value: product.tenSP
              }));
              setDataTenSP(names);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}, [selectedLoaiSP]);

  const [selectedTenSP, setSelectedTenSP] = useState(null);
  const handleTenSPChange = (selectedOption) => {
    setSelectedTenSP(selectedOption);
  };

  // Đơn vị tính
  const [dataDVT, setDataDVT] = useState([]);
    useEffect(() => {
    axios.get('http://localhost:3005/unit/read')
      .then(function (response) {
         const names = response.data.map(cate => ({
          label: cate.tenDVT,
          value: cate.tenDVT
        }));
        setDataDVT(names);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);

  const [selectedDVT, setSelectedDVT] = useState(null);
  const handleDVTChange = (selectedOption) => {
    setSelectedDVT(selectedOption);
  };
  return (
    <Form  onSubmit={handleSubmit}>
     <Row style={{ marginLeft: '20px', marginRight: '20px',marginTop: '20px' }} >
      <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label className='h2'>Người nhập</Form.Label>
          <Select
            name = "user"
            value={selectedUser}
            onChange={handleUserChange}
            options={dataUsers}
            isSearchable
            placeholder="Chọn người nhập"
            className="form-control-lg"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label className='h2'>Ngày nhập </Form.Label>
          <Form.Control
            required
            name = "ngayNhap"
            type="text"
            className="form-control-lg"
            value={currentDate}
            disabled
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>
      </Row>


     <Row style={{ marginLeft: '20px', marginRight: '20px',marginTop: '45px' }} >
        
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label className='h2'>Nhà cung cấp</Form.Label>
          <Select
            required
            name = "tenNcc"
            value={selectedNcc}
            onChange={handleNccChange}
            options={dataNcc}
            isSearchable
            placeholder="Chọn nhà cung cấp"
            className="form-control-lg"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label className='h2'>Loại sản phẩm</Form.Label>
          <Select
            required
            name = "loaiSP"
            value={selectedLoaiSP}
            onChange={handleLoaiSPChange}
            options={dataLoaiSP}
            isSearchable
            placeholder="Chọn loại sản phẩm"
            className="form-control-lg"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label className='h2'>Tên sản phẩm</Form.Label>
          <Select
            required
            name = "tenSP"
            value={selectedTenSP}
            onChange={handleTenSPChange}
            options={dataTenSP}
            isSearchable
            placeholder="Chọn tên sản phẩm"
            className="form-control-lg"
          />
        </Form.Group>

    <Row style={{ marginLeft: '20px', marginRight: '20px',marginTop: '45px' }} >
        <Form.Group as={Col} md="3" controlId="gia">
          <Form.Label className='h2'>Giá tiền(VNĐ) </Form.Label>
          <Form.Control
            required
            name = "giaNhap"
            type="number"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustomUsername">
          <Form.Label className='h2'>Số lượng </Form.Label>
          <Form.Control
            required
            name = "soLuong"
            type="number"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustomUsername">
          <Form.Label className='h2'>Đơn vị tính</Form.Label>
          <Select
            required
            name = "dvt"
            value={selectedDVT}
            onChange={handleDVTChange}
            options={dataDVT}
            isSearchable
            placeholder="Chọn đơn vị tính"
            className="form-control-lg"
          />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustomUsername">
          <Form.Label className='h2'>Chiết khấu(%) </Form.Label>
          <Form.Control
            required
            type="number"
            name = "chietKhau"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

    </Row>

      <Button 
      style={
            {
                height: '50px',
                width:'100px', 
                fontSize: '1.5rem', 
                backgroundColor: 'green',
                margin: '30px 30px'
            }
        }
       type="submit">Thêm mới</Button>
      </Row>
      <Notify color="green" massage = "Nhập kho thành công!" show={showNotify} handleClose={handleCloseNotify}/>
    </Form>
  );
}


export default Receipt;