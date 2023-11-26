import { useNavigate } from 'react-router-dom';
import styles from './StockIn.module.scss';
import classNames from 'classnames/bind';
import Time from '../Home/Time';
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
                <button onClick={handleCreateNewClick}>Tạo mới</button>
            </div>

            <div className={cx('danh-sach-nhap-kho')}>
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
                    <StockInTable />
                </div>
            </div>
        </div>
    );
}

export default StockIn;
