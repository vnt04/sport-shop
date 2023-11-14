import classNames from "classnames/bind";
import styles from './Products.module.scss'
import Select from 'react-select';
import { useState } from 'react';

import ProductsTable from './ProductsTable'

const cx = classNames.bind(styles);

function Products() {
    const [selectedType, setSelectedUser] = useState(null);

    const handleTypeChange = (selectedOption) => {
        setSelectedUser(selectedOption);
    };
    const Types = [
       {label: 'Dụng cụ tập gym', value: 'gym'},
       {label: 'Đồ thể thao', value: 'clothes'}
    ];
    return (
        <div className ={cx('wrapper')}>
            <div className={cx('loc-san-pham')}>
                <h1>Danh sách sản phẩm trong kho</h1>

                <div className={cx('search')}>
                    <Select
                        value={selectedType}
                        onChange={handleTypeChange}
                        options={Types}
                        isSearchable
                        placeholder="Chọn loại sản phẩm cần tìm"
                        className="form-control-lg"
                    />
                </div>
            </div>

            <div className={cx('danh-sach-san-pham')}>
                <ProductsTable/>
            </div>

        </div>
    )
}

export default Products;
