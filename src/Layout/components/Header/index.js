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
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [unreadNotifications, setUnreadNotifications] = useState(0);

    useEffect(() =>{
        const loggedInUser = localStorage.getItem('loggedInUser');
        setUnreadMessages(3);
        setUnreadNotifications(2);
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
                <div className={cx('logo')} onClick={() => {navigate('/statistics')}}>
                    <img src={images.logo} alt="logo" /> 
                    <h1>SPORT SHOP</h1> 
                </div>
                <div className={cx('user-name')}>
                    {loggedInUsername}
                </div>

                <div className={cx('action')}>
                    <div className={cx('action-icon')}>
                            <NotifyIcon />
                            {unreadNotifications > 0 && (
                                <span className={cx('unread-count')}>{unreadNotifications}</span>
                            )}
                            
                    </div>
                    <div className={cx('action-icon')}>
                            <EmailIcon />
                            {unreadMessages > 0 && (
                                <span className={cx('unread-count')}>{unreadMessages}</span>
                            )}
                            
                    </div>
                    <div className={cx('action-icon')}>
                        <UserIcon/>
                    </div>
                </div>
            </div>

        </header>
    );
}

export default Header;
