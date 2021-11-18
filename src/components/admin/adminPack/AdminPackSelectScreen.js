import React from 'react'
import Select from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import { addProduct } from '../../../actions/cart';
import Swal from 'sweetalert2';
import api from '../../../api';
import { ProductCartCard } from '../../cart/ProductCartCard';
import { removeProduct, cleanCart } from '../../../actions/cart';
import "../adminSale/AdminProductCard.css"

export const AdminPackSelectScreen = ({ history }) => {
    const dispatch = useDispatch();

    const goBack = () => {
        history.goBack();
        dispatch(cleanCart());
    }
    const { products } = useSelector(state => state.cart);
    const [productos, setProductos]= useState([]);
    const [packPrice, setPrice]= useState([]);
    const [selected, setSelected] = useState([]);
    let totalPrice = 0;
    products.forEach(product => {
        totalPrice += product.quantity * product.price;
    });

    const peticionGet=async()=>{
        await api.get(`products`)
            .then(response=>{
                setProductos(response.data);
            }).catch(error=>{
                console.log(error);
            })
        }
            
    useEffect(()=>{
        peticionGet();
        dispatch(cleanCart());
        },[dispatch])
    // PENDIENTE DE BACKEND
    const handleSubmit = () => {
        api.post("admin", {
        })
        .then(response => {
            Swal.fire("Venta registrada");
            history.push("/admin/sales");
        })
        .catch(e => {
            console.log(e);
            console.log(e.response);
            if (e.response)
            {
                Swal.fire(e.response.data.message,e.response.data.detail);
            }
            else{
                Swal.fire("Se ha producido un error, por favor vuelve a intentarlo");
            }
        });
    }
    const handleChange = (s) => {
        if (s.length === 0)
        {
            dispatch(cleanCart());
        }
        else if (selected.length === 0)
        {
            let sel = s[s.length-1];
            let id = sel.value[0];
            let image = sel.value[1];
            let price = sel.value[2];
            let prodName = sel.label;
            dispatch(addProduct({ id, prodName, price, image }, 1));
        }
        else if (selected.length - 1 === s.length)
        {
            let sel = selected.filter(x => !s.includes(x));
            let id = sel[0].value[0];
            dispatch(removeProduct(id));
            // Ver que al eliminar del carro se elimine del selected
        }
        else if (selected.filter(se => se.label === s[s.length-1].label).length === 0)
        {
            let sel = s[s.length-1];
            let id = sel.value[0];
            let image = sel.value[1];
            let price = sel.value[2];
            let prodName = sel.label;
            dispatch(addProduct({ id, prodName, price, image }, 1));
        }
        setSelected(s);
    }

    const handleInputChange = ({target}) => {
        setPrice(target.value);
    }

    return (
        <div style={{marginTop: "1%"}}>
            <button
                className="btn"
                style={{ color: "#B0ECC4" }}
                onClick={ goBack }
            >
                <i className="fas fa-chevron-circle-left fa-lg"></i>
            </button>

            <h2 className="text-center text-white">Elige los productos dentro del pack</h2>
            <div className="text-black px-2 d-flex justify-content-center">
            <Select
                value={ selected }
                onChange={ handleChange }
                options={ productos.map( product => ({value: [product.id, product.image, product.price], label: product.prodName})) }
                isMulti
                className= "w-75 mt-2"
            />

            </div>
            <h2 className="text-center mt-4 text-white">Productos</h2>
            <div className="w-75 div-admin-cards">
            {
                products.length > 0
                ?
                products.map(product =>
                    (
                        <ProductCartCard
                            key={ product.id }
                            {...product}
                        />
                    )
                )
                :
                <div className="empty-text-div text-white mt-4">
                    <p>No has agregado productos</p>
                </div>
            }
            </div>
            {
                products.length > 0
                ? 
                <div className="bottom-buttons-column mt-3">
                <div className= "text-white">
                    <p>Precio del pack {totalPrice}$</p>
                </div>
                <form onSubmit={ handleSubmit }>
                <input
                    autoComplete="off"
                    type="number"
                    name="packPrice"
                    min="0"
                    placeholder= {totalPrice}
                    value={ packPrice }
                    onChange={ handleInputChange }
                    required="required"
                    className="w-100"
                >
                </input>
                <br/>
                <button
                    type="submit"
                    className="btn rounded-border green-button w-100 mb-5"
                    // onClick={ handleSubmit }
                >
                        Agregar Pack 
                </button>
                </form>
                </div>

                :
                null
            }
        </div>
    )
}