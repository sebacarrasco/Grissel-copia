import React from 'react';
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { HomeScreen } from '../components/home/HomeScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import NavBar from '../components/ui/NavBar';
import { CartModal } from '../components/cart/CartModal';
import { DeliveryFormScreen } from '../components/checkout/DeliveryFormScreen';
import { ConfirmationScreen } from '../components/checkout/ConfirmationScreen';
import { CheckoutCart } from '../components/checkout/CheckoutCart';
import { SearchScreen } from '../components/search/SearchScreen'
import { ProductsByCategoryScreen } from '../components/ui/ProductsByCategoryScreen';
import { CheckoutEndScreen } from "../components/checkout/CheckoutEndScreen";
import { CartSummary } from "../components/checkout/CartSummary";
import  ProfileScreen from '../components/user/ProfileScreen'
import ExploreScreen from '../components/explore/ExploreScreen'
import { useSelector } from 'react-redux';
import { AccountConfirmationScreen } from '../components/auth/AccountConfirmationScreen';

export const ClientRouter = () => {

    const { id, isAdmin } = useSelector(state => state.auth);

    return (
        <>
            <NavBar/>
            <Switch>
                <PublicRoute path="/auth" component={ AuthRouter } isLogged={ !!id && !isAdmin }/>
                <Route exact path="/delivery-form" component={ DeliveryFormScreen } />
                <Route exact path="/confirmation" component={ ConfirmationScreen } />
                <Route exact path="/checkout-end" component={ CheckoutEndScreen } />
                <Route exact path="/checkout-cart" component={ CheckoutCart } />
                <Route exact path="/search" component={ SearchScreen } />
                <Route exact path="/explore" component={ ExploreScreen } />
                <PrivateRoute exact path="/profile" component={ ProfileScreen } isLogged={ !!id && !isAdmin }/>
                <PublicRoute exact path="/account-confirmation" component={ AccountConfirmationScreen } isLogged={ !!id && !isAdmin }/>
                <Route exact path="/category:myKey" component={ ProductsByCategoryScreen } />
                <Route exact path="/cartsummary" component={ CartSummary } />
                <Route exact path="/" component={ HomeScreen } />
                <Redirect to="/" />
            </Switch>
            <CartModal />
        </>
    )
}
