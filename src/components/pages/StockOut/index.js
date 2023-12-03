import { useNavigate } from 'react-router-dom'; // Import useHistory từ React Router
import styles from './StockOut.module.scss';
import classNames from 'classnames/bind';
import routes from '../../../config/routes';
import StockOutTable from './StockOutTable';
import { Button } from 'react-bootstrap';
const cx = classNames.bind(styles);

function StockOut() {
    const navigate = useNavigate();

    const handleCreateNewClick = () => {
        navigate(routes.outStock);
        //cần thêm route
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-xuat-kho')}>
                <h1>Danh sách xuất kho</h1>
                <Button variant='success' onClick={handleCreateNewClick}>Tạo mới</Button>
            </div>

            <div className={cx('danh-sach-xuat-kho')}>

                {/* Table */}
                <div style={{padding: '20px'}}>
                    <StockOutTable />
                </div>
            </div>
        </div>
    );
}

export default StockOut;
