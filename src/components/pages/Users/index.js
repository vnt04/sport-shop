import classNames from "classnames/bind";
import styles from './Users.module.scss'
import Select from 'react-select';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersTable from './UsersTable';
import routes from "~/config/routes";

const cx = classNames.bind(styles);

function Users() {
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
        navigate(routes.addUser);
    };
    return (
        <div className ={cx('wrapper')}>
            <div className={cx('loc-user')}>
                <h1>Danh sách nhân viên</h1>

                <div className={cx('search')}>
                    <Select
                        value={selectedType}
                        onChange={handleTypeChange}
                        options={Types}
                        isSearchable
                        placeholder="Chọn nhân viên cần tìm"
                        className="form-control-lg"
                    />
                </div>

                <button onClick={handleClick}>Tạo mới</button>
            </div>

            <div className={cx('danh-sach-users')}>
                <UsersTable/>
            </div>
            
        </div>
    )
}

export default Users;