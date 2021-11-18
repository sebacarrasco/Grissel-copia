import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from "react-select";
import { lineChartClearProducts, startUpdateData } from '../../../../actions/lineChart';
import api from '../../../../api';
import PropTypes from 'prop-types';

export const ProductSelector = ({ mode }) => {

    const [products, setProducts]= useState([]);
    const [selectedProducts, setSelectedProducts]= useState([]);
    const dispatch = useDispatch();
            
    useEffect(()=>{
        const getProducts = async() => {
            await api.get(`products`)
                .then(response=>{
                    if (response.data.length > 0)
                    {
                        const option = {value: response.data[0].id, label: response.data[0].prodName};
                        setSelectedProducts([option]);
                        dispatch(startUpdateData({action: "select-option", option}, mode));
                    }
                    setProducts(response.data);
                }).catch(error=>{
                    console.log(error);
                });
        }
        
        getProducts();
        return () => dispatch(lineChartClearProducts(mode))
    },[dispatch, mode]);
    
    const handleChange = (s, action) => {
        if (s.length <= 5 || action.action !== "select-option")
        {
            dispatch(startUpdateData(action, mode));
            setSelectedProducts(s);
        }
    }

    return (
        <Select
            value={ selectedProducts }
            onChange={ handleChange }
            options={ products.map( product => ({value: product.id, label: product.prodName})) }
            isMulti
            className="text-black"
            styles={{
                container: base => ({
                    ...base,
                    flex: 1
                })
            }}
            menuPosition="fixed"
            placeholder="Seleccione productos"
            openMenuOnClick={ selectedProducts.length < 5 }
        />
    )
}

ProductSelector.propTypes = {
    mode: PropTypes.oneOf(['stock', 'quantity'])
};