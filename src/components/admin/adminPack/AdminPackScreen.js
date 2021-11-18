import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminPackSelectCreate } from '../../../actions/admin';
// import api from '../../../api';
import { PackTable } from './PackTable';
import { useHistory } from 'react-router-dom';

export const AdminPackScreen = () => {

    const [packs, setPacks]= useState([]);
    // const packsGet=async()=>{
    //     await api.get(`packs`)
    //         .then(response=>{
    //             setPacks(response.data);
    //         }).catch(error=>{
    //             console.log(error);
    //         })
    //     }
            
    useEffect(()=>{
        // packsGet();
        setPacks([{id:1,packName:"Promo Pisco y Bebida",totalPrice:7000}]);
        },[])

    const dispatch = useDispatch();
    const history = useHistory();

    const handlePackCreate = () => {
        history.push("/admin/create-packs");
        dispatch(adminPackSelectCreate());
    }

    const deletePack = (pack) => {
        setPacks(packs.filter(p => p.id !== pack.id));
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", marginTop: "1%"}}>
            <button
                className="btn btn-success mx-3 my-2"
                onClick={ handlePackCreate }
            >
                Crear un pack
            </button>
        <PackTable packs={ packs }  deletePack={ deletePack }/>
        </div>
    )
}