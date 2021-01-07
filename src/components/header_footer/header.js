import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {Container, Row, Col, Image, Navbar,Nav, NavDropdown} from 'react-bootstrap';
import Logo from '../../Images/QnA.png'

import './header_footer.css';


class header extends Component {
    render() {
        return (
            <div className="header__section">
            <header className = "header">
                <Navbar collapseOnSelect expand="lg" className="page__Navigation nav--sticky">
                <Navbar.Brand href="/">
                        <Image src={Logo} className="d-inline-block align-top" id ="CompanyImage" alt="company_logo"/>
                        <span className="brand__title__name">PEC QnA</span>
                </Navbar.Brand>
                    
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto RightNav">
                            <Link to="/" className="nav-link"><span className="NavLink">Home</span></Link>
                            <NavDropdown title="Categories" id="basic-nav-dropdown">
                                <NavDropdown.Item>
                                    <Link to="#" className="dropdown_nav-link">Top Trending</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="#" className="dropdown_nav-link">Latest</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="#" className="dropdown_nav-link">Unanswered</Link>
                                </NavDropdown.Item>
                                
                            </NavDropdown>
                            
                            {/* <Link to="#" className="nav-link"><span className="NavLink">Categories</span></Link> */}
                            <Link to="#" className="nav-link"><span className="NavLink">Blog</span></Link>
                            <Link to="#" className="nav-link"><span className="NavLink">Contact Us</span></Link>
                            <NavDropdown.Divider />
                        </Nav>

                        <Nav className="ml-auto RightNav">
                            {/* if user is logged in then we willshow only this */}
                            <Link to="/register" className="nav-link"><span className="NavLink">Login/Register</span></Link>
                            {/* otherwise */}
                            <Link to="/register" className="nav-link"><span className="NavLink">Add question</span></Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        </div>
        )
    }
}
export default header
