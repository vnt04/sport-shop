import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import Row from 'react-bootstrap/Row';
import DatePicker from 'react-datepicker'; // Import DatePicker component
import 'react-datepicker/dist/react-datepicker.css';

function Receipt() {
    const [validated, setValidated] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    };
    const handleUserChange = (selectedOption) => {
    setSelectedUser(selectedOption);
  };
    const users = [
    { value: 'user1', label: 'User 1' },
    { value: 'user2', label: 'User 2' },
    { value: 'user3', label: 'User 3' },
    { value: 'user4', label: 'User 4' },
    
  ];

  const handleDateChange = date => {
    setSelectedDate(date); // Cập nhật state khi người dùng chọn ngày
  };
  return (
    <Form  noValidate validated={validated} onSubmit={handleSubmit}>
     <Row style={{ margin: '30px' }} >
      <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label className='h2'>Tên nhân viên</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Tên nhân viên"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label className='h2'>Chức vụ</Form.Label>
          <Select
            value={selectedUser}
            onChange={handleUserChange}
            options={users}
            isSearchable
            placeholder="Chọn chức vụ"
            className="form-control-lg"
          />
        </Form.Group>

        <Form.Group as={Col} md="2" controlId="validationCustom01">
          <Form.Label className='h2'>Giới tính</Form.Label>
          <Select
            value={selectedUser}
            onChange={handleUserChange}
            options={users}
            isSearchable
            placeholder="Giới tính"
            className="form-control-lg"
          />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label className='h2' style={{marginBottom:'14px'}}>Ngày sinh</Form.Label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy" // Định dạng ngày tháng
            className="form-control-lg"
            placeholderText="Chọn ngày sinh"
            
          />
        </Form.Group>
      </Row>

      <Row style={{ margin: '30px' }} >
      <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label className='h2'>Số điện thoại</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Số điện thoại nhân viên"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label className='h2'>Email</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Email nhân viên"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label className='h2'>Địa chỉ</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Địa chỉ nhà cung cấp"
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
            placeholder="Mã số thuế"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label className='h2'>Lương cơ bản</Form.Label>
          <Form.Control
            required
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
            type="number"
            placeholder="Hệ số lương"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label className='h2'>Phụ cấp(nếu có)</Form.Label>
          <Form.Control
            type="number"
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
      
    </Form>
  );
}



export default Receipt;