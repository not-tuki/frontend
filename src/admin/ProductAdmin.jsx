import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Menu, Space, Pagination, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Add from '../assets/Images/add.png';
import ProductCardAdmin from '../admin/ProductCardAdmin';
import { Content } from 'antd/es/layout/layout';
import './custom.css'
export default function Product() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [color, setColor] = useState("");
    const [details, setDetails] = useState("");
    const [category, setCategory] = useState("");
    const [url, setUrl] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        
        const storedProducts = localStorage.getItem('products');
        const storedCategories = localStorage.getItem('categories');
        if (storedProducts) {
            const products = JSON.parse(storedProducts);
            setProducts(products);
            setFilteredProducts(products);
        }
        if (storedCategories) {
            const categories = JSON.parse(storedCategories);
            setCategories(categories);
        }
    }, []);

    useEffect(() => {
        const results = products.filter(product =>
            product.ProductName.toLowerCase().includes(searchTerm.toLowerCase()) || product.Category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
    }, [searchTerm, products]);

    const addProduct = () => {
        let newProduct = {
            id: products.length+1,
            ProductName: name,
            ProductPrice: price,
            Category: category,
            Color: color,
            ProductDetails: details,
            imageUrl: url,
        };

        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setFilteredProducts(updatedProducts);
    };

    const addCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            const updatedCategories = [...categories, newCategory];
            setCategories(updatedCategories);
            localStorage.setItem('categories', JSON.stringify(updatedCategories));
            setNewCategory("");
        }
        setIsCategoryModalVisible(false);
    };

    const handleCreateProductClick = () => {
        addProduct();
        setIsFormVisible(false);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const handleMenuClick = (e) => {
        setCategory(e.key);
        const results = products.filter(product =>
            (product.ProductName.toLowerCase().includes(searchTerm.toLowerCase()) || product.Category.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (e.key === '' || product.Category === e.key)
        );
        setFilteredProducts(results);
    };

    const indexOfLastProduct = currentPage * pageSize;
    const indexOfFirstProduct = indexOfLastProduct - pageSize;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const categoryItems = [
        {
            key: 'categories',
            label: 'Categories',
            children: categories.map(category => ({ key: category, label: category })),
        }
    ];
    return (
        <div>
            <Form>
                <Space>
                    <div onClick={() => setIsFormVisible(true)} type='text' style={style.btnadd}>
                        <img width={"40px"} src={Add} alt="" />
                    </div>
                    <Input
                        style={{ textAlign: 'left', width: '160px' }}
                        className="input-byme"
                        placeholder='Search'
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <SearchOutlined />
                    <Menu
                        theme="black"
                        onClick={handleMenuClick}
                        style={{ backgroundColor: 'transparent', textAlign: 'center', width: '150px', fontSize: '13px' }}
                        mode="inline"
                        defaultSelectedKeys={['']}
                        items={categoryItems}
                    />
                </Space>

                <Modal
                    title="ADD NEW PRODUCT"
                    open={isFormVisible}
                    onOk={handleCreateProductClick}
                    onCancel={() => setIsFormVisible(false)}
                    okType='none'
                    okText='Add new'
                    footer={
                        <div onClick={handleCreateProductClick} className='btn-div'>
                            Add New
                        </div>
                    }

                >
                    <Form layout="vertical">
                        <Form.Item style={{ marginTop: '50px' }}>
                            <Input
                                placeholder='Product Name'
                                className="input-byme"
                                name='name'
                                type='text'
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item >
                            <Input
                                placeholder='Product Price'
                                name='price'
                                type='number'
                                className="input-byme"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                placeholder='Product Color'
                                name='color'
                                type='text'
                                className="input-byme"
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                        >
                            <Space>
                                <Select
                                    defaultValue='Category'
                                    style={{ width: 200, marginLeft: 10, marginRight: 10 }}
                                    onChange={(value) => setCategory(value)}
                                    options={categories.map(cat => ({ value: cat, label: cat }))}
                                />
                                <div type="text" className='btn-div' onClick={() => setIsCategoryModalVisible(true)}>
                                    + Add Category
                                </div>
                            </Space>
                        </Form.Item>
                        <Form.Item >
                            <Input
                                placeholder='Product Details'
                                name='details'
                                type='text'
                                className="input-byme"
                                onChange={(e) => setDetails(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item >
                            <Input
                                placeholder='Product Image'
                                name='url'
                                type='text'
                                className="input-byme"
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="ADD NEW CATEGORY"
                    centered
                    open={isCategoryModalVisible}
                    onCancel={() => setIsCategoryModalVisible(false)}
                    width={400}

                    footer={
                        <div onClick={addCategory} className='btn-div'>
                            Add Category
                        </div>
                    }
                >
                    <Form layout="vertical">
                        <Form.Item >
                            <Input
                                name='newCategory'
                                type='text'
                                className='input-byme'
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </Form>
            <Content style={{ display:'flex' , flexWrap:'wrap'}}>
                {currentProducts.map((product) => (
                    <ProductCardAdmin
                        key={product.id}
                        ProductID={product.id}
                        ProductName={product.ProductName}
                        ProductPrice={product.ProductPrice}
                        ProductDetails={product.ProductDetails}
                        Color={product.Color}
                        imageUrl={product.imageUrl}
                    />
                ))}
            </Content>
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredProducts.length}
                onChange={handlePageChange}
                style={{ marginTop: 20 }}
            />
        </div>
    );
};

const style = {
    btnadd: {
        cursor: 'pointer',
        display: 'inline-block',
        margin: '10px',
    },
};
