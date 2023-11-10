import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './ImpWarehouse.module.scss';
import { BackIcon } from '~/components/Icons';
import Receipt from './Receipt';

const cx = classNames.bind(styles);

function AddWarehouse() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className={cx('phieu-nhap')}>
            <div className={cx('dieu-huong-phieu-nhap')}>
                <button className={cx('backButton')} onClick={handleGoBack}>
                    <BackIcon />
                </button>
                <div className={cx('ten-phieu-nhap')}>Tạo đơn nhập kho</div>
            </div>

            {/* Nhap chi tiet phieu nhap kho */}
            <div className={cx('chi-tiet-phieu-nhap')}>
                <Receipt />
            </div>
        </div>
    );
}

export default AddWarehouse;
