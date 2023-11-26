
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Notify({ massage,show, handleClose }) {
  return (
    <Modal massage show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thông báo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {massage}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Notify;
