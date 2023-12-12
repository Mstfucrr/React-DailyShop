import React, { useCallback, useEffect } from 'react';
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
import AboutUsPage from '@/pages/AboutUs';
import { Helmet } from 'react-helmet';

const PrivateRoute: React.FC<{ path: string, element: React.ReactNode }> = ({ path, element }) => {
    const dispatch = useDispatch();
    const { isAuthorized, auth } = useSelector(authSelector);
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
    const TopLevelHelmet = useCallback((title: string) => {
        return <Helmet>
            <title>{title}</title>
        </Helmet>
    }, [])
    
    return (
        <Routes>
            <Route path="/"
                element={<>{TopLevelHelmet("Anasayfa")}<Home /></>} />
                
            <Route path="/shop/:id"
                element={<>{TopLevelHelmet("Mağaza")}<Shop /></>} />
                
            <Route path="/product/:id"
                element={<>{TopLevelHelmet("Ürün Detayı")}<ProductDetailPage /></>} />
                
            <Route path="/login"
                element={<>{TopLevelHelmet("Giriş Yap")}<Login /></>} />
                
            <Route path="/register"
                element={<>{TopLevelHelmet("Kayıt Ol")}<Register /></>} />
                
            <Route path="/about"
                element={<>{TopLevelHelmet("Hakkımızda")}<AboutUsPage /></>} />
                
            <Route path="/cart" element={
                <>{TopLevelHelmet("Sepetim")}<PrivateRoute path="/cart" element={<Cart />} /></>} />

            <Route path="/seller" element={
                <>{TopLevelHelmet("Satıcı Paneli")}<PrivateRoute path="/seller" element={<SellerPage />} /></>} />

            <Route path="/checkout" element={
                <>{TopLevelHelmet("Ödeme Yap")}<PrivateRoute path="/checkout" element={<CheckoutPage />} /></>} />

            <Route path="/account/:tab?" element={
                <>{TopLevelHelmet("Hesabım")}<PrivateRoute path="/account" element={<Account />} /></>} />

            <Route path="/admin/*" element={
                <>{TopLevelHelmet("Admin Paneli")}<PrivateRoute path="/admin" element={<Admin />} /></>} />
        </Routes>
    );
};

export default AppRouter;
