import React from 'react';
import classNames from 'classnames/bind';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';
import { useAuth } from '~/components/Login/AuthContext';
import Login from '~/components/Login';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { isLoggedIn } = useAuth();

    return (
        <React.Fragment>
            {isLoggedIn ? (
                <div className={cx('wrapper')}>
                    <Sidebar />
                    <div className={cx('container')}>
                        <Header />
                        <div className={cx('content')}>{children}</div>
                    </div>
                </div>
            ) : (
                <Login />
            )}
        </React.Fragment>
    );
}

export default DefaultLayout;
