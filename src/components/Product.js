// src/components/Product.js

import React from 'react';

const Product = ({ product }) => {
  return (
    <div className="product">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Ksh. {product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default Product;
