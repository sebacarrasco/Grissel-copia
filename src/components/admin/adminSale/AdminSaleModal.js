import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { adminSaleUnselect } from '../../../actions/admin';
import { closeAdminSaleModal } from '../../../actions/ui';
import { adminRequests } from '../../../helpers/adminRequests';
import "../AdminModal.css";
import Select from "react-select";
import Modal from 'react-bootstrap/Modal'

const initFormState = {
    state: "COMPLETADA",
    firstName: "",
    lastName: "",
    rut: "",
    email: "",
    cellNumber: "",
}

export const AdminSaleModal = ({ updateDeal }) => {

    const { adminSaleModalOpen } = useSelector(state => state.ui);
    const { saleSelected, mode } = useSelector(state => state.adminSale);
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState(initFormState);
    const [newState, setState] = useState([{value:formValues.state, label:formValues.state}]);
    const options = [
        {value:"CANCELADA",label: "CANCELADA"},
        {value:"COMPLETADA",label: "COMPLETADA"},
    ];
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        if (saleSelected)
        {
            setFormValues(saleSelected);
            setState([{value:saleSelected.state,label:saleSelected.state}]);
        }
        else
        {
            setFormValues(initFormState);
        }
    }, [saleSelected, setFormValues]);

    const handleInputChange = ( event ) => {
        setState(event);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newState.length === 0)
        {
            Swal.fire("El estado ingresado no es válido");
        }
        else 
        {
            formValues.state = newState.label;
            adminRequests[mode].method(formValues, token)
            .then(response => {
                closeModal();
                Swal.fire(adminRequests[mode].message);
                updateDeal(formValues);
            })
            .catch(e => {
                console.log(e);
                Swal.fire("Ha ocurrido un error, vuelve a intentarlo");
            });
        }
    }

    const handleReset = () => {
        setFormValues(saleSelected);
        setState([{value:saleSelected.state,label:saleSelected.state}])
    }
    
    const closeModal = () => {
        dispatch(closeAdminSaleModal());
        dispatch(adminSaleUnselect());
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
        <Modal show={adminSaleModalOpen} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edición de venta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="admin-modal-content">
                <form onSubmit={ handleSubmit }>

                    <div
                        style={{display: "flex", flexDirection: "column"}}
                        className="ml-3"
                    >
                        <label>Estado </label>
                        <Select
                                name="state"
                                value={ newState }
                                onChange={ handleInputChange }
                                options={ options }
                                className= "w-75"
                                getOptionValue ={(opt) => opt.label}
                        />

                    </div>
                </form>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                onClick={handleSubmit}
                className="btn btn-success mr-2"
                >
                Guardar cambios
                </button>
                <button
                type="button"
                onClick={ handleReset }
                className="btn btn-warning ml-2"
                >
                Resetar valor
                </button>
                           
            </Modal.Footer>
        </Modal>
    )
}