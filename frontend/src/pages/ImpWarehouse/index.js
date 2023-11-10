import { useNavigate } from 'react-router-dom'; // Import useHistory từ React Router
import styles from './ImpWarehouse.module.scss';
import classNames from 'classnames/bind';
import Time from '../Home/Time';
import routes from '~/config/routes';
import Data from './Data';
const cx = classNames.bind(styles);

function ImpWarehouse() {
    const navigate = useNavigate();

    const handleCreateNewClick = () => {
        navigate(routes.addWarehouse);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h3>Danh sách nhập kho</h3>
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
                <div>
                    <Data />
                </div>
            </div>
        </div>
    );
}

export default ImpWarehouse;
