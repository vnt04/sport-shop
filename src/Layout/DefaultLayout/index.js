import React,{useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';
import { useAuth } from '~/components/Login/AuthContext';
import Login from '~/components/Login';
import Notify from '~/components/Notify';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [no, setNo] = useState(false);
    const [showNotify,setShowNotify] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const restrictedRoutes = ['/statistics', '/users', '/orders'];
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (isLoggedIn && user.type === '2' && restrictedRoutes.includes(window.location.pathname)) {
            setNo(true);
            setShowNotify(true);
        }
    }, [restrictedRoutes]);
    const handleClose = () =>{
        navigate('/products')
        setShowNotify(false);
        setNo(false);
    }
    return (
        <React.Fragment>
            
            {isLoggedIn ? (
                <div className={cx('wrapper')}>
                    <Header />
                    <div className={cx('container')}>
                        <Sidebar />
                        {
                            !no?(<div className={cx('content')}>{children}</div>):
                            <Notify color='red' show={showNotify} massage="Bạn phải đăng nhập với tư cách admin!!" handleClose={handleClose}  />
                        }
                    </div>
                </div>
            )
             : (
                <Login />
            )}
        </React.Fragment>
    );
}

export default DefaultLayout;