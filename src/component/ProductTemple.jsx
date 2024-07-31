import React, { useState } from 'react';
import { Card, Modal, Form } from 'antd';
import "../Styles/component.css";

const { Meta } = Card;

export default function ProductTemple(props) {
    const { ProductID, ProductName, ProductPrice, Color, ProductDetails, imageUrl, cartItems, setCartItems, Category } = props;
    const [value, setValue] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const showModal = () => {
        setSelectedProduct({
            ProductID,
            ProductName,
            ProductPrice,
            Color,
            ProductDetails,
            imageUrl,
            Category
        });
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        addtocard()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const addtocard = () => {
        let dataincart = localStorage.getItem('cart');
        let cartItemsArray = dataincart ? JSON.parse(dataincart) : [];

        let samedata = cartItemsArray.find(item => item.ProductID === ProductID);

        if (samedata) {
            samedata.quantity += 1;
        } else {
            const newItem = {
                ProductID: ProductID,
                ProductName: ProductName,
                ProductPrice: ProductPrice,
                Color: Color,
                Category: Category,
                imageUrl: imageUrl,
                quantity: 1
            };
            cartItemsArray.push(newItem);
        }

        setCartItems(cartItemsArray);
        localStorage.setItem('cart', JSON.stringify(cartItemsArray));
    };

    const increment = () => {
        setValue(value + 1);
    };

    const decrement = () => {
        if (value > 0) setValue(value - 1);
    };
    
    return (
        <>
            <Form style={{}}>
                <Modal
                    centered
                    open={isModalOpen}
                    onCancel={handleCancel}
                    onOk={handleOk}
                    width={800}
                    okText="ADD TO CART"
                    okButtonProps={{ className: 'custom-ok-button-card' }}
                    cancelButtonProps={{ className: 'custom-ok-button-card' }}
                    okType='none'
                    
                >
                    {selectedProduct && (
                        <div className='product-details'>
                            <table border={0} width={'100%'} height={'400px'}>
                                <tbody>
                                    <tr>
                                        <td style={{ width: '60%' }}>
                                            <h2>{selectedProduct.ProductName}</h2>
                                            <img
                                                width={'50%'}
                                                height={'auto'}
                                                alt=""
                                                src={selectedProduct.imageUrl}
                                            />
                                        </td>
                                        <td style={{ width: '30%' }}>
                                            <div className='box-details'>
                                                <h2 style={{ borderBottom: '1px solid black', width: '200px' }}>${selectedProduct.ProductPrice} - {selectedProduct.Category}</h2>
                                                <p><strong>Color:</strong> <b style={{fontFamily:'arial black'}}>{selectedProduct.Color}</b></p>
                                                <p><strong>Details:</strong> {selectedProduct.ProductDetails}</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </Modal>
                <Card className='product-card'
                    hoverable
                    style={{
                        width: 230,
                        maxHeight: 400,
                        marginTop: 20,
                        paddingTop: 0,
                        borderRadius: '0px',
                        backgroundColor: 'white',
                        fontSize: '8px',
                        position: 'relative', // Make sure to position the card relative
                    }}
                    cover={<img width={'210px'} onClick={showModal} style={{ borderRadius: '0px' }} height={'200px'} alt="" src={imageUrl != null ? imageUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRS-4chjWMRAmrtz7ivK53K_uygrgjzw9Uw&s'} />}
                >
                    <Meta
                        title={
                            <div style={{ fontFamily: 'SF Pro Display' }}>
                                <table width="100%">
                                    <tbody>
                                        <tr>
                                            <td style={{ textAlign: 'left', fontSize: '8px' }}  >{ProductName}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'left', fontSize: '8px' }}>$ {ProductPrice} - {Category}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        }
                    />
                    <div className='toggle-button' onClick={addtocard}>Add To Cart</div>
                </Card>
            </Form>
        </>
    );
}
