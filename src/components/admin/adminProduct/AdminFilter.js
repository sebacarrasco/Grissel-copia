import './AdminFilter.css'
import React, { useState, useEffect } from 'react';
import API from '../../../api';
import {styled} from '@mui/system';
import Slider from '@mui/material/Slider';
import Select from 'react-select';
import AdminSearch from './AdminSearch';
import Button from '../../buttons/Boton';

// react-bootstrap components
import {
    // Button,
    Card,
    Container,
    Row,
    Col,
  } from "react-bootstrap";
  

const StyledSlider = styled(Slider)({
    color: '#B0ECC4',
});

export const AdminFilter = ({categories, setProducts}) => {

    const [filtered, setFiltered] = useState([]);
    
    const [category, setCategoryFilter] = useState('');
    const [brands, setBrands] = useState([{'value':'Todas las marcas', 'label':'Todas las marcas'}]);
    const[brand, setBrandFilter] = useState('');
    const[prices, setPriceFilter] = useState([300, 10000]);
    const[sortby, setSortByFilter] = useState('');
    const sortbyList = [{value: 'Ordenar por precio menor a mayor', label:'Ordenar por precio menor a mayor'},
    {value: 'Ordenar por precio mayor a menor', label:'Ordenar por precio mayor a menor'},
    {value: 'Ordenar por nombre', label: 'Ordenar por nombre'},
    {value: 'Ordenar por stock mayor a menor', label: 'Ordenar por stock mayor a menor'},
    {value: 'Ordenar por stock menor a mayor', label: 'Ordenar por stock menor a mayor'},
    {value: 'Ordenar por stock crítico mayor a menor', label: 'Ordenar por stock crítico mayor a menor'},
    {value: 'Ordenar por stock crítico menor a mayor', label: 'Ordenar por stock crítico menor a mayor'}
]

    const getBrandsOfCategory = async () => {
        const response  = await API.get(`brandsofcategory/${category}`);
        setBrands([{'value':'Todas las marcas', 'label':'Todas las marcas'}].concat(response.data.brands.map(function(brandItem) {
            return {
                      "value": brandItem,
                      "label": brandItem,
                    }
                })));
        setBrandFilter('')
        } 

    useEffect(() => {
        getBrandsOfCategory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [category]);
   
        const FilterByPriceAndBrand = async () => {

                let orderByLabel = ''
                let sortByLabel = sortby
                let brandLabel = brand
                let categoryLabel = category

                if (category === 'Todas las categorías')
                {
                    categoryLabel = ''
                }
                if (brand === 'Todas las marcas')
                {
                    brandLabel = ''
                }
                else if (sortby === 'Ordenar por nombre')
                {
                    sortByLabel = 'prodName'
                }
                if (sortby === 'Ordenar por precio menor a mayor')
                {
                    sortByLabel = 'price'
                    orderByLabel = 'ASC'
                }
                else if (sortby === 'Ordenar por precio mayor a menor')
                {
                    sortByLabel = 'price'
                    orderByLabel = 'DESC'
                }
                else if (sortby === 'Ordenar por stock menor a mayor')
                {
                    sortByLabel = 'stock'
                    orderByLabel = 'ASC'
                }
                else if (sortby === 'Ordenar por stock mayor a menor')
                {
                    sortByLabel = 'stock'
                    orderByLabel = 'DESC'
                }
                else if (sortby === 'Ordenar por stock crítico menor a mayor')
                {
                    sortByLabel = 'criticalStock'
                    orderByLabel = 'ASC'
                }
                else if (sortby === 'Ordenar por stock crítico mayor a menor')
                {
                    sortByLabel = 'criticalStock'
                    orderByLabel = 'DESC'
                }
                const response  = await API.get(`productsFilter/?category=${categoryLabel}&minPrice=${prices[0]}&mark=${brandLabel}&maxPrice=${prices[1]}&sortby=${sortByLabel}&orderby=${orderByLabel}`);
                setProducts(response.data);
                setFiltered(response.data)
                } 

    useEffect(() => {
        FilterByPriceAndBrand()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [category, brand, prices, sortby]);


    const handleChangeSlider = (event, newValue) => {
        setPriceFilter(newValue);
         };
    
    const handleChangeSelectCategory= (event) => {
        setCategoryFilter(event.value);
        };

    const handleChangeSelectBrand = (event) => {
        setBrandFilter(event.value);
        };

    const handleChangeSelectSortBy = (event) => {
        setSortByFilter(event.value);
        };

    const handleClickResetFilter = (event) => {
        setSortByFilter('');
        setBrandFilter('');
        setCategoryFilter('');
        setPriceFilter([300, 10000]);
        };
    

    return (
            <Container fluid >
                <Row md="12">
                    <Col md="12">
                    <Card >
                        <Card.Body >
                            <Row>
                                <Col md="2">
                                    <h6>Rango de precios:</h6>
                                </Col>
                                <Col md="1">
                                    <h6>{`$${prices[0]}`}-{`$${prices[1]}`}</h6>
                                </Col>
                            </Row>
                            <Row >
                                <Col md="3">
                                    <StyledSlider style={{width:'75%'}}
                                    value={prices}
                                    min={300}
                                    step={500}
                                    max={10000}
                                    onChange = {handleChangeSlider}
                                    />
                                </Col>
                                <Col className="pr-1" md="4" style={{width:'20%'}}>
                                    <AdminSearch setProducts = {setProducts} products = {filtered}/>
                                </Col>
                                <Col className="pr-1" md="1" style={{width:'16%'}}>
                                    <Select style={{width:'100%'}}
                                    placeholder= {category || 'Filtrar por categoría'}
                                    options = {categories} 
                                    value={category}
                                    onChange={handleChangeSelectCategory}
                                    />

                                </Col>
                                <Col className="pr-1" md="1" style={{width:'16%'}}>
                                    <Select style={{width:'100%'}}
                                    placeholder= {brand || 'Filtrar por marca'}
                                    options = {brands} 
                                    value={brand}
                                    onChange={handleChangeSelectBrand}
                                    />
                            
                                </Col>
                                <Col className="pr-1" md="4" style={{width:'16%'}}>
                                    <Select style={{width:'100%'}}
                                        placeholder={sortby || 'Ordenar por'}
                                        options = {sortbyList} 
                                        value={sortby}
                                        onChange={handleChangeSelectSortBy}
                                        />
                                </Col>
                                <Col className="pr-1" md="" >
                                    <Button  HandleClick={handleClickResetFilter} text='Resetear filtros' clase='green-button-xl'/>
                                </Col>
                            </Row>
                                        
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
                </Container>
    )
}



