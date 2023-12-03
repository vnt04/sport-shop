import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import ProductsTable from './CategoryTable';
import styles from './Category.module.scss'
import Select from 'react-select';

const cx = classNames.bind(styles);
function Category() {
  const [selectedLoaiSP, setSelectedLoaiSP] = useState('');
  const [dataLoaiSP, setDataLoaiSP] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách loại sản phẩm
    axios.get('http://localhost:3005/category/read')
      .then(response => {
        const options = response.data.map(category => ({
          value: category.maLoai,
          label: category.tenLoai
        }));
        setDataLoaiSP(options);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleLoaiSPChange = async (selectedOption) => {
    setSelectedLoaiSP(selectedOption);

    try {
      const productsResponse = await axios.get('http://localhost:3005/product/read');
      const filteredProducts = productsResponse.data.filter(product => product.maLoai === selectedOption.value);
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
     <div className ={cx('wrapper')}>
            <div className={cx('loc-san-pham')}>
                <h1>Danh sách sản phẩm theo từng loại</h1>
            </div>
            <div className={cx('san-pham-theo-loai')}>
                <div className={cx('search')}>
                    <Select
                        required
                        name = "loaiSP"
                        value={selectedLoaiSP}
                        onChange={handleLoaiSPChange}
                        options={dataLoaiSP}
                        isSearchable
                        placeholder="Chọn loại sản phẩm"
                        className="form-control-lg"
                    />
                </div>
                <div className={cx('danh-sach-san-pham')}>
                    <ProductsTable products={products}/>
                </div>
            </div>
        </div>
  );
}

export default Category;
