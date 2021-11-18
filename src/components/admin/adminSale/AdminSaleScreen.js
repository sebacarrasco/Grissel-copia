import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminSaleSelectCreate } from '../../../actions/admin';
import api from '../../../api';
import { AdminSaleModal } from './AdminSaleModal';
import { DealTable } from './DealTable';
import { useHistory } from 'react-router-dom';

export const AdminSaleScreen = () => {

    const [deals, setDeals]= useState([]);

    const dealsGet=async()=>{
        await api.get(`deals`)
            .then(response=>{
                setDeals(response.data);
            }).catch(error=>{
                console.log(error);
            })
        }
            
    useEffect(()=>{
        dealsGet();
        },[])

    const dispatch = useDispatch();
    const history = useHistory();
    const handleSaleCreate = () => {
        history.push("/admin/select");
        dispatch(adminSaleSelectCreate());
    }
    
    const updateDeal = (deal) => {
        setDeals(deals => deals.map(dea =>
            dea.id === deal.id
            ?
            {
                ...deal
            }
            :
            dea
        ));
    }

    const deleteDeal = (deal) => {
        setDeals(deals.filter(d => d.id !== deal.id));
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", marginTop: "1%"}}>
            <button
                className="btn btn-success mx-3 my-2"
                onClick={ handleSaleCreate }
            >
                Crear una venta
            </button>
            <DealTable deals={ deals }  deleteDeal={ deleteDeal }/>
            <AdminSaleModal updateDeal={ updateDeal }/>
        </div>
    )
}
