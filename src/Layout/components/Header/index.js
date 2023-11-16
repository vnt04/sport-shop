import classNames from 'classnames/bind';
import Select from 'react-select';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { UserIcon } from '~/assets/Icons';
import LoginForm from './LoginForm';

const cx = classNames.bind(styles);

function Header() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [showLoginForm, setShowLoginForm] = useState(false);

    const users = [
        // ... (user data)
    ];

    const handleUserChange = (selectedOption) => {
        setSelectedUser(selectedOption);
    };

    const handleSignIn = () => {
        setShowLoginForm(!showLoginForm);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('content')}>
                <Link to="/" className={cx('logo')}>
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

                <div className={cx('action')}>
                    <Button onClick={handleSignIn} variant="outline-light">Đăng nhập</Button>
                    <UserIcon />
                </div>
            </div>

             {showLoginForm && <div><LoginForm /></div>} 
        </header>
    );
}

export default Header;
