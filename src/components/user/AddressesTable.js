import React from 'react';

export const AddressesTable = ({ addresses }) => {

    return (
        <div className="px-3" >
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th scope="col">Calle</th>
                        <th scope="col">Número</th>
                        <th scope="col">Comuna</th>
                        <th scope="col">Region</th>
                    </tr>
                    {

                        addresses.length > 0 ? (
                            addresses.map(address =>
                                <tr>
                                    <td style={{color:'black'}}>{ address.street }</td>
                                    <td style={{color:'black'}}>{ address.numHome }</td>
                                    <td style={{color:'black'}}>{ address.commune }</td>
                                    <td style={{color:'black'}}>{ address.region }</td>
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


