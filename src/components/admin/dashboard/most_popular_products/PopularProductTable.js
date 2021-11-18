import React from 'react';


export const PopularProductTable = ({products}) => {

    return (
        <div className="px-3" >
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th scope="col">Producto</th>
                        <th scope="col">Cantidad total vendida</th>
                        <th scope="col">Ganancia total generada</th>
                    </tr>
                    {
                        products.map(product =>

                            <tr key={ product.productId }>
                            
                            <td style={{color:'black'}}>{ product.prodName } </td>
                            <td style={{color:'black'}}>{ product.totalQuantity }</td>
                            <td style={{color:'black'}}>{ product.totalMoney }</td>
                            
                            </tr>
                        )
                    }
                      
                </tbody>
            </table>

        </div>
    )
}


