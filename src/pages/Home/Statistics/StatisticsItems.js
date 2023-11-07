import styles from '../Home.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function StatisticsItems({ title, icon, quantity }) {
    return (
        <div className={cx('statistics-items')}>
            <div className={cx('icon-title')}>
                {icon}
                <span className={cx('title')}>{title}</span>
            </div>
            <div className={cx('quantity')}>{quantity}</div>
        </div>
    );
}

StatisticsItems.prototype = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    quantity: PropTypes.number.isRequired,
};

export default StatisticsItems;
