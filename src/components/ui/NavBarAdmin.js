import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';

export default function NavBar() {

    const dispatch = useDispatch();

    return (
        <Navbar bg="light" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                <img
                    src="/grissel.svg"
                    width="120rem"
                    height="50rem"
                    className="d-inline-block align-left-web"
                    alt=""
                />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav >
                    <Nav.Link as={Link} to="/admin/dashboard" >Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/admin/products" >Productos</Nav.Link>
                    <Nav.Link as={Link} to="/admin/sales" >Ventas</Nav.Link>
                    {/* <Nav.Link as={Link} to="/admin/packs" >Packs</Nav.Link> */}
                    <Nav.Link as={Link} to="/admin/suppliers" >Inventario</Nav.Link>
                    <Nav.Link onClick={ () => dispatch(logout()) } >Cerrar sesión</Nav.Link>

                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
