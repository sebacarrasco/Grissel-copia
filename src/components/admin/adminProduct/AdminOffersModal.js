import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { adminUnselectProduct } from '../../../actions/admin';
import { closeAdminOffersModal } from '../../../actions/ui';
import { adminRequests } from '../../../helpers/adminRequests';
import "../AdminModal.css";
import API from '../../../api';
import Select from "react-select";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: "50vw"
    },
};

const initFormState = {
    discountPercent: 0,
    productId: "",
    active: false
}

export const AdminOffersModal = () => {

    const { adminOffersModalOpen } = useSelector(state => state.ui);
    const { productSelected, mode } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState([]);
    const [products, setProducts] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const { discountPercent} = formValues;
    const { token } = useSelector(state => state.auth);

    const getProducts = async () => {
        const response  = await API.get(`products`);
        setProducts(response.data); //Get only array  
    }

    const getDiscounts = async (discount) => {
        const response  = await API.get(`discounts/${discount.discountId}`);
        setDiscounts(response.data); //Get only array  
    }

    const clean_products = products.map(function(x){
        return [x.prodName, x.id];
    })


    useEffect(() => {
        getProducts();
        console.log(productSelected);
        if (productSelected)
        {
            getDiscounts(productSelected);
            console.log(productSelected, discounts);
            setFormValues({discountPercent:discounts.discountPercent * 100, productId:productSelected.id});
        }
        else
        {
            setFormValues(initFormState);
        }
    }, [productSelected, setFormValues]);

    const handleInputChange = ({ target }) => {
        setFormValues(previousValues => ({
            ...previousValues,
            [target.name]: target.value
        }));
    }

    const handleProductChange = ( event ) => {
        setFormValues(previousValues => ({
            ...previousValues,
            productId: event.value
        }));
    }


    // const handleDelete = () => {
    //     Swal.fire({
    //         title: `Seguro que quieres eliminar este descuento?`,
    //         text: "No podrás revertir este cambio",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Sí',
    //         cancelButtonText: 'Cancelar'
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //             api.delete(`discounts/${ productId }`, {headers: { 'Authorization': `Bearer ${token}` }},)
    //             .then(response => {
    //                 deleteProduct(product);
    //                 Swal.fire({
    //                     title: 'El producto ha sido eliminado'
    //                   });
    //             })
    //             .catch(e => {
    //                 console.log(e);
    //                 Swal.fire({
    //                     title: 'Ha ocurrido un error, vuelve a intentarlo'
    //                   });  
    //             });
    //         }
    //       })
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formValues.discountPercent >= 100 || formValues.discountPercent === 0)
        {
            Swal.fire("El descuento ingresado no es válido");
        }
        else
        {
        console.log(formValues);
        adminRequests[mode].method(formValues,token)
        .then(response => {
            closeOffersModal();
            Swal.fire(adminRequests[mode].message);
            })
            .catch(e => {
                console.log(e);
                Swal.fire("Ha ocurrido un error, vuelve a intentarlo");
            });
        }
    }
    
    const closeOffersModal = () => {
        dispatch(closeAdminOffersModal());
        dispatch(adminUnselectProduct());
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
        <Modal show={adminOffersModalOpen} onHide={closeOffersModal} scrollable={true} centered>
            <Modal.Header closeButton>
                <Modal.Title>
            <button
                className="btn rounded-border mt-2"
                onClick={ closeOffersModal }
            >
                <i className="fas fa-chevron-circle-left fa-lg"></i>
            </button>

            <div className="admin-modal-content">
                {
                    mode === "editOffer"
                    ?
                    <h2 className="ml-3">Editar descuento</h2>
                    :
                    <h2 className="ml-3">Crear nueva oferta</h2>
                }
            </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <form onSubmit={ handleSubmit }>

                    <div
                        style={{display: "flex", flexDirection: "column"}}
                        className="ml-3"
                    >
                        {
                            mode === "createOffer"
                            ?
                            (
                            <>
                                <label>Producto </label>
                                <Select
                                    name="product"
                                    onChange={ handleProductChange }
                                    options={ clean_products.map( cat => ({value: cat[1], label: cat[0]})) }
                                    className= "w-75"
                                    getOptionValue ={(cat) => cat.label}
                                    isClearable
                                />
                                <br/>
                            </>
                            )
                            :
                            null
                        }
                        <label>Descuento</label>
                        <input
                            autoComplete="off"
                            type="number"
                            value={ discountPercent }
                            name="discountPercent"
                            min="0"
                            max="100"
                            onChange={ handleInputChange }
                            required="required"
                            className="w-25"
                            style={{ borderRadius: "30px" }}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                        ></input>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                    <div className="my-3 ml-3">
                        <button
                            type="submit"
                            onClick={ handleSubmit }
                            className="btn btn-success mr-2"
                        >
                            Guardar cambios
                        </button>
{/* 
                        {
                            mode === "editOffer"
                            ?
                            <button
                                    type="button"
                                    onClick={ handleReset }
                                    className="btn btn-warning ml-2"
                                >
                                    Resetar valor
                            </button>
                            :
                            null
                        } */}
                    </div>
                    </Modal.Footer>
        </Modal>
    )
}