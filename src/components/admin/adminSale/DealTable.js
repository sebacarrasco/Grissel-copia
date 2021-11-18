import React from 'react';
import "../AdminTable.css"; 
import { DealRow } from './DealRow';

export const DealTable = ({ deals, deleteDeal }) => {

    return (
        <div className="px-3">
            <table className="table table-striped table-dark table-hover">
                <tbody>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Precio</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    {
                        deals.length > 0 ? (
                            deals.map(deal =>
                                <DealRow key={ deal.id } deal={ deal } deleteDeal={ deleteDeal }/>
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
