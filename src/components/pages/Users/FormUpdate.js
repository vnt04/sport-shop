import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function FormUpdate({ show, handleClose, formData, save, setFormData }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCV, setSelectedCV] = useState(null);
  const [selectedSex, setSelectedSex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (save) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCVChange = (selectedOption) => {
    setSelectedCV(selectedOption);
  };

  const handleSexChange = (selectedOption) => {
    setSelectedSex(selectedOption);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const CV = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Nhân viên kho', value: 'Nhân viên kho' },
    { label: 'Nhân viên bán hàng', value: 'Nhân viên bán hàng' },
  ];

  const sex = [
    { label: 'Nam', value: 'Nam' },
    { label: 'Nữ', value: 'Nữ' },
  ];
  return (
    <>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton style={{ backgroundColor: 'orange' }}>
          <Modal.Title>Chỉnh sửa thông tin nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row style={{ margin: '30px' }} >
      <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label className='h2'>Tên nhân viên</Form.Label>
          <Form.Control
            required
            name="tenNv"
            type="text"
            value={formData.tenNv}
            onChange={handleInputChange}
            placeholder="Tên nhân viên"
            className="form-control-lg"
            style={{fontSize:'18px',marginTop: '5px'}}
          />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label className='h2'>Chức vụ</Form.Label>
          <Select
            name = "chucVu"
            onChange={handleCVChange}
            options={CV}
            value={selectedCV}
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
          <Form.Label className='h2' style={{marginLeft: '10px', marginBottom:'14px'}}>Ngày sinh</Form.Label>
          <DatePicker
            selected={selectedDate}
            value={formData.day}
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
            value={formData.sdt}
            type="text"
            onChange={handleInputChange}
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
            value={formData.mail}
            type="text"
            onChange={handleInputChange}
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
            value={formData.address}
            type="text"
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            value={formData.maThue}
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
            onChange={handleInputChange}
            value={formData.luongCoBan}
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
            onChange={handleInputChange}
            value={formData.hsLuong}
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
            value={formData.phuCap}
            onChange={handleInputChange}
            placeholder="Tiền phụ cấp"
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