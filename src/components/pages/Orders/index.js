import classNames from "classnames/bind";
import styles from './Orders.module.scss'
import ProductsTable from './OrdersTable'

const cx = classNames.bind(styles);

function Orders() {
    return (
        <div className ={cx('wrapper')}>
            <div className={cx('loc-san-pham')}>
                <h1>Danh sách đơn đặt hàng</h1>
            </div>

            <div className={cx('danh-sach-san-pham')}>
                <ProductsTable/>
            </div>

        </div>
    )
}

export default Orders;
