import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import useMediaQuery from '../../useMediaQuery';
import { GoBackButton } from '../buttons/GoBackButton';
import validator from 'validator';
import Swal from 'sweetalert2';
import "./auth.css";
import { rutTools } from 'prettyutils';
import API from '../../api';

export const RegisterScreen = ({ history }) => {

    const web = useMediaQuery("(min-width: 600px)");

    const [ formValues, handleInputChange ] = useForm({
        firstName: "",
        lastName: "",
        rut: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    });

    const {
        firstName,
        lastName,
        rut,
        email,
        password,
        passwordConfirmation
    } = formValues;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validator.isEmail(email))
        {
            Swal.fire("El email ingresado no es válido");
        }
        else if (firstName.length < 2)
        {
            Swal.fire("El nombre ingresado no es válido");
        }
        else if (lastName.length < 2)
        {
            Swal.fire("El apellido ingresado no es válido");
        }
        else if (!rutTools.validate(rut))
        {
            Swal.fire("El rut ingresado no es válido");
        }
        else if (password.length < 6)
        {
            Swal.fire("La contraseña debe ser de al menos 6 caracteres");
        }
        else if (password !== passwordConfirmation)
        {
            Swal.fire("Las contraseñas deben ser iguales");
        }
        else
        {
            API.post("users", formValues)
            .then(response => {
                Swal.fire("Solo falta un paso", "Debes hacer click en el link del email que te acabamos de enviar");
                // history.push("/login");
            })
            .catch(e => {
                if (e.message.includes(400))
                {
                    Swal.fire("Ya existe una cuenta asociada a ese correo electrónico o rut");
                }
                else
                {
                    Swal.fire("Ha ocurrido un error, por favor vuelve a intentarlo");
                }
            });
        }
    }

    return (
        <div>
            <div className={ `text-white ${ web ? "screen-web" : "screen-mobile" }`}>
            { web ? <GoBackButton /> : null }
            <h2 className="text-center">Crea tu cuenta</h2>

            <form onSubmit={ handleSubmit }>
                <div className="px-3">

                <label className="mt-2 ml-2">Nombre</label>
                    <br/>
                    <input
                        type="text"
                        autoComplete="off"
                        name="firstName"
                        value={ firstName }
                        onChange={ handleInputChange }
                        required="required"
                        className="w-100"
                        style={{ borderRadius: "30px" }}
                        placeholder="Jessica"
                    >
                    </input>
                    <br/>

                    <label className="mt-2 ml-2">Apellido</label>
                    <br/>
                    <input
                        type="text"
                        autoComplete="off"
                        name="lastName"
                        value={ lastName }
                        onChange={ handleInputChange }
                        required="required"
                        className="w-100"
                        style={{ borderRadius: "30px" }}
                        placeholder="Graham"
                    >
                    </input>
                    <br/>

                    <label className="mt-2 ml-2">Rut</label>
                    <br/>
                    <input
                        type="text"
                        autoComplete="off"
                        name="rut"
                        value={ rut }
                        onChange={ handleInputChange }
                        required="required"
                        className="w-100"
                        style={{ borderRadius: "30px" }}
                        placeholder="21.200.425-5"
                    >
                    </input>
                    <br/>

                    <label className="mt-2 ml-2">Email</label>
                    <br/>
                    <input
                        type="text"
                        autoComplete="off"
                        name="email"
                        value={ email }
                        onChange={ handleInputChange }
                        required="required"
                        className="w-100"
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

                    <label className="mt-2 ml-2">Contraseña</label>
                    <br/>
                    <input
                        type="password"
                        autoComplete="off"
                        name="passwordConfirmation"
                        value={ passwordConfirmation }
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
                            Crear
                        </button>
                    </div>

                    <p className="mt-3 px-3 text-center">
                        Ya tienes una cuenta? {" "}
                        <Link to="/auth/login" className="link-info">Entra aquí</Link>
                    </p>

                </div>
            </form>
        </div>
        </div>
    )
}
