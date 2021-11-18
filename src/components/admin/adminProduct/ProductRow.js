import React from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { openAdminModal, openAdminOffersModal } from '../../../actions/ui';
import { adminSelectProductEdit, adminSelectProductStock, adminSelectOfferEdit } from '../../../actions/admin';
import api from '../../../api';

export const ProductRow = ({ product, deleteProduct }) => {

    const dispatch = useDispatch();

    const handleEditStock = () => {
        dispatch(openAdminModal());
        dispatch(adminSelectProductStock(product));
    }

    const handleEditProduct = () => {
        dispatch(openAdminModal());
        dispatch(adminSelectProductEdit(product));
    }

    const handleEditOffer = () => {
        dispatch(openAdminOffersModal());
        dispatch(adminSelectOfferEdit(product));
    }

    const { token } = useSelector(state => state.auth);

    const handleDelete = () => {
        Swal.fire({
            title: `Seguro que quieres eliminar ${ product.prodName }?`,
            text: "No podrás revertir este cambio",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`products/${ product.id }`, {headers: { 'Authorization': `Bearer ${token}` }},)
                .then(response => {
                    deleteProduct(product);
                    Swal.fire({
                        title: 'El producto ha sido eliminado'
                      });
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
    // console.log(product);
    return (
        <tr>
            <td>{ product.prodName }</td>
            <td>${ product.price }</td>
            {product.stock >= product.criticalStock ? <td>{ product.stock }</td> : <td className="text-danger">{ product.stock }</td>}
            <td>{ product.criticalStock }</td>
            <td>{ product.category }</td>
            {product.discountAmount ? <td>{
                <button type="button" className="btn btn-outline-warning"
                    onClick={ handleEditOffer }
                >
                    ${ product.discountAmount }
                </button>}
            </td> : <td></td> }
            <td> <a href={ product.image } target="_blank" rel="noreferrer">Click para ver producto</a></td>
            <td>
                <button
                    className="btn btn-secondary"
                    onClick={ handleEditStock }
                >
                    Editar stock
                </button>
            </td>
            <td>
                <button
                    className="btn btn-secondary"
                    onClick={ handleEditProduct }
                >
                    Editar producto
                </button>
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={ handleDelete }
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}
