import React, { useState, useEffect } from 'react';
import API from '../../api';
import useMediaQuery from '../../useMediaQuery';
import Search from '../search/Search'
import './NavBar.css';


import { showCategory } from '../../actions/category';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../actions/ui';


// Aca tenemos que conectarnos a la API y generar un json con todas las categorias y su respectivo endpoint

const SideBar = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);


  const axiosCategories = async () => {
      const response  = await API.get(`categories`);
      setCategories(response.data); //Get only array    
      } 
  
  useEffect(() => {
    axiosCategories();
    // console.log(categories);
  }, []);

  const web = useMediaQuery("(min-width: 600px)");
 

  const axiosProductsCategories=async(c)=>{
      dispatch(toggleSidebar());
      await API.get(`categories/${c}`)
          .then(response=>{
            dispatch(showCategory(c))
            history.push(`category:${c}`)
          }).catch(error=>{
              console.log(error);
          })
      }        

  return (
    <div className='align-left'>
    {web ? (<div></div>):
    (
    <div className='search-container-mobile'>
    <Search/>
    </div>)}

    {categories.map((item, index) => {
    return (
      <li key={index} className={item.category}>
        
        <span onClick={() => axiosProductsCategories(item.category)} style = {{cursor:'pointer'}}>  {item.category} </span>

      </li>
    );})
    }
  </div>
  )
}

export default SideBar;


