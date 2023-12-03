import React,{useEffect,useState} from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Statistics.module.scss';
import Data, { DataItems } from './Data';
import { MdOutlineWarehouse } from "react-icons/md";
import { BiMoneyWithdraw,BiCart,BiStore,BiCategory , } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";

const cx = classNames.bind(styles);

function Statistics() {
    const [userCount, setUserCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [storeCount, setStoreCount] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:3005/user/read'),
            axios.get('http://localhost:3005/order/read'),
            axios.get('http://localhost:3005/product/read'),
            axios.get('http://localhost:3005/category/read'),
            axios.get('http://localhost:3005/store/read')
        ]).then(([userData, orderData, productData, categoryData,storeData]) => {
            const users = userData.data;
            const orders = orderData.data;
            const products = productData.data;
            const categories = categoryData.data;
            const stores = storeData.data;

            const numberOfUsers = users.length;
            const numberOfOrders = orders.length;
            const numberOfProducts = products.length;
            const numberOfCategories = categories.length;
            const numberOfStores = stores.length;
            console.log(orders);
            const total = orders.reduce((acc, order) => {
                return acc + parseFloat(order.tongTien);
            }, 0);


            setUserCount(numberOfUsers);
            setOrderCount(numberOfOrders);
            setProductCount(numberOfProducts);
            setCategoryCount(numberOfCategories);
            setStoreCount(numberOfStores);
            setTotalRevenue(total)
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <div className={cx('wrapper')}>

            <div className={cx('statistics-container-1')}>
                <Data>
                    <DataItems title="Tổng doanh thu" to='/orders' icon={<BiMoneyWithdraw />} quantity={totalRevenue} />
                    <DataItems title="Số đơn đặt hàng" to='/orders' icon={<BiCart />} quantity={orderCount} />
                    <DataItems title="Số sản phẩm đang bán" to='/store' icon={<BiStore />} quantity={storeCount} />
                </Data>
            </div>
            <div className={cx('statistics-container-2')}>
                <Data>
                    <DataItems title="Tổng số nhân viên" to='/users' icon={<FiUsers />} quantity={userCount} />
                    <DataItems title="Số loại sản phẩm" to='/category' icon={<BiCategory  />} quantity={categoryCount} />
                    <DataItems title="Số sản phẩm trong kho" to='/products' icon={<MdOutlineWarehouse  />} quantity={productCount} />
                </Data>
            </div>
            {/* <div className={cx('chart')}>
                <Chart />
            </div> */}
        </div>
    );
}



export default Statistics;