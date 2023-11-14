import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import Row from 'react-bootstrap/Row';

function Receipt() {
    const [validated, setValidated] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    };
    // Lấy và hiển thị ngày hiện tại
    useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${day}-${month}-${year}`;
    setCurrentDate(formattedDate);
  }, []);
    // Phần cần sử dụng database
    const users = [
    { value: 'user1', label: 'User 1' },
    { value: 'user2', label: 'User 2' },
    { value: 'user3', label: 'User 3' },
    { value: 'user4', label: 'User 4' },
    
  ]; 
  const handleUserChange = (selectedOption) => {
    setSelectedUser(selectedOption);
  };
  return (
    <Form  noValidate validated={validated} onSubmit={handleSubmit}>
     <Row style={{ marginLeft: '20px', marginRight: '20px',marginTop: '20px' }} >
      <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label className='h2'>Người nhập</Form.Label>
          <Select
            value={selectedUser}
            onChange={handleUserChange}
            options={users}
            isSearchable
            placeholder="Chọn người nhập"
            className="form-control-lg"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label className='h2'>Mã phiếu nhập</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Mã phiếu nhập"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label className='h2'>Ngày nhập </Form.Label>
          <Form.Control
            required
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
            value={selectedUser}
            onChange={handleUserChange}
            options={users}
            isSearchable
            placeholder="Chọn nhà cung cấp"
            className="form-control-lg"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label className='h2'>Loại sản phẩm</Form.Label>
          <Select
            required
            value={selectedUser}
            onChange={handleUserChange}
            options={users}
            isSearchable
            placeholder="Chọn loại sản phẩm"
            className="form-control-lg"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label className='h2'>Tên sản phẩm</Form.Label>
          <Select
            required
            value={selectedUser}
            onChange={handleUserChange}
            options={users}
            isSearchable
            placeholder="Chọn tên sản phẩm"
            className="form-control-lg"
          />
        </Form.Group>

    <Row style={{ marginLeft: '20px', marginRight: '20px',marginTop: '45px' }} >
        <Form.Group as={Col} md="3" controlId="validationCustomUsername">
          <Form.Label className='h2'>Giá tiền(VNĐ) </Form.Label>
          <Form.Control
            required
            type="number"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustomUsername">
          <Form.Label className='h2'>Số lượng </Form.Label>
          <Form.Control
            required
            type="number"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustomUsername">
          <Form.Label className='h2'>Chiết khấu(%) </Form.Label>
          <Form.Control
            required
            type="number"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustomUsername">
          <Form.Label className='h2'>VAT(%) </Form.Label>
          <Form.Control
            required
            type="number"
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
    </Form>
  );
}


export default Receipt;