import classNames from "classnames/bind";
import styles from './Users.module.scss'
import { useNavigate } from 'react-router-dom';
import UsersTable from './UsersTable';
import routes from "~/config/routes";
import Search from "~/components/Search";
import  Button  from "react-bootstrap/Button";

const cx = classNames.bind(styles);

function Users() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(routes.addUser);
    };
    return (
        <div className ={cx('wrapper')}>
            <div className={cx('loc-user')}>
                <h1>Danh sách nhân viên</h1>

                <div className={cx('search')}>
                    <Search placeholder="Nhập tên nhân viên cần tìm"/>
                </div>

                <Button onClick={handleClick} variant="success">Tạo mới</Button>
            </div>

            <div className={cx('danh-sach-users')}>
                <UsersTable/>
            </div>
            
        </div>
    )
}

export default Users;