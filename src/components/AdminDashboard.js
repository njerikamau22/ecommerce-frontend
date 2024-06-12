// src/components/AdminDashboard.js

import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), product);
      alert('Product added successfully');
      setProduct({
        name: '',
        description: '',
        price: '',
        imageUrl: ''
      });
    } catch (error) {
      console.error('Error adding product: ', error);
      alert('Error adding product');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description</label>
          <input type="text" name="description" value={product.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Price</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Image URL</label>
          <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} required />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
