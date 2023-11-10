import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ImpWarehouse.module.scss';

const cx = classNames.bind(styles);

function Receipt() {
    const [Receipt, setReceipt] = useState({
        soPhieu: '',
        ngayNhap: new Date().toLocaleDateString(),
        nguoiNhap: '',
        loaiSP: '',
        tenSP: '',
        nhaCungCap: '',
        gia: '',
        soLuong: '',
        vat: '',
        chietKhau: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setReceipt({
            ...Receipt,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Xử lý dữ liệu sau khi nhấn nút Thêm sản phẩm
        alert('Thêm thành công');
    };

    // Lấy ngày hiện tại
    const currentDate = new Date();

    // Chuyển định dạng ngày thành "dd/mm/yyyy"
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    //PayMent

    // return
    return (
        <form onClick={handleSubmit}>
            <div className={cx('block-1')}>
                <div>
                    <label className={cx('custom-label')}>
                        Số phiếu:
                        <input type="text" name="soPhieu" value={Receipt.soPhieu} onChange={handleInputChange} />
                    </label>
                </div>
                <div>
                    <label className={cx('custom-label')}>
                        Ngày nhập:
                        <input type="text" name="ngayNhap" value={formattedDate} disabled />
                    </label>
                </div>
                <div>
                    <label className={cx('custom-label')}>
                        Người nhập:
                        <input type="text" name="nguoiNhap" value={Receipt.nguoiNhap} onChange={handleInputChange} />
                    </label>
                </div>
            </div>
            <div className={cx('block-2')}>
                <div>
                    <label className={cx('custom-label')}>
                        Loại sản phẩm:
                        <select name="loaiSP" value={Receipt.loaiSP} onChange={handleInputChange}>
                            <option value="">Chọn loại sản phẩm</option>
                            <option value="option1">Đồ thể thao</option>
                            <option value="option2">Dụng cụ tập gym</option>
                            <option value="option3">Cúp thể thao</option>
                            <option value="option3">Huy chương thể thao</option>
                            {/* Thêm các tùy chọn khác tại đây */}
                        </select>
                    </label>
                </div>
                <div>
                    <label className={cx('custom-label')}>
                        Tên sản phẩm:
                        <input type="text" name="tenSP" value={Receipt.tenSP} onChange={handleInputChange} />
                    </label>
                </div>
                <div>
                    <label className={cx('custom-label')}>
                        Nhà cung cấp:
                        <input type="text" name="nhaCungCap" value={Receipt.nhaCungCap} onChange={handleInputChange} />
                    </label>
                </div>
            </div>
            <div className={cx('block-3')}>
                <div>
                    <label className={cx('custom-label')}>
                        Giá:
                        <input type="number" name="gia" step="100" value={Receipt.gia} onChange={handleInputChange} />
                    </label>
                </div>
                <div>
                    <label className={cx('custom-label')}>
                        Số lượng:
                        <input
                            type="number"
                            name="soLuong"
                            step="1"
                            value={Receipt.soLuong}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label className={cx('custom-label')}>
                        VAT(%):
                        <input type="number" name="vat" value={Receipt.vat} onChange={handleInputChange} />
                    </label>
                </div>
                <div>
                    <label className={cx('custom-label')}>
                        Chiết khấu(%):
                        <input type="number" name="chietKhau" value={Receipt.chietKhau} onChange={handleInputChange} />
                    </label>
                </div>
            </div>
            <button
                style={{
                    backgroundColor: 'green',
                    fontSize: '2rem',
                    height: '32px',
                    marginLeft: '20%',
                    marginTop: '30px',
                    color: 'white',
                    cursor: 'pointer',
                }}
                type="submit"
            >
                Thêm sản phẩm
            </button>
        </form>
    );
}
export default Receipt;
