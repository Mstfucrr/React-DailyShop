import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/home';
import Shop from '@/pages/shop';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Cart from '@/pages/Cart';
import Admin from '@/pages/Admin';
import Account from '@/pages/Account';
import ProductDetailPage from '@/pages/productDetail';
import CheckoutPage from '@/pages/Checkout';
import SellerPage from '@/pages/Seller';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/shop/:id" Component={Shop} />
            <Route path="/product/:id" Component={ProductDetailPage} /> {/* Updated path */}
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/cart" Component={Cart} />
            <Route path="/account" Component={Account} />
            <Route path="/checkout" Component={CheckoutPage} />
            <Route path="/seller" Component={SellerPage} />
            <Route path="/admin/*" Component={Admin} />            
        </Routes>
    );
};

export default AppRouter;
