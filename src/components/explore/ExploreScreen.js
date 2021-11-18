import React, { useState, useEffect } from 'react';
import API from '../../api';
import Search from '../search/Search'
import { showCategory } from '../../actions/category';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './ExploreScreen.css'

// Aca tenemos que conectarnos a la API y generar un json con todas las categorias y su respectivo endpoint

const ExploreScreen = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);


  const axiosCategories = async () => {
      const response  = await API.get(`categories`);
      setCategories(response.data); //Get only array    
      } 
  
  useEffect(() => {
    axiosCategories();
  }, []); 

  const axiosProductsCategories=async(c)=>{
      await API.get(`categories/${c}`)
          .then(response=>{
            dispatch(showCategory(c, response.data))
            history.push(`category:${c}`)
          }).catch(error=>{
              console.log(error);
          })
    }        

  return (
    <div>
    <div className='search-container-mobile'>
        <Search/>
    </div>

    <Row xs={2} md={2} className="g-1 mr-auto">
    {categories.map((item, idx) => (
        <Col key={idx}>
        <Card onClick={() => axiosProductsCategories(item.category)} style = {{cursor:'pointer', width: '100%', height: '7rem' }}>
        <Card.Img/>
            <Card.Body>
            <Card.Title>{item.category}</Card.Title>
            </Card.Body>
        </Card>
        </Col>
    ))}
    </Row>
    </div>
    )
}

export default ExploreScreen;

