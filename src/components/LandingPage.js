// src/components/LandingPage.js

import React from 'react';
import products from '../data/products';
import Product from './Product';
import '../styles/LandingPage.css'; // Import your custom CSS for landing page

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Thea.co</h1>
      <div className="product-list">
        {products.map((product, index) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
