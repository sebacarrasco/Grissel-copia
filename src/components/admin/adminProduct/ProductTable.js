import React from 'react';
import "../AdminTable.css"; 
import { ProductRow } from './ProductRow';

export const ProductTable = ({ products, deleteProduct }) => {

    return (
        <div className="px-3" >
            <table className="table table-striped table-dark">
                <tbody>
                    <tr>
                        <th scope="col">Producto</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Stock crítico</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Descuento</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    {
                        products.map(product =>
                            <ProductRow key={ product.id } product={ product } deleteProduct={ deleteProduct }/>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
