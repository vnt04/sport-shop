import styles from './Home.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function RecentOrders() {
    return <div className={cx('lich-su-don-hang')}>Các đơn đặt hàng gần đây</div>;
}

export default RecentOrders;
