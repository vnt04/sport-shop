import { useNavigate } from 'react-router-dom'; // Import useHistory từ React Router
import styles from './StockOut.module.scss';
import classNames from 'classnames/bind';
import Time from '../Home/Time';
import routes from '../../../config/routes';
import StockOutTable from './StockOutTable';
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
                <button onClick={handleCreateNewClick}>Tạo mới</button>
            </div>

            <div className={cx('danh-sach-xuat-kho')}>
                <div className={cx('filter')}>
                    <div className={cx('time')}>
                        <p>Từ ngày:</p>
                        <Time />
                        <p>Đến ngày:</p>
                        <Time />
                    </div>
                    <button className={cx('button-search')}>Tìm</button>
                </div>

                {/* Table */}
                <div style={{padding: '20px'}}>
                    <StockOutTable />
                </div>
            </div>
        </div>
    );
}

export default StockOut;
