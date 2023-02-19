import React from 'react';
import { Routes, Route } from "react-router-dom"
import styles from './App.module.css';

import Cart from './pages/cart';
import Header from './components/header/index';
import Home from './pages/home';
import NotFound from './pages/notFound';
import AboutDish from './pages/aboutDish/index';
import Footer from './components/footer';
import Authorization from './pages/authorization';
import SignUpPage from './pages/signUp';

function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <div className={styles.container}>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='*' element={<NotFound />}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/dishes/:id' element={<AboutDish />}/>
            <Route path='/log_in' element={<Authorization />}/>
            <Route path='/sign_up' element={<SignUpPage />}/>
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
