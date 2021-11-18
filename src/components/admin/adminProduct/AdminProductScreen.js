import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminSelectProductCreate, adminSelectOfferCreate } from '../../../actions/admin';
import { openAdminModal, openAdminOffersModal } from '../../../actions/ui';
import api from '../../../api';
import { AdminModal } from './AdminModal';
import { AdminOffersModal } from './AdminOffersModal';
import { ProductTable } from './ProductTable';
import { AdminFilter } from'./AdminFilter';


export const AdminProductScreen = () => {

    const [products, setProducts]= useState([]);
    const [categories, setCategories]= useState([]);

    const peticionGet=async()=>{
        await api.get(`products`)
            .then(response=>{
                setProducts(response.data);
            }).catch(error=>{
                console.log(error);
            })
        await api.get(`categories`)
            .then(response=>{
                setCategories([{'value':'Todas las categorías', 'label':'Todas las categorías'}].concat(response.data.map(function(categoryItem) {
                    return {
                              "value": categoryItem.category,
                              "label": categoryItem.category,
                            }
                    
                        })));;
            }).catch(error=>{
                console.log(error);
            })
        }
            
    useEffect(()=>{
        peticionGet();
        },[])

    const dispatch = useDispatch();
    const handleCreate = () => {
        dispatch(openAdminModal());
        dispatch(adminSelectProductCreate());
    }

    const handleOffersCreate = () => {
        dispatch(openAdminOffersModal());
        dispatch(adminSelectOfferCreate());
    }
    
    const updateProduct = (product) => {
        setProducts(products => products.map(prod =>
            prod.id === product.id
            ?
            {
                ...product
            }
            :
            prod
        ));
    }

    const deleteProduct = (product) => {
        setProducts(products.filter(p => p.id !== product.id))
    }
    
    const addProduct = (product) => {
        setProducts([product, ...products]);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", marginTop: "1%" }}>
            <AdminFilter categories = {categories} setProducts = {setProducts}/>
            <div style={{ display: "flex", flexDirection: "column" }}>
            <button
                className="btn btn-success mx-3 my-2"
                onClick={ handleCreate }
            >
                Crear un producto
            </button>
            <button
                className="btn btn-success mx-3 my-2"
                onClick={ handleOffersCreate }
            >
                Crear una oferta
            </button>
            </div>
            <ProductTable products={ products } deleteProduct={ deleteProduct } />
            <AdminModal updateProduct={ updateProduct } addProduct={ addProduct }/>
            <AdminOffersModal updateOffer={ updateProduct } addOffer={ addProduct }/>
        </div>
    )
}
