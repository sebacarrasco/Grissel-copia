import './Search.css';
import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import API from '../../api';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { showSearch } from '../../actions/search';
import { useHistory } from 'react-router-dom';

export default function Search() {
    
    const history = useHistory();

    const [productos, setProductos]= useState([]);
    const [sugerencia, setSugerencia]= useState([]);
    const [busqueda, setBusqueda]= useState("");

    const productsGet=async()=>{
        await API.get(`products`)
            .then(response=>{
                setProductos(response.data);
                setSugerencia(response.data);
            }).catch(error=>{
                console.log(error);
            })
        }
            
    useEffect(()=>{
        productsGet();
        },[])

    const dispatch = useDispatch();


    const handleChange=e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          dispatch(showSearch(productos))
          setBusqueda("");
          history.push("/search");
        }
    }
    
    // cambiar filtro para elemento.nombre y elemento.categoria
    const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda=sugerencia.filter((elemento)=>{
        if(elemento.prodName.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        || elemento.category.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()
        || elemento.mark.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()))
        )
        {
            return true;
        }
        else
        {
            return false;
        }
    });
    setProductos(resultadosBusqueda);
    }

    return (
        <div className="searchBar">
          <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search" value={busqueda} onChange={handleChange} onKeyDown={handleKeyDown}/>
        </div>
    );

}





