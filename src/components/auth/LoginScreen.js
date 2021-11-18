import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import useMediaQuery from '../../useMediaQuery';
import { GoBackButton } from '../buttons/GoBackButton';
import validator from 'validator';
import Swal from 'sweetalert2';
import "./auth.css";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";

export const LoginScreen = ({ startLoginAction, mode }) => {

    const { isAdmin } = useSelector(state => state.auth);

    const web = useMediaQuery("(min-width: 600px)");

    const [ formValues, handleInputChange ] = useForm({
        email: "",
        password: ""
    });
    const { email, password } = formValues;
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validator.isEmail(email) || password.length < 6)
        {
            Swal.fire("No se pudo iniciar sesión con los datos ingresados");
        }
        else
        {
            dispatch(startLoginAction(email, password));
        }
    }

    if (mode === "admin" && !!isAdmin)
    {
        return <Redirect to="/admin"/>
    }

    return (
        <div>
            <div className={ `text-white ${ web ? "screen-web" : "screen-mobile" }`}>
            { web ? <GoBackButton /> : null }
            <h2 className="text-center">Entra a tu cuenta { mode === "admin" ? "de administrador" : "" } </h2>

            <form onSubmit={ handleSubmit }>
                <div className="px-3">

                    <label className="mt-2 ml-2">Correo electrónico</label>
                    <br/>
                    <input
                        type="text"
                        autoComplete="off"
                        name="email"
                        value={ email }
                        onChange={ handleInputChange }
                        required="required"
                        className="w-100 mb-2"
                        style={{ borderRadius: "30px" }}
                        placeholder="jessica@gmail.com"
                    >
                    </input>
                    <br/>

                    <label className="mt-2 ml-2">Contraseña</label>
                    <br/>
                    <input
                        type="password"
                        autoComplete="off"
                        name="password"
                        value={ password }
                        onChange={ handleInputChange }
                        required="required"
                        className="w-100"
                        style={{ borderRadius: "30px" }}
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    >
                    </input>
                    <br/>

                    <div className="d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-success mt-4 px-5"
                            style={{ borderRadius: "30px" }}
                        >
                            Entrar
                        </button>
                    </div>

                    {
                        mode === "user"
                        ?
                        <p className="mt-5 px-3 text-center">
                            No tienes una cuenta? {" "}
                            <Link to="/auth/register" className="link-info">Crea una aquí</Link>
                        </p>
                        :
                        null
                    }

                </div>
            </form>
        </div>
        </div>
    )
}
