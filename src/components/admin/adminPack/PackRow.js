import React from 'react';
// import Swal from 'sweetalert2';
// import { useDispatch } from 'react-redux';
// import { adminPackSelectEdit } from '../../../actions/admin';
// import api from '../../../api';

export const PackRow = ({ pack, deletePack }) => {

    // const dispatch = useDispatch();

    // const handlePackEdit = () => {
    //     dispatch(adminPackSelectEdit(pack));
    // }

    // const handlePackDelete = () => {
    //     Swal.fire({
    //         title: `Seguro que quieres eliminar este pack?`,
    //         text: "No podrás revertir este cambio",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Sí',
    //         cancelButtonText: 'Cancelar'
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //             api.delete(`packs/${ pack.id }`)
    //             .then(response => {
    //                 Swal.fire({
    //                     title: 'El pack ha sido eliminado'
    //                   });
    //                   deletePack(pack);
    //             })
    //             .catch(e => {
    //                 console.log(e);
    //                 Swal.fire({
    //                     title: 'Ha ocurrido un error, vuelve a intentarlo'
    //                   });  
    //             });
    //         }
    //       })
    // }

    return (
        <tr>
            <td>{ pack.id }</td>
            <td>{ pack.packName }</td>
            <td>{ pack.totalPrice }</td>
            {/* <td>
                <button
                    className="btn btn-secondary"
                    onClick={ handlePackEdit }
                >
                    Editar Pack
                </button>
            </td> */}
            {/* <td>
                <button
                    className="btn btn-danger"
                    onClick={ handlePackDelete }
                >
                    Eliminar
                </button>
            </td> */}
        </tr>
    )
}
