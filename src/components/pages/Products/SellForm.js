
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function SellForm({show ,handleClose,save,setFormData  }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(save) {
      setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton style={{ backgroundColor: 'green' }}>
          <Modal.Title>Cho phép sản phẩm được bán trên cửa hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row style={{ margin: '30px' }} >
                <Form.Group as={Col} md="9" controlId="tenNcc">
                    <Form.Label  className='h2'>Số lượng</Form.Label>
                    <Form.Control
                        name="soLuong"
                        required
                        type="number"
                        className="form-control-lg"
                        onChange={handleInputChange}
                        style={{fontSize:'18px',marginTop: '5px'}}
                    />
                </Form.Group>
            </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} size="lg">
            Đóng
          </Button>
          <Button variant="success"  onClick={save} size="lg">
            Đồng ý bán
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SellForm;