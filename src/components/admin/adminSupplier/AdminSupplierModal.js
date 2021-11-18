import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { closeAdminSupplierModal } from '../../../actions/ui';
import "../AdminModal.css";
import validator from 'validator';
import { useForm } from '../../../hooks/useForm';
import api from '../../../api';
import { cleanCart } from '../../../actions/cart';

const initFormState = {
    "name":"",
    "email":"",
    "phone":"",
    "address":""
}

export const AdminSupplierModal = () => {

    const { adminSupplierModalOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    const [ formValues, handleInputChange ] = useForm(initFormState);
    var { name, email, phone, address } = formValues;
    const { token } = useSelector(state => state.auth);
    
    useEffect(() => {
    },);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validator.isEmail(email))
        {
            Swal.fire("El email ingresado no es válido");
        }
        else if (name.length < 2)
        {
            Swal.fire("El nombre ingresado no es válido");
        }
        else if (!validator.isMobilePhone(phone))
        {
            Swal.fire(
                "El número de teléfono ingresado no es válido"
            );
        }
        else if (address.length < 4)
        {
            Swal.fire("La dirección ingresada no es válida");
        }
        else
        {
            phone = "+569" + phone;
            api.post("suppliers", {
                name,
                email, 
                phone, 
                address,
            }, {headers: { 'Authorization': `Bearer ${token}` }},)
            .then(response => {
                Swal.fire("Proveedor registardo");
                closeModal();
                dispatch(cleanCart());
            })
            .catch(e => {
                console.log(e);
                console.log(e.response);
                if (e.response)
                {
                    Swal.fire(e.response.data.message, e.response.data.detail);
                }
                else{
                    Swal.fire("Se ha producido un error, por favor vuelve a intentarlo");
                }
            });
        }
    }

    
    const closeModal = () => {
        dispatch(closeAdminSupplierModal());
        Object.keys(initFormState).forEach(key => {
            handleInputChange({
                target:
                {
                    name: key,
                    value: initFormState[key]
                }
            });
        });
    }

    return (
        <Modal show={adminSupplierModalOpen} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Creación de proveedor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="admin-modal-content">
                <form onSubmit={ handleSubmit }>
                    <div
                        style={{display: "flex", flexDirection: "column"}}
                        className="ml-3"
                    >
                        {
                            <>
                                <label>Nombre </label>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    name="name"
                                    value={ name }
                                    onChange={ handleInputChange }
                                    required="required"
                                    className="w-50"
                                    placeholder="Jessica Proveedora"
                                >
                                </input>
                                <br/>
                                <label>Email </label>
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
                                ></input>
                                <br/>
                                <label className="mt-2 ml-2">Número de teléfono <small className="text-muted">(después del +569)</small></label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    name="phone"
                                    value={ phone }
                                    onChange={ handleInputChange }
                                    required="required"
                                    className="w-100"
                                    style={{ borderRadius: "30px" }}
                                    placeholder="72160578"
                                ></input>
                                <br/>
                                <label>Dirección </label>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    value={ address }
                                    name="address"
                                    onChange={ handleInputChange }
                                    required="required"
                                    className="w-100"
                                    placeholder="Aguas Claras 2598"
                                ></input>
                                <br/>
                            </>
                         }
                     </div>
                     <br/>
                </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <div className="mt-3 ml-3">
                {
                    <>
                    <button
                    onClick={handleSubmit}
                    className="btn btn-success mr-2"
                    >
                    Guardar cambios
                    </button>
                    </>
                }
            </div>          
            </Modal.Footer>
        </Modal>
    )
}