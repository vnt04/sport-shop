import classNames from 'classnames/bind';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { UserIcon } from '~/assets/Icons';

const cx = classNames.bind(styles);

function Header() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [loggedInUsername, setLoggedInUsername] = useState('')
    useEffect(() =>{
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        // Lấy tên người dùng từ thông tin đã lưu
        setLoggedInUsername(user.email); // Hiển thị email, bạn có thể thay thế bằng tên người dùng hoặc thông tin khác nếu cần
        }
    },[])

    const users = [
        // ... (user data)
    ];


    const handleUserChange = (selectedOption) => {
        setSelectedUser(selectedOption);
    };


    return (
        <header className={cx('wrapper')}>
            <div className={cx('content')}>
                <Link to="/home" className={cx('logo')}>
                    <img src={images.logo} alt="logo" />
                </Link>

                <div className={cx('search')}>
                    <Select
                        value={selectedUser}
                        onChange={handleUserChange}
                        options={users}
                        isSearchable
                        placeholder="Chọn chức năng cần tìm kiếm"
                        className="form-control-lg"
                    />
                </div>
                <div className={cx('user-name')}>
                    {loggedInUsername}
                </div>
                <div className={cx('action')}>
                    <UserIcon />
                </div>
            </div>

        </header>
    );
}

export default Header;
