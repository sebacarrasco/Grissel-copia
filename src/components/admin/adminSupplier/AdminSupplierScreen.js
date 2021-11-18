import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../../actions/cart';
import api from '../../../api';
import Swal from 'sweetalert2';
import "./AdminProductCard.css";
import { ProductCartCard } from '../../cart/ProductCartCard';
import { removeProduct, cleanCart } from '../../../actions/cart';
import { useHistory } from 'react-router-dom';
import { AdminSupplierModal } from './AdminSupplierModal';
import { openAdminSupplierModal } from '../../../actions/ui';

export const AdminSupplierScreen = () => {

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.cart);
    const { token } = useSelector(state => state.auth);
    const [suppliers, setSuppliers] = useState([]);
    const [productos, setProductos]= useState([]);
    const [selected, setSelected] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const history = useHistory();
    const goBack = () => {
        history.goBack();
        dispatch(cleanCart());
    }
    const suppliersGet=async()=>{
        await api.get(`suppliers`, {headers: { 'Authorization': `Bearer ${token}` }})
            .then(response=>{
                setSuppliers(response.data);
            }).catch(error=>{
                console.log(error.response);
            })
    }
    const productsGet=async()=>{
        await api.get(`products`)
            .then(response=>{
                setProductos(response.data);
            }).catch(error=>{
                console.log(error);
            })
        };
    
    useEffect(()=>{
        suppliersGet();
        productsGet();
        dispatch(cleanCart());
        setSelected([]);
        },[dispatch])
    
    const handleSupplierCreate = () => {
        dispatch(openAdminSupplierModal());
    }
    const handleSupplierSelect = (s) => {
        setSupplier(s);
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
    const handleSubmit = () => {
        if (supplier.length !== 0)
        {
        products.forEach(sel => {
            // Agregar el if supplier
            var supplierId = supplier.value;
            var productId = sel.id;
            var quantity = sel.quantity;
            var price = sel.price;
            var totalPrice = price * quantity;
            api.post("inventoryPurchases", {
                supplierId,
                productId,
                quantity,
                totalPrice,
            }, {headers: { 'Authorization': `Bearer ${token}` }})
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
        );
        dispatch(cleanCart());
        Swal.fire("Compra a proveedor registrada");
        setSelected([])}
        else{
            Swal.fire("Agrega un proveedor");
        };
        
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
            <h2 className="text-center text-white">Selecciona el proveedor</h2>
            <div className="text-black px-2 d-flex justify-content-center">
            <Select
                value={ supplier }
                onChange={ handleSupplierSelect }
                options={ suppliers.map( supplier => ({value: supplier.id, label: supplier.name})) }
                className= "w-75 mt-2"
                isClearable
            />
            </div>
            <div className="bottom-buttons-column mt-3">
            <button
                className="btn rounded-border green-button w-75 mb-5 justify-content-center d-flex"
                onClick={ handleSupplierCreate }
            >
                Agregar proveedor
            </button>
            <AdminSupplierModal />
            </div>
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
                        Agregar Compra a proveedores
                </button>
                 </div>
                :
                null
            }
        </div>
        
    )
}