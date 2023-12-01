
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function FormUpdate({show ,handleClose,formData,save }) {
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton style={{ backgroundColor: 'orange' }}>
          <Modal.Title>Chỉnh sửa thông tin nhà cung cấp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row style={{ margin: '30px' }} >
                <Form.Group as={Col} md="6" controlId="tenNcc">
                    <Form.Label  className='h2'>Tên nhà cung cấp</Form.Label>
                    <Form.Control
                        name="tenNcc"
                        required
                        type="text"
                        value={formData.tenNcc}
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
                    value={formData.manager}
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
                    value={formData.sdt}
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
                    value={formData.mail}
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
                    value={formData.maThue}
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
                  value={formData.address}
                  className="form-control-lg"
                  style={{fontSize:'18px',marginTop: '5px'}}
                />
              </Form.Group>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} size="lg">
            Đóng
          </Button>
          <Button variant="warning"  onClick={save} size="lg">
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormUpdate;