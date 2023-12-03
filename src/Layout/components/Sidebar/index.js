import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import Button from 'react-bootstrap/Button';
import { CategoryIcon, OrdersIcon, StoreIcon, ImpWarehouseIcon, ExpWarehouseIcon, UsersIcon, BellIcon, ChartIcon, ProductIcon } from '~/assets/Icons';
import config from '~/config';
import { useAuth } from '~/components/Login/AuthContext';
const cx = classNames.bind(styles);

function Sidebar() {
    const { logout } = useAuth();
    const handleClick = (event) => {
        event.preventDefault();
        logout();
    };
    return (
        <aside className={cx('wrapper')}>
            
                    <div className={cx('header-sidebar')} >
                        <h1 className={cx('header-sidebar-title')}>Quản lý cửa hàng</h1>
                    </div>  

                    <div className='sidebar-content'>
                        <Menu>
                            <MenuItem title="Sản phẩm" to={config.routes.products} icon={<ProductIcon />} />
                            <MenuItem title="Loại sản phẩm" to={config.routes.category} icon={<CategoryIcon />} />
                            <MenuItem title="Nhà cung cấp" to={config.routes.suppliers} icon={<BellIcon />} />
                            <MenuItem title="Cửa hàng" to={config.routes.store} icon={<StoreIcon />} />
                            <MenuItem title="Đơn đặt hàng" to={config.routes.orders} icon={<OrdersIcon />} />
                            <MenuItem title="Nhân viên" to={config.routes.users} icon={<UsersIcon />} />
                            <MenuItem title="Nhập kho" to={config.routes.stockIn} icon={<ImpWarehouseIcon />} />
                            <MenuItem title="Xuất kho" to={config.routes.stockOut} icon={<ExpWarehouseIcon />} />
                            <MenuItem title="Thống kê" to={config.routes.statistics} icon={<ChartIcon />} />
                        </Menu>
                    </div>
                    
                    <div className={cx('footer-sidebar')}>
                        <Button onClick={handleClick} variant="outline-danger" >Đăng xuất</Button>
                    </div>
            
        </aside>
    );
}

export default Sidebar;
