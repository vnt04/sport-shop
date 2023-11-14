import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './AddSupplier.module.scss';
import { BackIcon } from '~/assets/Icons';
import Receipt from './Receipt';

const cx = classNames.bind(styles);

function AddSupplier() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className={cx('phieu-nhap-ncc')}>
            <div className={cx('dieu-huong-phieu-nhap')}>
                <button className={cx('backButton')} onClick={handleGoBack}>
                    <BackIcon />
                </button>
                <div className={cx('ten-phieu-nhap')}>Thêm mới nhà cung cấp</div>
            </div>

            {/* Nhap chi tiet phieu nhap kho */}
            <div className={cx('chi-tiet-phieu-nhap')}>
                <Receipt />
            </div>
        </div>
    );
}

export default AddSupplier;
