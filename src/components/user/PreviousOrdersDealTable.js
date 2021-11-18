import React from 'react';

export const DealTable = ({ deals }) => {

    return (
        <div className="px-3" >
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th scope="col">Estado</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Precio</th>
                    </tr>
                    {

                        deals.length > 0 ? (
                            deals.map(deal =>
                                <tr key={ deal.id }>
                                    <td style={{color:'black'}}>{ deal.state }</td>
                                    <td style={{color:'black'}}>{ deal.deliveryAddress }</td>
                                    <td style={{color:'black'}}>{ deal.totalPrice }</td>
                                </tr>
                            )
                        )
                        :
                        (
                            null
                        )
                    }
                      
                </tbody>
            </table>

        </div>
    );
}


