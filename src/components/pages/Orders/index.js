import classNames from "classnames/bind";
import styles from './Orders.module.scss'
import Time from '../Home/Time';
import { useState } from 'react';

import ProductsTable from './OrdersTable'

const cx = classNames.bind(styles);

function Orders() {
    const Types = [
       {label: 'Dụng cụ tập gym', value: 'gym'},
       {label: 'Đồ thể thao', value: 'clothes'}
    ];
    return (
        <div className ={cx('wrapper')}>
            <div className={cx('loc-san-pham')}>
                <h1>Danh sách đơn đặt hàng</h1>
                <div className={cx('filter')}>
                    <div className={cx('time')}>
                        <p>Từ ngày:</p>
                        <Time />
                        <p>Đến ngày:</p>
                        <Time />
                    </div>
                    <button className={cx('button-search')}>Tìm</button>
                </div>
            </div>

            <div className={cx('danh-sach-san-pham')}>
                <ProductsTable/>
            </div>

        </div>
    )
}

export default Orders;
