import './ProductsByCategoryScreen.css'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductList } from '../products/ProductList'
import useMediaQuery from '../../useMediaQuery';
import { GoBackButton } from '../buttons/GoBackButton';
import { Filter } from'./Filter';


export const ProductsByCategoryScreen = () => {

    const { category } = useSelector(state => state.category);
    const [products, setProducts] = useState([]);
    
    const web = useMediaQuery("(min-width: 600px)");


    return (

        <div className= {web ? ('down'):('')}>  
            <GoBackButton />
            <div className="text-center" ><h3 className="text-white ml-4 ">{category}</h3></div> 

                <Filter category={category} setFilter = {setProducts}/>

            <div className='mt-3'>
            <ProductList /* horizontal={ false } */ products={ products} title={category}/>
            </div>
      
        </div>
    )
}



