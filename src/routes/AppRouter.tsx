import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/home';
import Shop from '@/pages/shop';
import Login from '@/pages/login';
import Register from '@/pages/register';
import Cart from '@/pages/cart';
import Admin from '@/pages/admin';
import Account from '@/pages/Account';
import ProductDetailPage from '@/pages/productDetail';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/shop" Component={Shop} />
            <Route path="/productDetail/:id" Component={ProductDetailPage} /> {/* Updated path */}
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/cart" Component={Cart} />
            <Route path="/admin" Component={Admin} />
            <Route path="/account" Component={Account} />
            {/* <Route path="/checkout" Component={Checkout} />
        <Route path="/contact" Component={Contact} />  */}
        </Routes>
    );
};

export default AppRouter;
