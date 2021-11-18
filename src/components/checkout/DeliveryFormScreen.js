import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutSave } from '../../actions/checkout';
import { useForm } from '../../hooks/useForm';
import "./checkout.css";
import validator from 'validator';
import { rutTools } from 'prettyutils';
import Swal from 'sweetalert2';
import { GoBackButton } from '../buttons/GoBackButton';
import useMediaQuery from '../../useMediaQuery';

export const DeliveryFormScreen = ({ history }) => {

    const { uid, currentUser } = useSelector(state => state.auth);
    const checkout = useSelector(state => state.checkout);
    const dispatch = useDispatch();
    const [ formValues, handleInputChange ] = useForm(
        !!uid ? { ...currentUser, deliveryAddress: "" } : checkout
    );
    const { firstName, lastName, rut, email, cellNumber, deliveryAddress } = formValues;
    const web = useMediaQuery("(min-width: 600px)");

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
            Swal.fire("El nombre ingresado no es válido");
        }
        else if (!validator.isMobilePhone(cellNumber))
        {
            Swal.fire(
                "El número de teléfono ingresado no es válido"
            );
        }
        else if (!rutTools.validate(rut))
        {
            Swal.fire("El rut ingresado no es válido");
        }
        else if (deliveryAddress.length < 4)
        {
            Swal.fire("La dirección ingresada no es válida");
        }
        else
        {
            history.push("/confirmation");
            dispatch(checkoutSave(formValues));
        }
    }

    return (
        <div className={ `text-white main-content-${ web ? "web" : "mobile" }` }>
            <GoBackButton />
            <h2 className="text-center">Rellena tus datos</h2>

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

                    <label className="mt-2 ml-2">Número de teléfono <small className="text-muted">(después del +569)</small></label>
                    <br/>
                    <div className="d-flex justify-content-end">
                        <input
                            type="text"
                            autoComplete="off"
                            name="cellNumber"
                            value={ cellNumber }
                            onChange={ handleInputChange }
                            required="required"
                            className="w-100"
                            style={{ borderRadius: "30px" }}
                            placeholder="72160578"
                        >
                        </input>
                        <br/>
                    </div>
                    
                    <label className="mt-2 ml-2">Dirección</label>
                    <br/>
                    <input
                        type="text"
                        autoComplete="off"
                        name="deliveryAddress"
                        value={ deliveryAddress }
                        onChange={ handleInputChange }
                        required="required"
                        className="w-100"
                        style={{ borderRadius: "30px" }}
                        placeholder="Aguas Claras 1573"
                    >
                    </input>
                    <br/>

                    <div className="d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-success mt-4"
                            style={{ borderRadius: "30px" }}
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
