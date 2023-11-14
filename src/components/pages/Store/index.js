import classNames from "classnames/bind";
import styles from './Store.module.scss';
import Select from 'react-select';
import { useState } from 'react';
import Category from "./Category";

const cx = classNames.bind(styles);

function Store() {
    const [selectedType, setSelectedUser] = useState(null);

    const handleTypeChange = (selectedOption) => {
        setSelectedUser(selectedOption);
    };
    const Types = [
       {label: 'Giá: tăng dần', value: 'inc'},
       {label: 'Giá: giảm dần', value: 'dec'}
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-store')}>
                <div>
                    <h1 style={{marginTop:'10px',marginLeft:'20px'}}>
                        Sản phẩm đang được bán tại cửa hàng
                    </h1>
                </div>

                <div className={cx('loc-san-pham')}>
                    <h2 style={{marginLeft:'20px'}}>Bộ lọc</h2>
                    <div className={cx('sap-xep-theo')}>
                    <Select
                        value={selectedType}
                        onChange={handleTypeChange}
                        options={Types}
                        isSearchable
                        placeholder="Giá"
                        className="form-control-lg"
                    />
                    </div>

                    <div className={cx('tim-ten-san-pham')}>
                    <Select
                        value={selectedType}
                        onChange={handleTypeChange}
                        options={Types}
                        isSearchable
                        placeholder="Nhập tên sản phẩm cần tìm"
                        className="form-control-lg"
                    />
                    </div>

                </div>

                <div className={cx('danh-muc-sp')}>
                     <Category/>
                </div>
            </div>
            

            <div className={cx('san-pham')}>


            </div>
        </div>

    );
}

export default Store;
