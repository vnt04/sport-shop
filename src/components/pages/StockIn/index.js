import { useNavigate } from 'react-router-dom';
import styles from './StockIn.module.scss';
import classNames from 'classnames/bind';
import { Button } from 'react-bootstrap';
import routes from '../../../config/routes';
import StockInTable from './StockInTable';
const cx = classNames.bind(styles);

function StockIn() {
    const navigate = useNavigate();

    const handleCreateNewClick = () => {
        navigate(routes.addStock);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-nhap-kho')}>
                <h1>Danh sách nhập kho</h1>
                <Button variant='success' onClick={handleCreateNewClick}>Tạo mới</Button>
            </div>

            <div className={cx('danh-sach-nhap-kho')}>
                <div style={{padding: '20px'}}>
                    <StockInTable />
                </div>
            </div>
        </div>
    );
}

export default StockIn;
