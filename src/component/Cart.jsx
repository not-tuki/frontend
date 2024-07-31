    import React, { useState } from 'react';
    import { Avatar, Button, Checkbox, List } from 'antd';
    import './Cart.css';

    const CartJSX = ({ ProductID, ProductName, ProductPrice, imageUrl,Category,Color, initialQuantity, isSelected, onRemove, onSelect, onQuantityChange }) => {
        const [quantity, setQuantity] = useState(initialQuantity);

        const handleRemove = () => {
            onRemove(ProductID);
        };

        const handleSelect = (e) => {
            onSelect(ProductID, e.target.checked);
        };

        const handleQuantityChange = (change) => {
            const newQuantity = quantity + change;
            if (newQuantity >= 0) {
                setQuantity(newQuantity);
                onQuantityChange(ProductID, newQuantity);
            }
        };

        return (

            <div className="card-list-body">
                <img src={imageUrl} className="card-list-img" alt="" />
                <Checkbox className='card-checkbox' checked={isSelected} onChange={handleSelect} />
                <h4>{ProductName}</h4>
                <hr />
                <div className="card-list-add-minu-body">
                    <p>Price : ${ProductPrice} - {Category} - {Color}</p>
                    <div className="plus-items-minu">
                        <Button
                            className="plus-btn"
                            onClick={() => {
                                handleQuantityChange(1)
                            }}
                        >
                            +
                        </Button>
                        <span className="num-of-items">{initialQuantity}</span>
                        <Button
                            className="minu-btn"
                            onClick={() => {
                                handleQuantityChange(-1)
                            }}
                        >
                            -
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    export default CartJSX;