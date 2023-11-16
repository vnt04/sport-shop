import axios from 'axios';
import {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import SuccessModal from './SuccessModal';
import routes from '~/config/routes';

function Receipt() {
  const [showNotify, setNotify] = useState(false); 
  

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    try {
      const response = await axios.post('http://localhost:3005/supplier/add', formObject);
      console.log('Response from server:', response.data); 
      setNotify(true);    
      

    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  const handleCloseNotify = () => {
    setNotify(false);
    window.location.href = routes.suppliers;
  };
    
  return (
    
    <Form  onSubmit={handleSubmit}>
     <Row style={{ margin: '30px' }} >
      <Form.Group as={Col} md="6" controlId="tenNcc">
          <Form.Label  className='h2'>Tên nhà cung cấp</Form.Label>
          <Form.Control
            name="tenNcc"
            required
            type="text"
            placeholder="Tên nhà cung cấp"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="manager">
          <Form.Label  className='h2'>Người liên hệ</Form.Label>
          <Form.Control
            name="manager"
            required
            type="text"
            placeholder="Tên người liên hệ"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>
      </Row>

      <Row style={{ margin: '30px' }} >
      <Form.Group as={Col} md="6" controlId="sdt">
          <Form.Label  className='h2'>Số điện thoại</Form.Label>
          <Form.Control
            name="sdt"
            required
            type="text"
            placeholder="Số điện thoại người liên hệ"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="mail">
          <Form.Label className='h2'>Email</Form.Label>
          <Form.Control
            name="mail"
            required
            type="text"
            placeholder="Email người liên hệ"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>
      </Row>


     <Row style={{ margin: '30px' }} >
      <Form.Group as={Col} md="3" controlId="maThue">
          <Form.Label className='h2'>Mã số thuế</Form.Label>
          <Form.Control
            required
            name = "maThue"
            type="text"
            placeholder="Mã số thuế"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="9" controlId="address">
          <Form.Label  className='h2'>Địa chỉ</Form.Label>
          <Form.Control
            required
            name = "address"
            type="text"
            placeholder="Địa chỉ nhà cung cấp"
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