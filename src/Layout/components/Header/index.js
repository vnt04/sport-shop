import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import images from '~/assets/images';
import {  useNavigate } from 'react-router-dom';
import {  EmailIcon, NotifyIcon, UserIcon } from '~/assets/Icons';
import axios from 'axios';

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();
    const [loggedInUsername, setLoggedInUsername] = useState('')
    useEffect(() =>{
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        
        // gọi api lấy username
        axios.get('http://localhost:3005/login/read')
            .then(function(response) {
                const userLoggedin = response.data.find((acc) => acc.email === user.email)
                if (userLoggedin) {
                    // Nếu tìm thấy user trong response data
                    setLoggedInUsername(userLoggedin.username); // Đặt username từ userLoggedin vào state
                }
            })
        }
    },[])


    return (
        <header className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('logo')} onClick={() => {navigate('/home')}}>
                    <img src={images.logo} alt="logo" /> 
                    <h1>SPORT SHOP</h1> 
                </div>
                <div className={cx('user-name')}>
                    {loggedInUsername}
                </div>

                <div className={cx('action')}>
                    <div className={cx('action-icon')}>
                        <NotifyIcon />
                    </div>
                    <div className={cx('action-icon')}>
                        <EmailIcon />
                    </div>
                    <div className={cx('action-icon')}>
                        <UserIcon />
                    </div>
                </div>
            </div>

        </header>
    );
}

export default Header;
