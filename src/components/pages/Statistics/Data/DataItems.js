import styles from '../Statistics.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function DataItems({ title, icon, quantity }) {
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

DataItems.prototype = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    quantity: PropTypes.number.isRequired,
};

export default DataItems;