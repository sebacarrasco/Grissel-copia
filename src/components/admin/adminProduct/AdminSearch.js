import './Search.css';
import {useEffect, useState} from 'react';


export default function AdminSearch({setProducts, products}) {
    
    const [sugerencia, setSugerencia]= useState([]);
    const [busqueda, setBusqueda]= useState("");
            
    useEffect(()=>{
        setSugerencia(products);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[products])

    const handleChange=e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
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
    setProducts(resultadosBusqueda);
    }

    return (
        <div className="searchBar">
          <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search" value={busqueda} onChange={handleChange}/>
        </div>
    );
}





