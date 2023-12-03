import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Notify({ color, massage, show, type, handleOK, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton style={{ backgroundColor: color }}>
        <Modal.Title>Thông báo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {massage}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} size="lg">
          Đóng
        </Button>
        {type === '2' && (
          <Button variant="secondary" onClick={handleOK} size="lg">
            Đồng ý
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default Notify;
