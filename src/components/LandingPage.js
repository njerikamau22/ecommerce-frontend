// LandingPage.js

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Carousel } from 'react-responsive-carousel';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Modal from './Modal';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery)
  );

  const openRegistrationForm = () => {
    setShowRegistrationForm(true);
  };

  const closeRegistrationForm = () => {
    setShowRegistrationForm(false);
  };

  const openLoginForm = () => {
    setShowLoginForm(true);
  };

  const closeLoginForm = () => {
    setShowLoginForm(false);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="landing-page">
      <header className="header">
        <h1>My E-Commerce</h1>
        <div className="search-bar">
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="auth-cart">
          {currentUser ? (
            <>
              <span>Welcome, {currentUser.username}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="login" onClick={openLoginForm}>Login</button>
              <button className="register" onClick={openRegistrationForm}>Register</button>
            </>
          )}
          <div className="cart">
            <span role="img" aria-label="cart">🛒</span>
          </div>
        </div>
      </header>

      <Carousel showThumbs={false} autoPlay infiniteLoop className="carousel">
        <div>
          <img src="https://thumbs.dreamstime.com/b/instagram-post-carousel-templates-banner-internet-application-screen-smartphone-device-design-background-social-279149608.jpg" alt="Advert 1" />
        </div>
        <div>
          <img src="https://stewartsautogroup.com/wp-content/uploads/2019/05/Deals-On-Deals-Carousel-Banner.jpg" alt="Advert 2" />
        </div>
        <div>
          <img src="https://img.freepik.com/free-vector/instagram-carousel-templates_23-2148793986.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1717804800&semt=ais_user" alt="Advert 3" />
        </div>
      </Carousel>

      <main>
        <h1>Featured Products</h1>
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <p>In Stock: {product.unitsInStock}</p>
                <button>Add to Cart</button>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </main>

      {showRegistrationForm && (
        <Modal onClose={closeRegistrationForm}>
          <RegistrationForm onClose={closeRegistrationForm} />
        </Modal>
      )}

      {showLoginForm && (
        <Modal onClose={closeLoginForm}>
          <LoginForm onClose={closeLoginForm} onLogin={handleLogin} />
        </Modal>
      )}
    </div>
  );
};

export default LandingPage;
