import React, { useState } from 'react';
import classNames from "classnames/bind";
import styles from './Suppliers.module.scss';
import { useNavigate } from 'react-router-dom';
import SuppliersTable from './SuppliersTable';
import routes from "~/config/routes";
import Search from "~/components/Search";
import Button from 'react-bootstrap/Button';

const cx = classNames.bind(styles);

function Suppliers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleClick = () => {
    navigate(routes.addSupplier);
  };

  const handleSearch = (query) => {
    setSearchQuery(query); 
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('loc-ncc')}>
        <h1>Danh sách nhà cung cấp</h1>

        <div className={cx('search')}>
          <Search placeholder="Nhập tên nhà cung cấp cần tìm" onChange={handleSearch} />
        </div>
        <Button onClick={handleClick} variant="success">
          Tạo mới
        </Button>
      </div>

      <div className={cx('danh-sach-ncc')}>
        <SuppliersTable searchQuery={searchQuery}  />
      </div>
    </div>
  );
}

export default Suppliers;
