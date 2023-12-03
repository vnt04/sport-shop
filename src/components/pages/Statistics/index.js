import React from 'react';
import classNames from 'classnames/bind';
import styles from './Statistics.module.scss';
import Data, { DataItems } from './Data';
import { BagIcon, MoneyIcon, ProductIcon } from '~/assets/Icons';
import Chart from './Chart';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>

            <div className={cx('statistics-container')}>
                <Data>
                    <DataItems title="Tổng doanh thu" icon={<MoneyIcon />} quantity={1} />
                    <DataItems title="Tổng đơn hàng" icon={<BagIcon />} quantity={2} />
                    <DataItems title="Tổng sản phẩm" icon={<ProductIcon />} quantity={3} />
                </Data>
            </div>

            <div className={cx('chart')}>
                <Chart />
            </div>
        </div>
    );
}

export default Home;