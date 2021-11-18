import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { logout, startAdminLogin } from "../actions/auth";
import { LoginScreen } from "../components/auth/LoginScreen";
import {AdminRoute} from "./AdminRoute"
import {AdminRouter} from "./AdminRouter"
import {ClientRouter} from "./ClientRouter"

export const AppRouter = () => {

    const { id, expDate,  token, isAdmin } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        // if (token)
        // {
        //     dispatch(login(token));
        // }
        if (id && expDate && token)
        {
            const remainingTime = new Date(expDate * 1000).getTime() - new Date().getTime();
            if (remainingTime <= 0)
            {
                dispatch(logout());
            }
            else
            {
                setTimeout(() => dispatch(logout()), remainingTime);
            }
        }
        else
        {
            dispatch(logout());
        }
    }, [expDate, id, token, dispatch]);

    return (
        <div>
            <Router>

                <div>
                    <Switch>
                        <Route
                            exact
                            path="/admin/login"
                            render={
                                props => (<LoginScreen { ...props } startLoginAction={ startAdminLogin } mode="admin" />)
                            }
                        />
                        <AdminRoute path="/admin" component={ AdminRouter } isAdmin={ !!isAdmin }/>
                        <Route path="/" component={ ClientRouter } />
                        <Redirect to="/" />
                    </Switch>
                </div>

            </Router>
        </div>
    )
}
