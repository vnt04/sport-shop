import classNames from "classnames/bind";
import styles from './Products.module.scss'
import ProductsTable from './ProductsTable'
import Search from "~/components/Search";

const cx = classNames.bind(styles);

function Products() {
    return (
        <div className ={cx('wrapper')}>
            <div className={cx('loc-san-pham')}>
                <h1>Danh sách sản phẩm trong kho</h1>

                <div className={cx('search')}>
                    <Search placeholder="Nhập sản phẩm cần tìm"/>
                </div>
            </div>

            <div className={cx('danh-sach-san-pham')}>
                <ProductsTable />
            </div>

        </div>
    )
}

export default Products;
