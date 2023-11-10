import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import { HomeIcon, CategoryIcon, OrdersIcon, StoreIcon, ImpWarehouseIcon, ExpWarehouseIcon } from '~/components/Icons';
import config from '~/config';
const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="Trang chủ" to={config.routes.home} icon={<HomeIcon />} />
                <MenuItem title="Danh mục" to={config.routes.category} icon={<CategoryIcon />} />
                <MenuItem title="Đơn đặt hàng" to={config.routes.orders} icon={<OrdersIcon />} />
                <MenuItem title="Cửa hàng" to={config.routes.store} icon={<StoreIcon />} />
                <MenuItem title="Nhập kho" to={config.routes.impWarehouse} icon={<ImpWarehouseIcon />} />
                <MenuItem title="Xuất kho" to={config.routes.expWarehouse} icon={<ExpWarehouseIcon />} />
            </Menu>
        </aside>
    );
}

export default Sidebar;
