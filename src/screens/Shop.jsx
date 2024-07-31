import React, { useState, useEffect } from 'react';
import '../Styles/component.css';
import { Menu, Layout, Button, Modal, Row, Col, Form, Input, notification, Empty, Space, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ProductTemple from '../component/ProductTemple';
import CarouselCpn from '../component/Carousel';
import bag from '../assets/Images/shopping-bag.png';
import CartJSX from '../component/Cart';

const { Content, Sider } = Layout;

const Product = () => {
    const [filterProduct, setFilterProduct] = useState([]);
    const [isClickOnFilter, setIsClickOnFilter] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selected, setSelected] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderList, setOrderList] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const [searchProduct, setSearchProduct] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [addressPhone, setAddressPhone] = useState('');
    const pageSize = 12;

    useEffect(() => {
        let filtered = searchProduct;

        if (searchTerm) {
            filtered = filtered.filter(product => product.ProductPrice.toString().includes(searchTerm) || product.ProductName.toString().includes(searchTerm));
        }
        setFilterProduct(filtered);
    }, [searchProduct, searchTerm]);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const storedOrders = JSON.parse(localStorage.getItem('orderList')) || [];
        setSearchProduct(storedProducts);
        setProducts(storedProducts);
        setCategories(storedCategories);
        setCartItems(storedCart);
        setOrderList(storedOrders);
    }, []);

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedItems, cartItems]);

    const handleClick = (e) => {
        const itemArray = JSON.parse(localStorage.getItem('products')) || [];
        const filteredItems = itemArray.filter(item => item.Category === e.key);
        setFilterProduct(filteredItems);
        setIsClickOnFilter(true);
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setIsClickOnFilter(true);
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        createOrder();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleRemoveFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item.ProductID !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setSelectedItems(selectedItems.filter(id => id !== productId));
    };

    const handleSelectItem = (productId, isSelected) => {
        setSelectedItems(prev => {
            const updatedSelectedItems = isSelected ? [...prev, productId] : prev.filter(id => id !== productId);
            setSelected(updatedSelectedItems.length > 0);
            return updatedSelectedItems;
        });
    };

    const handleRemoveSelected = () => {
        Modal.confirm({
            title: 'Confirm Deletion',
            content: 'Are you sure you want to remove this product from your cart?',
            onOk: () => {
                const updatedCart = cartItems.filter(item => !selectedItems.includes(item.ProductID));
                setCartItems(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                setSelectedItems([]);
                setSelected(false);
            },
        });
    };

    const handleRemoveAtOrder = () => {
        const updatedCart = cartItems.filter(item => !selectedItems.includes(item.ProductID));
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setSelectedItems([]);
        setSelected(false);
    };

    const calculateTotalPrice = () => {
        const total = selectedItems.reduce((sum, productId) => {
            const item = cartItems.find(item => item.ProductID === productId);
            return sum + (item ? item.ProductPrice * item.quantity : 0);
        }, 0);
        setTotalPrice(total);
    };

    const createOrder = () => {
        if (!addressPhone || !cardNumber || !cardName || !cardCvv) {
            api.warning({
                message: 'Please fill in all the required information to proceed with the payment!',
            });
        } else {
            if (selectedItems.length > 0) {
                const newOrder = {
                    id: orderList.length,
                    items: selectedItems.map(productId => {
                        const item = cartItems.find(item => item.ProductID === productId);
                        return {
                            ProductID: item.ProductID,
                            ProductName: item.ProductName,
                            ProductPrice: item.ProductPrice,
                            ProductCategory: item.Category,
                            Color: item.Color,
                            imageUrl: item.imageUrl,
                            quantity: item.quantity,
                        };
                    }),
                    total: totalPrice,
                    date: new Date().toLocaleString(),
                    ship: false,
                    Address: addressPhone,
                };
                const updatedOrderList = [...orderList, newOrder];
                setOrderList(updatedOrderList);
                localStorage.setItem('orderList', JSON.stringify(updatedOrderList));
                handleRemoveAtOrder();
                setIsModalVisible(false);
            } else {
                api.info({
                    message: 'No item to checkout!',
                    showProgress: true,
                });
            }
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedProducts = isClickOnFilter
        ? filterProduct.slice(startIndex, endIndex)
        : products.slice(startIndex, endIndex);

    const categoryItems = [
        {
            key: 'categories',
            label: 'Categories',
            children: categories.map(category => ({ key: category, label: category })),
        },
    ];

    return (
        <>
            {contextHolder}
            <CarouselCpn />
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    style={{
                        backgroundColor: 'transparent',
                        paddingTop: 40,
                    }}
                >
                    <Space style={{ borderBottom: '1px solid grey' }}>
                        <Input
                            style={{ textAlign: 'left', width: '160px' }}
                            className="custom-input"
                            placeholder='Search'
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <SearchOutlined />
                    </Space>
                    <Menu
                        theme="black"
                        onClick={handleClick}
                        style={{ backgroundColor: 'transparent', textAlign: 'center', width: '150px', color: 'black', fontSize: '13px' }}
                        mode="inline"
                        defaultSelectedKeys={['categories']}
                        items={categoryItems}
                    />
                </Sider>
                <Content
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: 20,
                        width: '60vw',
                    }}
                >
                    <div style={{display:'flex'
                        ,
                        flexWrap:'wrap',
                        justifyContent:'start',
                        gap:'90px'

                    }}>
                        {displayedProducts.length === 0 ? (
                            <div
                                style={{
                                    width: '100%',
                                    height: '40rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            </div>
                        ) : (
                            displayedProducts.map((product) => (
                                <ProductTemple
                                    key={product.id}
                                    ProductID={product.id}
                                    ProductName={product.ProductName}
                                    ProductPrice={product.ProductPrice}
                                    ProductDetails={product.ProductDetails}
                                    Category={product.Category}
                                    Color={product.Color}
                                    imageUrl={product.imageUrl}
                                    cartItems={cartItems}
                                    setCartItems={setCartItems}
                                />
                            ))
                        )}
                    </div>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={isClickOnFilter ? filterProduct.length : products.length}
                        onChange={handlePageChange}
                        style={{ marginTop: '10px', alignSelf: 'center'}}
                    />
                </Content>


                <div onClick={showModal} className="containerbag">
                    <img src={bag} alt="Bag" />
                    <div className="centered-text">{cartItems.length}</div>
                </div>

                <Modal
                    title="CART"
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        selected ? (
                            <Button
                                key="remove"
                                danger
                                onClick={handleRemoveSelected}
                            >
                                Remove
                            </Button>
                        ) : null,
                        <div className='custom-ok-button' key="checkout" onClick={createOrder}>
                            Checkout
                        </div>,
                    ]}
                    width={800}
                >
                    <Row gutter={[16, 16]}>
                        <Col span={16}>
                            <div className='scrollbar'>
                                {cartItems.map((product) => (
                                    <CartJSX
                                        ProductID={product.ProductID}
                                        ProductName={product.ProductName}
                                        ProductPrice={product.ProductPrice}
                                        Category={product.Category}
                                        imageUrl={product.imageUrl}
                                        Color={product.Color}
                                        initialQuantity={product.quantity}
                                        isSelected={selectedItems.includes(product.ProductID)}
                                        onRemove={handleRemoveFromCart}
                                        onSelect={handleSelectItem}
                                        onQuantityChange={(id, newQuantity) => {
                                            const updatedCart = cartItems.map(item =>
                                                item.ProductID === id ? { ...item, quantity: newQuantity } : item
                                            );
                                            setCartItems(updatedCart);
                                            localStorage.setItem('cart', JSON.stringify(updatedCart));
                                        }}
                                    />
                                ))}
                            </div>
                        </Col>
                        <Col span={8} style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            <div style={{ paddingRight: '15px' }}>
                                <h2>Payment Section</h2>
                                <Form layout="vertical">
                                    <Form.Item label="Card Number">
                                        <Input type='number' onChange={(e) => setCardNumber(e.target.value)} placeholder="Enter your card number" maxLength={16} required />
                                    </Form.Item>
                                    <Form.Item label="Card Holder Name">
                                        <Input onChange={(e) => setCardName(e.target.value)} placeholder="Enter card holder name" required />
                                    </Form.Item>
                                    <Form.Item label="CVV">
                                        <Input onChange={(e) => setCardCvv(e.target.value)} type='number' placeholder="Enter CVV" required />
                                    </Form.Item>
                                    <Form.Item label="Address & Phone Number">
                                        <Input onChange={(e) => setAddressPhone(e.target.value)} placeholder="Provide, Phone Number" required />
                                    </Form.Item>
                                </Form>
                                <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
                            </div>
                        </Col>
                    </Row>
                </Modal>
            </Layout>
        </>
    );
};

export default Product;
