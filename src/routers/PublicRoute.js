import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';



// Estas rutas son solo para usuarios NO loggeados
export const PublicRoute = ({
    isLogged,
    component: Component,
    ...rest
// rest son el resto de las props (exact, path, entre otros posibles)
}) => {
    return (
        <Route { ...rest }

            // Sí, al hacer component={algo} se puede poner props=>algo
            // así como con el setState(prevState => algo)
            component={ props => (
                ( !isLogged ) ? <Component { ...props }/>
                : <Redirect to="/"/>
            )}

        />
    )
}



PublicRoute.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}