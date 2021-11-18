import React, { useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import SideBar  from './SideBar';
import  Button  from '../buttons/Boton'
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from 'react-bootstrap'
import { openCartModal, toggleSidebar } from '../../actions/ui';
import Search from '../search/Search'
import './NavBar.css';
import useMediaQuery from '../../useMediaQuery';
import NavBarMobile from './NavBarMobile';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { logout } from '../../actions/auth';



// import { useMediaPredicate } from "react-media-hook";


export default function NavBar() {

  const dispatch = useDispatch();
  
  const { openSidebar } = useSelector(state => state.ui);
  const { id } = useSelector(state => state.auth);

  const handleLogout = () => {
    Swal.fire({
      text: `Hasta pronto!`,
      showConfirmButton: false,
      timer: 1500
    });
    dispatch(logout())
  }

  const toggleShowSidebar = () => {
    dispatch(toggleSidebar());
  }

  const { totalItems } = useSelector(state => state.cart);

  const history = useHistory();

  const handleCart = () => dispatch(openCartModal());

  const [scrolled,setScrolled]=React.useState(false);
  const handleScroll=() => {
      const offset=window.scrollY;
      if(offset > 200 ){
        setScrolled(true);
      }
      else{
        setScrolled(false);
      }
    }

    useEffect(() => {
      window.addEventListener('scroll',handleScroll)
    },[])
    
    let navbarClasses=['navbar'];
    if(scrolled){
      navbarClasses.push('scrolled');
    }

  const web = useMediaQuery("(min-width: 600px)");

  return (
    <> 
    {web ? ( 
      <div>

        <div className='navbarweb'>

        <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={toggleShowSidebar} color="#A9A9A9" />
        </Link>

        <Navbar.Brand as={Link} to="/">
          <img
              src="/grissel.svg"
              width="120rem"
              height="50rem"
              className="d-inline-block usernav-container"
              alt=""
          />
        </Navbar.Brand>

          <div className="web-nav">
          <nav className={openSidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={toggleShowSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-cross'>
                  <AiIcons.AiOutlineClose color="#E8E8E8"/>
                </Link>
              </li>
              <SideBar/>
            </ul>
          </nav>

          <div className='search-container-web'>
            <Search/>
          </div>

            <nav className={openSidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items'>
                <li className='navbar-toggle'>
                <Link to='#' className='menu-cross' onClick={toggleShowSidebar} >
                    <AiIcons.AiOutlineClose color="#E8E8E8"/>
                  </Link>
                </li>
              <SideBar/>
              </ul>
            </nav>
            </div>
          <div className='buttons-container'>
              {
                !!id
                ?
                <>
                <Button HandleClick={handleLogout} text='Cerrar sesión' clase='green-button-xl'/>
                <Button HandleClick={() => history.push("/profile")} text='Ir a perfil' clase='green-button-xl'/>
                </>
                :
                <>
                  <Button HandleClick={() => history.push("/auth/login")} text='Iniciar Sesión' clase='green-button-xl'/>
                  <Button HandleClick={() => history.push("/auth/register")} text='Registrarse' clase='green-button-xl'/>
                </>
              }
              <Link to='#' className="cart-button float-right" onClick={ handleCart }>
                <FaIcons.FaShoppingCart size={28} color="black"/>
                {
                  totalItems > 0
                  ?
                    <div className="notification text-center">
                      { totalItems <= 99 ? totalItems : "+" }
                    </div>
                  :
                  null
                }
              </Link>
          </div>
          </div>
        </div>)
        : 
      (      
      <div className='navbarmobile'>
        <NavBarMobile/>
      </div>
      )}
    </>
  );
}
