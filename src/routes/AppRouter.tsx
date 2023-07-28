import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/home';
import Shop from '@/pages/shop';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/shop" Component={Shop} />
            {/* <Route path="/checkout" Component={Checkout} />
        <Route path="/contact" Component={Contact} />  */}
        </Routes>
    );
};

export default AppRouter;
