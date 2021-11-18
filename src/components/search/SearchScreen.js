import React from 'react';
import { useSelector } from 'react-redux';
import { GoBackButton } from '../buttons/GoBackButton';
import { ProductList } from '../products/ProductList';
import useMediaQuery from '../../useMediaQuery';

export const SearchScreen = () => {

    const { products } = useSelector(state => state.search);
    const web = useMediaQuery("(min-width: 600px)");

    return (
        <div className= {web ? 'down' : ''}>
            <GoBackButton />
            {
            products.length > 0 ?
            (
            <div>
                <ProductList horizontal={ false } products={ products } title="Resultados búsqueda"/>
                <div className="text-center" ><h3 className="text-white ml-4 ">Resultados búsqueda</h3></div> 
            </div>
            )
              
            : (<div className="text-center" ><h3 className="text-white ml-4 "> No hemos encontrado productos con esos criterios</h3></div> )
            }
        </div>
    )
}
