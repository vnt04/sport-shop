import classNames from "classnames/bind";
import styles from './Products.module.scss'
import ProductsTable from './ProductsTable'
import Search from "~/components/Search";
import { useState } from "react";

const cx = classNames.bind(styles);

function Products() {
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (query) => {
        setSearchQuery(query); 
    };
    return (
        <div className ={cx('wrapper')}>
            <div className={cx('loc-san-pham')}>
                <h1>Danh sách sản phẩm trong kho</h1>

                <div className={cx('search')}>
                    <Search placeholder="Nhập sản phẩm cần tìm" onChange={handleSearch}/>
                </div>
            </div>

            <div className={cx('danh-sach-san-pham')}>
                <ProductsTable searchQuery={searchQuery}/>
            </div>

        </div>
    )
}

export default Products;
