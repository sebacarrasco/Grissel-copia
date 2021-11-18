import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Figure from 'react-bootstrap/Figure'
import './HomeScreen.css'
import useMediaQuery from '../../useMediaQuery';
import ModalAge from './ModalAge';
import {closeModalAge} from '../../actions/ui';
import api from '../../api';
// import { ProductList } from '../products/ProductList';
import { Carousel } from 'react-bootstrap';
import {
    Row,
    Col
  } from "react-bootstrap";
import { ProductCard } from '../products/ProductCard';

export const HomeScreen = () => {
    const web = useMediaQuery("(min-width: 600px)");
    const [modalShow, setModalShow] = useState(false);
    const [productos, setProductos]= useState([]);
    const { modalAgeOpen } = useSelector(state => state.ui);
    console.log(modalAgeOpen);
    const dispatch = useDispatch();

    const checkModal = () => {
        if (modalAgeOpen === true) {
            setModalShow(true);
            dispatch(closeModalAge());
        }
    }

    const peticionGet=async()=>{
        await api.get(`discountProducts`)
            .then(response=>{
                console.log(response.data);
                setProductos(response.data);
            }).catch(error=>{
                console.log(error);
            })
        }

    useEffect(()=>{
        peticionGet();
        },[])

    return (
        <div style={{marginTop:"5%"}} onLoad={checkModal}>
            {web ? (
            <Row style={{ marginLeft: 0, marginRight: 0}}>
                <Col xs={8} xl={8} style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Figure>
                <Figure.Image
                    width={900}
                    src="/copete2.jpeg"
                />
                </Figure>
                </Col>
                <Col xs={4} xl={4} style={{ paddingLeft: 1, paddingRight: 0 }}>
                <Figure>
                <Figure.Image
                    width={900}
                    src="/chelahome.png"
                />
                </Figure>
                </Col>
            </Row>
            
            ) : (

            <Row style={{ marginLeft: 0, marginRight: 0}}>
                <Col xs={12} style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Figure style={{ margin: 0}}>
                <Figure.Image
                    src="/copete2.jpeg"
                />
                </Figure>
                </Col>
                <Col xs={6} style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Figure>
                <Figure.Image
                    src="/chelahome.png"
                />
                </Figure>
                </Col>
                <Col xs={6} style={{ paddingLeft: 5, paddingRight: 10 }}>
                <Figure>
                <Figure.Image
                    src="/vino.jpeg"
                />
                </Figure>
                </Col>
            </Row>
            )}

            {/* <h2 className='text-white'>Imperdibles</h2>
            <Carousel>
                {
                    productos.map((product) =>{
                    <Carousel.Item interval={10000}>
                        <ProductCard {...product}/>
                    </Carousel.Item>
                    })
                }
                
            </Carousel> */}

            <ModalAge
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
        </div>
    )
}
