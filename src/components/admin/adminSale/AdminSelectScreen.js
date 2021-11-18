import React from 'react'
import Select from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import { addProduct } from '../../../actions/cart';
import Swal from 'sweetalert2';
import api from '../../../api';
import { ProductCartCard } from '../../cart/ProductCartCard';
import { removeProduct, cleanCart } from '../../../actions/cart';
import "./AdminProductCard.css"

export const AdminSelectScreen = ({ history }) => {
    const firstName = "admin";
    const lastName = "admin";
    const rut = "11.111.111-1";
    const email= "local@gmail.com";
    const cellNumber = "+56912341234";
    const dispatch = useDispatch();

    const goBack = () => {
        history.goBack();
        dispatch(cleanCart());
    }
    const { products } = useSelector(state => state.cart);
    const [productos, setProductos]= useState([]);
    const [selected, setSelected] = useState([]);
    const { token } = useSelector(state => state.auth);
    
    const productsGet=async()=>{
        await api.get(`products`)
            .then(response=>{
                setProductos(response.data);
            }).catch(error=>{
                console.log(error);
            })
        }
            
    useEffect(()=>{
        productsGet();
        dispatch(cleanCart());
        },[dispatch])
    
    const handleSubmit = () => {
        api.post("admin/deals", {
            email,
            rut,
            firstName,
            lastName,
            cellNumber,
            items: products.map(product => ({
                id: product.id,
                quantity: product.quantity
            }))
        },{headers: { 'Authorization': `Bearer ${token}` }},)
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

    return (
        <div style={{marginTop: "1%"}}>
            <button
                className="btn"
                style={{ color: "#B0ECC4" }}
                onClick={ goBack }
            >
                <i className="fas fa-chevron-circle-left fa-lg"></i>
            </button>

            <h2 className="text-center text-white">Detalles del pedido</h2>
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
                <button
                    className="btn rounded-border green-button w-100 mb-5"
                    onClick={ handleSubmit }
                >
                        Agregar Venta 
                </button>
                 </div>
                :
                null
            }
        </div>
    )
}
