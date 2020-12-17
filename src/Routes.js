import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminDashBoard from './user/AdminDashBoard';
import UserDashBoard from './user/UserDashBoard';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import Cart from './core/Cart';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
                <Route path="/cart" component={Cart} />
                <AdminRoute path="/admin/dashboard" component={AdminDashBoard} />
                <AdminRoute path="/admin/create/category" component={AddCategory} />
                <AdminRoute path="/admin/categories" component={ManageCategories} />
                {/*  */}
                <AdminRoute path="/admin/create/product" component={AddProduct} />
                <AdminRoute path="/admin/products" component={ManageProducts} />
                <AdminRoute path="/admin/product/update/:productId" component={UpdateProduct} />
                <AdminRoute path="/admin/category/update/:categoryId" component={UpdateCategory} />
                <PrivateRoute path="/user/dashboard" component={UserDashBoard} />

            </Switch>
        </BrowserRouter>
    )
};

export default Routes;