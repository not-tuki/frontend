import React, { useState, useEffect } from 'react';
import { Card, Form, Modal, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './custom.css';

const { Meta } = Card;

export default function ProductTemple(props) {
    const { ProductID, ProductName, ProductPrice, Color, ProductDetails, imageUrl, Category } = props;

    // State for controlling the modal visibility and editing product
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [storeCategories, setStoreCategories] = useState([]);
    const [editProduct, setEditProduct] = useState({
        id: ProductID,
        name: ProductName,
        price: ProductPrice,
        category: Category,
        color: Color,
        details: ProductDetails,
        url: imageUrl,
    });
    useEffect(() => {
        const storeCategory = localStorage.getItem('categories') || [];

        if (storeCategory) {
            const cate = JSON.parse(storeCategory)
            setStoreCategories(cate);
        }
    }, [])
    // Function to toggle modal visibility
    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    // Function to handle input changes in the form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditProduct({
            ...editProduct,
            [name]: value,
        });
    };

    // Function to handle Select component change
    const handleCategoryChange = (value) => {
        setEditProduct({
            ...editProduct,
            category: value,
        });
    };

    // Function to handle saving changes when "OK" is clicked in the modal
    const updateadminproduct = () => {
        let products = JSON.parse(localStorage.getItem('products')) || [];

        let updatedProducts = products.map(product => {
            if (product.id === editProduct.id) {
                return {
                    ...product,
                    ProductName: editProduct.name,
                    ProductPrice: editProduct.price,
                    Category: editProduct.category,
                    Color: editProduct.color,
                    ProductDetails: editProduct.details,
                    imageUrl: editProduct.url,
                };
            }
            return product;
        });

        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setIsFormVisible(false);
    };

    const updateProinCart = () => {
        let productsCart = JSON.parse(localStorage.getItem('cart')) || [];

        let updatedProducts = productsCart.map(product => {
            if (product.ProductID === editProduct.id) {
                return {
                    ...product,
                    ProductName: editProduct.name,
                    ProductPrice: editProduct.price,
                    Category: editProduct.category,
                    Color: editProduct.color,
                    ProductDetails: editProduct.details,
                    imageUrl: editProduct.url,
                };
            }
            return product;
        });

        localStorage.setItem('cart', JSON.stringify(updatedProducts));
        setIsFormVisible(false);
    };

    const handleOk = () => {
        updateadminproduct();
        updateProinCart();
    };

    // Effect to initialize state from local storage on component mount
    useEffect(() => {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const foundProduct = products.find(product => product.id === ProductID);
        if (foundProduct) {
            setEditProduct({
                id: foundProduct.id,
                name: foundProduct.ProductName,
                price: foundProduct.ProductPrice,
                category: foundProduct.Category,
                color: foundProduct.Color,
                details: foundProduct.ProductDetails,
                url: foundProduct.imageUrl,
            });
        }
    }, [ProductID]);

    const onCancel = () => {
        setIsFormVisible(false);
        window.location.reload();
    };

    const handleRemoveProduct = (productId) => {
        Modal.confirm({
            title: 'Confirm Deletion',
            content: 'Are you sure you want to delete this product?',
            onOk: () => {
                const products = JSON.parse(localStorage.getItem('products')) || [];
                const cart = JSON.parse(localStorage.getItem('cart')) || [];

                const updatedProducts = products.filter(item => item.id !== productId);
                const updatedCart = cart.filter(item => item.ProductID !== productId);

                localStorage.setItem('products', JSON.stringify(updatedProducts));
                localStorage.setItem('cart', JSON.stringify(updatedCart));

                setEditProduct({});
                window.location.reload();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return (
        <div>
            <Form>
                <Modal
                    title="EDIT PRODUCT"
                    centered
                    visible={isFormVisible}
                    onOk={handleOk}
                    onCancel={onCancel}
                        footer={
                        <div onClick={handleOk} className='btn'>
                            Update 
                        </div>
                    }
                >
                    <Form.Item label='Product Name'>
                        <Input
                            name='name'
                            type='text'
                            className='input-byme'
                            value={editProduct.name}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label='Product Price'>
                        <Input
                            name='price'
                            type='number'
                            className='input-byme'
                            value={editProduct.price}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label='Product Color'>
                        <Input
                            name='color'
                            type='text'
                            className='input-byme'
                            value={editProduct.color}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Product Category"
                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Select
                            value={editProduct.category}
                            style={{ width: 200, marginLeft: 10, marginRight: 10 }}
                            onChange={handleCategoryChange}
                            options={storeCategories.map((e) => (
                                    { value: e, label: e }
                            ))}
                        
                        />
                        {/* // options={[
                        //     { value: 'Plastic', label: 'Plastic' },
                        //     { value: 'Steel', label: 'Stainless Steel' },
                        //     { value: 'Glass', label: 'Glass' },
                        //     { value: 'Aluminum', label: 'Aluminum' },
                        //     { value: 'Kid', label: 'Kid' },
                        //  { value: 'disabled', label: 'Disabled', disabled: true },
                        // ]} */}
                    </Form.Item>
                    <Form.Item label='Product Detail'>
                        <Input
                            name='details'
                            type='text'
                            className='input-byme'
                            value={editProduct.details}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label='Product Url'>
                        <Input
                            name='url'
                            type='text'
                            className='input-byme'
                            value={editProduct.url}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                </Modal>
            </Form>
            <Card
                hoverable
                style={{
                    width: 230,
                    maxHeight: 500,
                    display: 'inline-block',
                    marginLeft: 70,
                    padding: 10,
                    marginTop: 20,
                    borderRadius: '0px',
                    fontSize: '10px',
                    position: 'relative',
                }}
                cover={<img width={'100'} height={'200'} alt="" src={editProduct.url != null ? editProduct.url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRS-4chjWMRAmrtz7ivK53K_uygrgjzw9Uw&s'} />}
                actions={[
                    <EditOutlined key="edit" onClick={toggleFormVisibility} />,
                    <DeleteOutlined key="delete" onClick={() => handleRemoveProduct(ProductID)} />
                ]}
            >
                <Meta
                    title={
                        <div style={{ fontFamily: 'SF Pro Display', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100px' }}>
                            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '8px' }}>
                                <span>{editProduct.name}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px' }}>
                                <span>${editProduct.price}</span>
                                <span style={{ color: 'grey' }}>{editProduct.category}</span>
                            </div>
                        </div>
                    }
                    description={
                        <div style={{ height: '50px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {editProduct.details != null ? editProduct.details : '..'}
                        </div>
                    }
                />
            </Card>
        </div>
    );
}
