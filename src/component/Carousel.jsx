import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';

const carouselStyle = {
  marginLeft:'10px',
  width: '90vw',
  height: '400px',
  boxShadow: '0px 0px 0.8px #e0dfdc',
  backgroundColor: 'white',
  zIndex: 1,
};

const slideStyle = {
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  padding: '20px',
  boxSizing: 'border-box',
};

const imageStyle = {
  maxHeight: '390px', // Full height of the carousel container
  maxWidth: '390px', // Adjust width to fit half of the carousel container
  objectFit: 'cover',
  borderRadius: '4px',
  magin: '15'
};



const titleStyle = {
  fontSize: '20px', // Adjust font size as needed
  fontWeight: 'bold',
  marginBottom: '10px',
};

const detailsStyle = {
  fontSize: '16px', // Adjust font size as needed
  marginBottom: '10px',
};

const priceStyle = {
  fontSize: '18px', // Adjust font size as needed
  fontWeight: 'bold',
};

const App = () => {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    // Fetch products from local storage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Shuffle the products array and pick the first 4 items
    const shuffledProducts = products.sort(() => 0.5 - Math.random());
    const selectedProducts = shuffledProducts.slice(0, 4);

    setCarouselItems(selectedProducts);
  }, []);

  

  return (
    <Carousel style={carouselStyle} autoplay  >
      {carouselItems.map((product, index) => (
        <div key={index} style={slideStyle}>
          <table border={0}>
            <tr>
              <td>
                <img src={product.imageUrl || 'https://via.placeholder.com/300x300'} style={imageStyle} alt={product.ProductName} />
              </td>
              <td width={"600px"} style={{ textAlign: 'center' }}>
                
                  <div style={titleStyle}>{product.ProductName}</div>
                  <div style={detailsStyle}>{product.ProductDetails}</div>
                  <div style={priceStyle}>${product.ProductPrice}</div>
              
              </td>
            </tr>
          </table>
        </div>
      ))}
    </Carousel>
  );
};

export default App;
