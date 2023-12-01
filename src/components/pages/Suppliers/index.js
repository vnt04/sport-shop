import axios from "axios";
import classNames from "classnames/bind";
import styles from './Suppliers.module.scss'
import { useNavigate } from 'react-router-dom';
import SuppliersTable from './SuppliersTable';
import routes from "~/config/routes";
import Search from "~/components/Search";
import Button from 'react-bootstrap/Button';

const cx = classNames.bind(styles);

function Suppliers() {

    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(routes.addSupplier);
    };
    return (
        <div className ={cx('wrapper')}>
            <div className={cx('loc-ncc')}>
                <h1>Danh sách nhà cung cấp</h1>

                <div className={cx('search')}>
                    <Search placeholder= "Nhập nhà cung cấp cần tìm"/>
                </div>

                <Button onClick={handleClick} variant="success">Tạo mới</Button>
            </div>

            <div className={cx('danh-sach-ncc')}>
                <SuppliersTable/>
                
            </div>
            
        </div>
    )
}

export default Suppliers;