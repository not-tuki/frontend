import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/admin');
        window.location.reload();
      };
    return (
        <div style={{ width: '100%', height: '55.5rem', backgroundColor: 'white', textAlign: 'center', paddingTop: '200px' }}>
            <div>
                <p  style={{ fontFamily: 'SF Pro Display', backgroundColor:'transparent', marginRight: '90%', marginTop: '-100px', color: "grey" }}><img width={'30px'} onClick={handleClick} src='https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/back-256.png'></img></p>
            </div>
            <h1 style={{ fontFamily: 'SF Pro Display', fontSize: '60px', color: "black" }}>HTTP Error 404</h1>
            <h3 style={{ fontFamily: 'SF Pro Display', fontSize: '20px', marginRight: '210px', color: "grey" }}>PRESENT NOT FOUND.</h3>
            <hr style={{ width: '440px', height: '4px', backgroundColor: 'grey', borderRadius: '10px' }} />
        </div>

    )
}