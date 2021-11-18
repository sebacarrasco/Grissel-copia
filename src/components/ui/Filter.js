import React, { useState, useEffect } from 'react';
import API from '../../api';
import {styled} from '@mui/system';
import Slider from '@mui/material/Slider';
import Select from 'react-select';
import Button from '../buttons/Boton';


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

export const Filter = ({category, setFilter}) => {

    const [brands, setBrands] = useState([]);
    const[brand, setBrandFilter] = useState('');
    const[prices, setPriceFilter] = useState([300, 10000]);
    const[sortby, setSortByFilter] = useState('');
    const sortbyList = [{value: 'Ordenar por precio menor a mayor', label:'Ordenar por precio menor a mayor'},
                        {value: 'Ordenar por precio mayor a menor', label:'Ordenar por precio mayor a menor'},
                        {value: 'Ordenar por nombre', label: 'Ordenar por nombre'}]

    const getBrandsOfCategory = async () => {
        const response  = await API.get(`brandsofcategory/${category}`);
        setBrands([{'value':'Todas las marcas', 'label':'Todas las marcas'}].concat(response.data.brands.map(function(brandItem) {
            return {
                      "value": brandItem,
                      "label": brandItem,
                    }
            
                })));
        setPriceFilter([300, 10000])
        setBrandFilter('')
        setSortByFilter('')
        } 

    useEffect(() => {
        getBrandsOfCategory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [category]);

    const FilterByPriceAndBrand = async () => {

            let sortByLabel = ''
            let orderByLabel = ''
            let brandLabel = ''

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
            else if (sortby === 'Ordenar por nombre')
            {
                sortByLabel = 'prodName'
            }
            else
            {
                sortByLabel = ''
            }

            if (brand === 'Todas las marcas')
            {
                brandLabel = ''
            }
            else
            {
                brandLabel = brand
            }
            //console.log(`productsFilter/?category=${category}&minPrice=${prices[0]}&mark=${brandLabel}&maxPrice=${prices[1]}&sortby=${sortByLabel}`)
            const response  = await API.get(`productsFilter/?category=${category}&minPrice=${prices[0]}&mark=${brandLabel}&maxPrice=${prices[1]}&sortby=${sortByLabel}&orderby=${orderByLabel}`);
            setFilter(response.data);
            
            } 
    useEffect(() => {
        FilterByPriceAndBrand()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [brand, prices, sortby]);


    const handleChangeSlider = (event, newValue) => {
        setPriceFilter(newValue);
         };

    const handleChangeSelectBrand = (event) => {
        setBrandFilter(event.value);
        };

    const handleChangeSelectSortBy = (event) => {
        setSortByFilter(event.value);
        };

    const handleClickResetFilter = (event) => {
        setPriceFilter([300, 10000]);
        setSortByFilter('');
        setBrandFilter('');
        };
    

    return (
            <Container fluid >
                <Row md="12">
                    <Col md="12">
                    <Card >
                        <Card.Body >
                            <Row>
                                <Col md="1">
                                </Col>
                                <Col md="3">
                                    <h6>Rango de precios:</h6>
                                </Col>
                                <Col md="8">
                                    <h6>{`$${prices[0]}`}-{`$${prices[1]}`}</h6>
                                </Col>
                            </Row>
                            <Row >
                                <Col md="1">
                                </Col>
                                <Col md="4">
                                    <StyledSlider  style={{width:'80%'}}
                                    value={prices}
                                    min={300}
                                    step={500}
                                    max={10000}
                                    onChange = {handleChangeSlider}
                                    />
                                </Col>
                                <Col md="1">
                                </Col>
                                <Col className="pr-1" md="2" >
        
                                    <Select
                                    placeholder= {brand || 'Filtrar por marca'}
                                    options = {brands} 
                                    value={brand}
                                    onChange={handleChangeSelectBrand}
                                    />
                            
                                </Col>
                                <Col className="pr-1" md="2">
                                    <Select
                                        placeholder={sortby || 'Ordenar por'}
                                        options = {sortbyList} 
                                        value={sortby}
                                        onChange={handleChangeSelectSortBy}
                                        />
                                </Col>
                                <Col className="pr-1" md="1">
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



