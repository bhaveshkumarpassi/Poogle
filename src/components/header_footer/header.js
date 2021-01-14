import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {Container, Row, Col, Image, Navbar,Nav, NavDropdown} from 'react-bootstrap';
import {FaHome} from 'react-icons/fa';
import Logo from '../../Images/logo.png'

import './header_footer.css';


class header extends Component {
    render() {
        return (
            <div className="header__section">
            <header className = "header">
                <Navbar collapseOnSelect expand="lg" className="page__Navigation nav--sticky">
                <Navbar.Brand href="/">
                        <Image src={Logo} className="d-inline-block align-top" id ="CompanyImage" alt="company_logo"/>
                        {/* <span className="brand__title__name">PEC QnA</span> */}
                </Navbar.Brand>
                    
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto RightNav">
                        <NavDropdown title="Add" id="basic-nav-dropdown">
                                <NavDropdown.Item>
                                    <Link to="#" className="dropdown_nav-link">Add Question</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="#" className="dropdown_nav-link">Add Answer</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="#" className="dropdown_nav-link">Add Blog</Link>
                                </NavDropdown.Item>  
                            </NavDropdown>
                            <Link to="#" className="nav-link"><span className="NavLink"><span className="fa fa-bell"></span>  Notifications</span></Link>
                            {/* if user is not logged in then we will show only this */}
                            <Link to="/register" className="nav-link"><span className="NavLink"><span className="fa fa-sign-in fa-lg"></span>  Login</span></Link>
                            {/* otherwise */}
                            <Link to="/profile/1" className="nav-link"><span className="NavLink"><span className="fa fa-user-circle fa-lg"></span>  Profile</span></Link>
                                {/*need to change '1' to the id of the user*/}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        </div>
        )
    }
}
export default header
