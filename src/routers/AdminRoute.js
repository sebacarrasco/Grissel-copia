import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const AdminRoute = ({
    isAdmin,
    component: Component,
    ...rest
// rest son el resto de las props (exact, path, entre otros posibles)
}) => {


    return (
        <Route { ...rest }
            component={ props => (
                ( isAdmin ) ? <Component { ...props }/>
                : <Redirect to="/admin/login"/>
            )}

        />
    )
}

AdminRoute.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}