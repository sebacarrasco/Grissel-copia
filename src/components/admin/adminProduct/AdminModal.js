import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import validator from 'validator';
import { adminUnselectProduct } from '../../../actions/admin';
import { closeAdminModal } from '../../../actions/ui';
import { adminRequests } from '../../../helpers/adminRequests';
import "../AdminModal.css";
import API from '../../../api';
import Select from "react-select";


const initFormState = {
    stock: 0,
    prodName: "",
    price: 0,
    category: "",
    image: "",
    criticalStock: 0,
    mark: "",
    prodDescription: ""
}

export const AdminModal = ({ updateProduct, addProduct }) => {

    const { adminModalOpen } = useSelector(state => state.ui);
    const { productSelected, mode } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState(initFormState);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState([]);
    const { stock, criticalStock, prodName, price, image, prodDescription } = formValues;
    const { token } = useSelector(state => state.auth);

    // customStyles.content.maxHeight = mode === "stock" ? "50vh" : "87vh";

    const getCategories = async () => {
        const response  = await API.get(`categories`);
        setCategories(response.data); //Get only array  
    }
    const clean_categories = categories.map(function(x){
        return x.category
    })

    const getBrands = async () => {
        const response  = await API.get(`marks`);
        setBrands(response.data); //Get only array  
    }
    const clean_brands = brands.map(function(x){
        return x.mark
    })

    useEffect(() => {
        getCategories();
        getBrands();
        if (productSelected)
        {
            setFormValues(productSelected);
            setCategory([{value:"category",label:productSelected.category}]);
            setBrand([{value:"mark",label:productSelected.mark}]);
        }
        else
        {
            setFormValues(initFormState);
            setCategory([]);
            setBrand([]);
        }
    }, [productSelected, setFormValues]);

    const handleInputChange = ({ target }) => {
        setFormValues(previousValues => ({
            ...previousValues,
            [target.name]: target.value
        }));
    }

    const handleCategoryChange = ( event ) => {
        setCategory(event);
    }
    const handleBrandChange = ( event ) => {
        setBrand(event);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (prodName.length < 2)
        {
            Swal.fire("El nombre del producto ingresado no es válido");
        }
        else if (category.length === 0)
        {
            Swal.fire("La categoría ingresada no es válida");
        }
        
        else if (!validator.isURL(image))
        {
            Swal.fire("El url ingresado no es válido");
        }
        else if (brand.length === 0)
        {
            Swal.fire("La marca ingresada no es válida");
        }
        else
        {
            if (mode === "edit" || mode === "create" )
            {
                formValues.category = category.label;
                formValues.mark = brand.label;
            }
            adminRequests[mode].method(formValues,token)
            .then(response => {
                closeModal();
                Swal.fire(adminRequests[mode].message);
                if (mode === "edit" || mode === "stock")
                {
                    updateProduct(formValues);
                }
                else if (mode === "create")
                {
                    addProduct(response.data);
                }
            })
            .catch(e => {
                console.log(e);
                Swal.fire("Ha ocurrido un error, vuelve a intentarlo");
            });
        }
    }

    const handleReset = () => {
        setFormValues(productSelected);
        setCategory([{value:"category",label:productSelected.category}]);
        setBrand([{value:"mark",label:productSelected.mark}]);
    }
    
    const closeModal = () => {
        dispatch(closeAdminModal());
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
        <Modal show={adminModalOpen} onHide={closeModal} scrollable={true} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                {mode === "edit"
                    ?
                    <h2 className="ml-3">Edición de { prodName }</h2>
                    :
                    (
                        mode === "stock"
                        ?
                        <h2 className="ml-3">Stock de { prodName }</h2>
                        :
                        <h2 className="ml-3">Crear nuevo producto</h2>
                    )}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="admin-modal-content">

                <form onSubmit={ handleSubmit }>

                    <div
                        style={{display: "flex", flexDirection: "column"}}
                        className="ml-3"
                    >
                        {
                            mode === "edit" || mode === "create"
                            ?
                            (
                            <>
                                <label>Nombre </label>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    name="prodName"
                                    value={ prodName }
                                    onChange={ handleInputChange }
                                    required="required"
                                    className="w-50"
                                >
                                </input>
                                <br/>
                                <label>Precio </label>
                                <input
                                    autoComplete="off"
                                    type="number"
                                    value={ price }
                                    name="price"
                                    min="0"
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
                                <br/>
                                <label>Url imagen </label>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    value={ image }
                                    name="image"
                                    onChange={ handleInputChange }
                                    required="required"
                                    className="w-75"
                                    style={{ borderRadius: "30px" }}
                                ></input>
                                <br/>
                                <label>Categoría </label>
                                <Select
                                    type="text"
                                    name="category"
                                    value={ category }
                                    required="required"
                                    onChange={ handleCategoryChange }
                                    options={ clean_categories.map( cat => ({value: "category", label: cat})) }
                                    className= "w-75"
                                    getOptionValue ={(cat) => cat.label}
                                    isClearable
                                />
                                <br/>
                                <label>Stock crítico</label>
                                <input
                                    autoComplete="off"
                                    type="number"
                                    value={ criticalStock }
                                    name="criticalStock"
                                    min="0"
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
                                <br/>
                                <label> Descripción </label>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    name="prodDescription"
                                    value={ prodDescription }
                                    onChange={ handleInputChange }
                                    className="w-50"
                                ></input>
                                <br/><label> Marca </label>
                                <Select
                                    type="text"
                                    name="mark"
                                    value={ brand }
                                    onChange={ handleBrandChange }
                                    options={ clean_brands.map( cat => ({value: "mark", label: cat})) }
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
                        
                        <label>Stock </label>
                        <input
                            autoComplete="off"
                            type="number"
                            value={ stock }
                            name="stock"
                            min="0"
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
                    <br/>
                </form>
            </div>

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

                {
                    mode === "edit" || mode === "stock"
                    ?
                    <button
                            type="button"
                            onClick={ handleReset }
                            className="btn btn-warning ml-5"
                        >
                            Resetar valor
                    </button>
                    :
                    null
                }
            </div>
            </Modal.Footer>
        </Modal>
    )
}