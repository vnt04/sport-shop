import React from 'react';
import classNames from 'classnames/bind';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
                <Sidebar />
            <div className={cx('container')}>
                <Header/>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}
export default DefaultLayout;