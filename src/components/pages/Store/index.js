import classNames from "classnames/bind";
import styles from './Store.module.scss';
import Select from 'react-select';
import StoreTable from "./StoreTable";
import { useState } from 'react';
import Search from "~/components/Search";


const cx = classNames.bind(styles);

function Store() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const handleSearch = (query) => {
    setSearchQuery(query); 
  };
  const handleSortChange = (selectedOption) => {
        if (selectedOption.value === 'ascending' || selectedOption.value === 'descending') {
            setSortOrder(selectedOption.value); // Lưu loại sắp xếp được chọn vào state
        }
    };
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
                            options={[
                                { value: 'ascending', label: 'Giá tăng dần' },
                                { value: 'descending', label: 'Giá giảm dần' },
                            ]}
                            onChange={handleSortChange}
                            placeholder="Sắp xếp"
                        />
                    </div>

                    <div className={cx('tim-ten-san-pham')}>
                        <Search placeholder="Nhập tên sản phẩm cần tìm" onChange={handleSearch} />
                    </div>

                    
                </div>

            </div>

            <div className={cx('ds-san-pham')}>
                <StoreTable searchQuery={searchQuery} sortOrder={sortOrder}/>
            </div>                  
        </div>

    );
}

export default Store;
