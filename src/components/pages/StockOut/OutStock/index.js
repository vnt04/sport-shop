import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './OutStock.module.scss';
import { BackIcon } from '~/assets/Icons';
import Receipt from './Receipt';

const cx = classNames.bind(styles);

function AddStock() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className={cx('phieu-xuat')}>
            <div className={cx('dieu-huong-phieu-xuat')}>
                <button className={cx('backButton')} onClick={handleGoBack}>
                    <BackIcon />
                </button>
                <div className={cx('ten-phieu-xuat')}>Tạo phiếu xuất kho</div>
            </div>

            {/* Nhap chi tiet phieu nhap kho */}
            <div className={cx('chi-tiet-phieu-xuat')}>
                <Receipt />
            </div>
        </div>
    );
}

export default AddStock;
