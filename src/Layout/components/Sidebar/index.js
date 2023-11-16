import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import Button from 'react-bootstrap/Button';
import { HomeIcon, CategoryIcon, OrdersIcon, StoreIcon, ImpWarehouseIcon, ExpWarehouseIcon, UsersIcon, BellIcon, ChartIcon } from '~/assets/Icons';
import config from '~/config';
const cx = classNames.bind(styles);

function Sidebar() {
    
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                    <h1 style={{justifyItems:'center',color:'#fdd835',fontSize:'2.7rem',fontWeight:'700', marginLeft: '10px', marginTop:'30px',marginBottom:'25px'}} >
                    Quản lý cửa hàng
                    </h1>                
                    <MenuItem title="Trang chủ" to={config.routes.home} icon={<HomeIcon />} />
                    <MenuItem title="Nhà cung cấp" to={config.routes.suppliers} icon={<BellIcon />} />
                    <MenuItem title="Sản phẩm" to={config.routes.products} icon={<CategoryIcon />} />
                    <MenuItem title="Cửa hàng" to={config.routes.store} icon={<StoreIcon />} />
                    <MenuItem title="Đơn đặt hàng" to={config.routes.orders} icon={<OrdersIcon />} />
                    <MenuItem title="Nhân viên" to={config.routes.users} icon={<UsersIcon />} />
                    <MenuItem title="Nhập kho" to={config.routes.stockIn} icon={<ImpWarehouseIcon />} />
                    <MenuItem title="Xuất kho" to={config.routes.stockOut} icon={<ExpWarehouseIcon />} />
                    <MenuItem title="Thống kê" to={config.routes.statistics} icon={<ChartIcon />} />
                    
                    <div className={cx('footer-sidebar')}>
                        <Button variant="outline-danger">Đăng xuất</Button>{' '}
                    </div>
            </Menu>
        </aside>
    );
}

export default Sidebar;
