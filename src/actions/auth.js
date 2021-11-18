import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import api from '../api';
import { types } from '../types/types';

export const startLogin = (email, password) => {
    return async(dispatch) => {

        try {
            const { data } = await api.post("login/user", {
                email,
                password
            });
            dispatch(login(data.token));
            const { userObject } = jwtDecode(data.token);
            Swal.fire({
                text: `Hola de nuevo ${ userObject.firstName }`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        catch (e) {
            if (e.message.includes(401) || e.message.includes(404))
            {
                Swal.fire("El email y/o contraseña son inválidos");
            }
            else
            {
                Swal.fire("Ha ocurrido un error, por favor vuelve a intentarlo");
            }
        }
    }
}

export const login = (token) => {
    return (dispatch) => {
        const { isAdmin } = jwtDecode(token);
        if (!isAdmin)
        {
            dispatch(userLogin(token));
        }
        else
        {
            dispatch(adminLogin(token));
        }
    }
};

export const userLogin = (token) => {
    const { id, exp, userObject } = jwtDecode(token);
    return {
        type: types.login,
        payload: {
            id,
            currentUser: userObject,
            expDate: exp,
            token
        }
    }
}

export const logout = () => ({
    type: types.logout
});

export const startAdminLogin = (email, password) => {
    return async(dispatch) => {

        try {
            const { data } = await api.post("login/admin", {
                email,
                password
            });
            dispatch(adminLogin(data.token));
            Swal.fire({
                text: `Hola de nuevo!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        catch (e) {
            if (e.message.includes(401) || e.message.includes(404))
            {
                Swal.fire("El email y/o contraseña son inválidos");
            }
            else
            {
                Swal.fire("Ha ocurrido un error, por favor vuelve a intentarlo");
            }
        }
    }
}

export const adminLogin = (token) => {
    const { id, exp, isAdmin, email } = jwtDecode(token);
    return {
        type: types.login,
        payload: {
            id,
            email,
            isAdmin,
            expDate: exp,
            token
        }
    }
};