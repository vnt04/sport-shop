import classNames from 'classnames/bind';
import styles from './Statistics.module.scss';

const cx = classNames.bind(styles);

function Chart() {
    return (
        <div className={cx('chart-container')}>
            <div className={cx('doanh-thu')}>
                <p>Doanh thu</p>
            </div>
            <div className={cx('san-pham')}>
                <p>Số liệu thống kê sản phẩm</p>
            </div>
        </div>
    );
}

export default Chart;