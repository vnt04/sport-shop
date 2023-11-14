import React from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Time from './Time';
import Statistics, { StatisticsItems } from './Statistics';
import { BagIcon, MoneyIcon, ProductIcon } from '~/assets/Icons';
import Chart from './Chart';
import RecentOrders from './RecentOrders';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('time-container')}>
                <div className={cx('time')}>
                    <p>Từ ngày:</p>
                    <Time />
                    <p>Đến ngày:</p>
                    <Time />
                </div>
                <button className={cx('button-search')}>Tìm</button>
            </div>

            <div className={cx('statistics-container')}>
                <Statistics>
                    <StatisticsItems title="Tổng doanh thu" icon={<MoneyIcon />} quantity={1} />
                    <StatisticsItems title="Tổng đơn hàng" icon={<BagIcon />} quantity={2} />
                    <StatisticsItems title="Tổng sản phẩm" icon={<ProductIcon />} quantity={3} />
                </Statistics>
            </div>

            <div className={cx('chart')}>
                <Chart />
            </div>
            <div className={cx('recentOrders-container')}>
                <RecentOrders />
            </div>
        </div>
    );
}

export default Home;
