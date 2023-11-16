import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import Row from 'react-bootstrap/Row';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import routes from '~/config/routes';
import SuccessModal from '../../Suppliers/AddSupplier/SuccessModal';

function Receipt() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showNotify, setNotify] = useState(false); 
    const [selectedCV, setSelectedCV] = useState(false); 
    const [selectedSex, setSelectedSex] = useState(false); 
  

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        const formData = new FormData(event.target);
        const formObject = {};
        formData.forEach((value, key) => {
          formObject[key] = value;
        });
        const luongCoBan = parseFloat(formObject['luongCoBan']);
const hsLuong = parseFloat(formObject['hsLuong']);
const phuCap = parseFloat(formObject['phuCap']);

// Kiểm tra xem các biến đã được chuyển đổi thành số chưa
if (!isNaN(luongCoBan) && !isNaN(hsLuong) && !isNaN(phuCap)) {
  // Tính toán giá trị luongThang và gán vào formObject
  formObject['luongThang'] = luongCoBan * hsLuong + phuCap;
} else {
  // Xử lý khi có lỗi xảy ra trong việc chuyển đổi từ chuỗi sang số
  console.log('Có lỗi xảy ra trong việc đọc dữ liệu từ form.');
}
        
        try {
          const response = await axios.post('http://localhost:3005/user/add', formObject);
          console.log('Response from server:', response.data); 
          setNotify(true);    
          

        } catch (error) {
          console.error('Error sending data:', error);
        }
    };

    const handleSexChange = (selectedOption) =>{
      setSelectedSex(selectedOption);
    }
    const handleCVChange = (selectedOption) =>{
      setSelectedCV(selectedOption);
    }
    const CV = [
      {label: 'Admin', value:'Admin'},
      {label: 'Nhân viên kho', value:'Nhân viên kho'},
      {label: 'Nhân viên bán hàng', value:'Nhân viên bán hàng'},
    ]
    const sex = [
      {label:'Nam',value:'Nam'},
      {label:'Nữ',value:'Nữ'},
    ]
    const handleCloseNotify = () => {
      setNotify(false);
      window.location.href = routes.users;
    };
    const handleDateChange = date => {
      setSelectedDate(date); 
    };
  return (
    <Form  onSubmit={handleSubmit}>
     <Row style={{ margin: '30px' }} >
      <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label className='h2'>Tên nhân viên</Form.Label>
          <Form.Control
            required
            name="tenNv"
            type="text"
            placeholder="Tên nhân viên"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label className='h2'>Chức vụ</Form.Label>
          <Select
            name = "chucVu"
            value={selectedCV}
            onChange={handleCVChange}
            options={CV}
            isSearchable
            placeholder="Chọn chức vụ"
            className="form-control-lg"
          />
        </Form.Group>

        <Form.Group as={Col} md="2" controlId="validationCustom01">
          <Form.Label className='h2'>Giới tính</Form.Label>
          <Select
            value={selectedSex}
            name = "sex"
            onChange={handleSexChange}
            options={sex}
            isSearchable
            placeholder="Giới tính"
            className="form-control-lg"
          />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label className='h2' style={{marginBottom:'14px'}}>Ngày sinh</Form.Label>
          <DatePicker
            selected={selectedDate}
            name = "day"
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy" // Định dạng ngày tháng
            className="form-control-lg"
            placeholderText="Chọn ngày sinh"
            
          />
        </Form.Group>
      </Row>

      <Row style={{ margin: '30px' }} >
      <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label className='h2'>Số điện thoại</Form.Label>
          <Form.Control
            required
            name = "sdt"
            type="text"
            placeholder="Số điện thoại nhân viên"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label className='h2'>Email</Form.Label>
          <Form.Control
            required
            name = "mail"
            type="text"
            placeholder="Email nhân viên"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label className='h2'>Địa chỉ</Form.Label>
          <Form.Control
            required
            name = "address"
            type="text"
            placeholder="Địa chỉ nhân viên"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>
      </Row>


     <Row style={{ margin: '30px' }} >
      <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label className='h2'>Mã số thuế</Form.Label>
          <Form.Control
            type="text"
            name = "maThue"
            placeholder="Mã số thuế"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label className='h2'>Lương cơ bản</Form.Label>
          <Form.Control
            required
            name = "luongCoBan"
            type="number"
            placeholder="Lương cơ bản"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label className='h2'>Hệ số lương</Form.Label>
          <Form.Control
            required
            name = "hsLuong"
            type="number"
            step = "0.1"
            placeholder="Hệ số lương"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label className='h2'>Phụ cấp(nếu có)</Form.Label>
          <Form.Control
            type="number"
            name = "phuCap"
            placeholder="Tiền phụ cấp"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>
      </Row>

      <Row>
          <Button 
              style={
                    {
                        height: '50px',
                        width:'100px', 
                        fontSize: '1.5rem', 
                        backgroundColor: 'green',
                        margin: '30px 50px'
                    }
                }
              type="submit">Thêm mới</Button>
      </Row>
      <SuccessModal show={showNotify} handleClose={handleCloseNotify}/>
    </Form>
  );
}



export default Receipt;