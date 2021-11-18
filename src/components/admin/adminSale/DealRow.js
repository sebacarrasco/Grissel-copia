import React from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { openAdminSaleModal } from '../../../actions/ui';
import { adminSaleSelectEdit } from '../../../actions/admin';
import api from '../../../api';

export const DealRow = ({ deal, deleteDeal }) => {

    const dispatch = useDispatch();

    const handleSaleEdit = () => {
        dispatch(openAdminSaleModal());
        dispatch(adminSaleSelectEdit(deal));
    }
    const { token } = useSelector(state => state.auth);

    const handleSaleDelete = () => {
        Swal.fire({
            title: `Seguro que quieres eliminar esta venta?`,
            text: "No podrás revertir este cambio",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`deals/${ deal.id }`,{headers: { 'Authorization': `Bearer ${token}` }},)
                .then(response => {
                    Swal.fire({
                        title: 'La venta ha sido eliminado'
                      });
                      deleteDeal(deal);
                })
                .catch(e => {
                    console.log(e);
                    Swal.fire({
                        title: 'Ha ocurrido un error, vuelve a intentarlo'
                      });  
                });
            }
          })
    }

    return (
        <tr>
            <td>{ deal.id }</td>
            <td>{ deal.state }</td>
            <td>{ deal.deliveryAddress }</td>
            <td>{ deal.totalPrice }</td>
            <td>
                <button
                    className="btn btn-secondary"
                    onClick={ handleSaleEdit }
                >
                    Editar Venta
                </button>
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={ handleSaleDelete }
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}
