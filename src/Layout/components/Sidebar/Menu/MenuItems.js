import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink,useLocation } from 'react-router-dom';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItems({ title, to, icon }) {
    const { pathname } = useLocation();

    return (
        <NavLink className={`${styles['menu-item']} ${pathname.startsWith(to)? styles['active'] : ''}`} to={to}>  
            {icon}
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}

MenuItems.prototype = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
};

export default MenuItems;
