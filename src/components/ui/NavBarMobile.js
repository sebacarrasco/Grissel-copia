import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap'
import * as FaIcons from 'react-icons/fa';
import { useDispatch,useSelector } from 'react-redux';
import './NavBar.css';
import { openCartModal } from '../../actions/ui';
import { Link } from 'react-router-dom';


export default function NavBarMobile() {
    const dispatch = useDispatch();
    const handleCart = () => dispatch(openCartModal());

    const { totalItems } = useSelector(state => state.cart);
    const { id } = useSelector(state => state.auth);

    return (
      <Container>
        <Navbar bg="light" className="fixed-bottom">
          <Nav style={{width: '100%', justifyContent: 'space-evenly'}}>
            <Nav.Link as={ Link } to="/"><FaIcons.FaHome size={28} color="black"/></Nav.Link>
            <Nav.Link as={ Link } to="/explore"><FaIcons.FaSistrix size={28} color="black"/></Nav.Link>
            <Nav.Link className="cart-button-mobile" onClick={ handleCart }>
                  <FaIcons.FaShoppingCart size={28} color="black"/>
                  {
                    totalItems > 0
                    ?
                      <div className="notification notification-mobile text-center">
                        { totalItems <= 99 ? totalItems : "+" }
                      </div>
                    :
                    null
                  }
            </Nav.Link>
            <Nav.Link as={ Link } to={ !!id ? "/profile" : "/auth/login" }><FaIcons.FaUser size={28} color="black"/></Nav.Link>
          </Nav>
        </Navbar>
      </Container>
    );
}
