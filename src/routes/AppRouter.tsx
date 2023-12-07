import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '@/store/auth';
import { SET_TOAST } from '@/store/Toast';
import { IToast } from '@/store/Toast/type';

const PrivateRoute: React.FC<{ path: string, element: React.ReactNode }> = ({ path, element }) => {
    const dispatch = useDispatch();
    const { isAuthorized , auth } = useSelector(authSelector);
    useEffect(() => {
        if (isAuthorized && auth.id) return;
        localStorage.setItem('from', path);
        const toast: IToast = { severity: "warn", detail: "Bu sayfayı görüntülemek için giriş yapmalısınız.", summary: "Uyarı", life: 3000 }
        dispatch(SET_TOAST(toast))
    }, [path]);
    return isAuthorized && auth.id ? (
        <>{element}</>
    ) : (
        <Navigate to="/login" replace />
    );
};

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/shop/:id" Component={Shop} />
            <Route path="/product/:id" Component={ProductDetailPage} /> {/* Updated path */}
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/cart" element={<PrivateRoute path="/cart" element={<Cart />} />} />
            <Route path="/seller" element={<PrivateRoute path="/seller" element={<SellerPage />} />} />
            <Route path="/checkout" Component={CheckoutPage} />
            <Route path="/account/:tab?" element={<PrivateRoute path="/account" element={<Account />} />} />
            <Route path="/admin/*" Component={Admin} />
        </Routes>
    );
};

export default AppRouter;
