import React from 'react';
import "../AdminTable.css"; 
import { PackRow } from './PackRow';

export const PackTable = ({ packs, deletePack }) => {

    return (
        <div className="px-3">
            <table className="table table-striped table-dark table-hover">
                <tbody>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        {/* <th scope="col"></th> */}
                        {/* <th scope="col"></th> */}
                    </tr>
                    {
                        packs.length > 0 ? (
                            packs.map(pack =>
                                <PackRow key={ pack.id } pack={ pack } deletePack={ deletePack }/>
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
    )
}
