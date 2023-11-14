import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Receipt() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    };
  return (
    <Form  noValidate validated={validated} onSubmit={handleSubmit}>
     <Row style={{ margin: '30px' }} >
      <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label className='h2'>Tên nhà cung cấp</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Tên nhà cung cấp"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label className='h2'>Người liên hệ</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Tên người liên hệ"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>
      </Row>

      <Row style={{ margin: '30px' }} >
      <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label className='h2'>Số điện thoại</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Số điện thoại người liên hệ"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label className='h2'>Email</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Email người liên hệ"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>
      </Row>


     <Row style={{ margin: '30px' }} >
      <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label className='h2'>Mã số thuế</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Mã số thuế nhà cung cấp"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom01">
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

      <Row>
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