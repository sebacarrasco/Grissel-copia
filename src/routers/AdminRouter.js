import React from 'react';
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

import NavBarAdmin from '../components/ui/NavBarAdmin';
import { AdminProductScreen } from '../components/admin/adminProduct/AdminProductScreen';
import { AdminSaleScreen } from '../components/admin/adminSale/AdminSaleScreen';
import { AdminSelectScreen } from '../components/admin/adminSale/AdminSelectScreen';
import { AdminPackSelectScreen } from '../components/admin/adminPack/AdminPackSelectScreen';
import { AdminPackScreen } from '../components/admin/adminPack/AdminPackScreen';
import { DashboardScreen } from '../components/admin/dashboard/DashboardScreen';
import { AdminSupplierScreen } from '../components/admin/adminSupplier/AdminSupplierScreen';

export const AdminRouter = () => {
    return (
        <>
            <NavBarAdmin/>  
            <Switch>
                <Route exact path="/admin/dashboard" component={ DashboardScreen } />
                <Route exact path="/admin/products" component={ AdminProductScreen } />
                <Route exact path="/admin/sales" component={ AdminSaleScreen } />
                <Route exact path="/admin/select" component={ AdminSelectScreen } />
                <Route exact path="/admin/create-packs" component={ AdminPackSelectScreen } />
                {/* <Route exact path="/admin/packs" component={ AdminPackScreen } /> */}
                <Route exact path="/admin/suppliers" component={ AdminSupplierScreen } />
                <Redirect to="/admin/dashboard" />
            </Switch>
        </>
    )
}
