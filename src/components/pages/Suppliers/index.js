import axios from "axios";
import classNames from "classnames/bind";
import styles from './Suppliers.module.scss'
import Select from 'react-select';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SuppliersTable from './SuppliersTable';
import routes from "~/config/routes";

const cx = classNames.bind(styles);

function Suppliers() {
    const [selectedNCC, setSelectedNCC] = useState(null);
    const [data, setData] = useState([]);
    const handleNCCChange = (selectedOption) => {
        setSelectedNCC(selectedOption);
    };

    useEffect(() => {
        axios.get('http://localhost:3005/supplier/read')
        .then(function (response) {
            const formattedData = response.data.map(ncc => ({
                label: ncc.tenNcc, // Đổi 'tenNcc' thành key chứa tên nhà cung cấp trong đối tượng nhà cung cấp từ API của bạn
                value: ncc._id // Đổi '_id' thành key chứa ID nhà cung cấp trong đối tượng nhà cung cấp từ API của bạn
            }));
            setData(formattedData);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);
    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(routes.addSupplier);
    };
    return (
        <div className ={cx('wrapper')}>
            <div className={cx('loc-ncc')}>
                <h1>Danh sách nhà cung cấp</h1>

                <div className={cx('search')}>
                    <Select
                        value={selectedNCC}
                        onChange={handleNCCChange}
                        options={data}
                        isSearchable
                        placeholder="Chọn nhà cung cấp cần tìm"
                        className="form-control-lg"
                        filterOption={(option, inputValue) =>
                            option.label.toLowerCase().includes(inputValue.toLowerCase())
    }
/>
                </div>

                <button onClick={handleClick}>Tạo mới</button>
            </div>

            <div className={cx('danh-sach-ncc')}>
                <SuppliersTable/>
                
            </div>
            
        </div>
    )
}

export default Suppliers;