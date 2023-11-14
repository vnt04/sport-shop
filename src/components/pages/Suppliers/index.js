import classNames from "classnames/bind";
import styles from './Suppliers.module.scss'
import Select from 'react-select';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuppliersTable from './SuppliersTable';
import routes from "~/config/routes";

const cx = classNames.bind(styles);

function Suppliers() {
    const [selectedType, setSelectedUser] = useState(null);
    const handleTypeChange = (selectedOption) => {
        setSelectedUser(selectedOption);
    };
    const Types = [
       {label: 'Dụng cụ tập gym', value: 'gym'},
       {label: 'Đồ thể thao', value: 'clothes'}
    ];
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(routes.addSupplier);
    };
    return (
        <div className ={cx('wrapper')}>
            <div className={cx('loc-ncc')}>
                <h1>Danh sách nhà cung cấp</h1>

                <div className={cx('search')}>
                    <Select
                        value={selectedType}
                        onChange={handleTypeChange}
                        options={Types}
                        isSearchable
                        placeholder="Chọn nhà cung cấp cần tìm"
                        className="form-control-lg"
                    />
                </div>

                <button onClick={handleClick}>Tạo mới</button>
            </div>

            <div className={cx('danh-sach-ncc')}>
                <SuppliersTable/>
            </div>
            
        </div>
    )
}

export default Suppliers;