import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {Container, Row, Col, Image, Navbar,Nav, NavDropdown} from 'react-bootstrap';
import {FaHome} from 'react-icons/fa';
import Logo from '../../Images/logo_1.png'

import './header_footer.css';


class header extends Component {
    render() {
        return (
            <div className="header__section">
            <header className = "header page__navigation">
                    <Link to="/">
                        <Image src={Logo} className="d-inline-block align-top" id ="CompanyImage" alt="company_logo"/>
                    </Link>
            </header>
        </div>
        )
    }
}
export default header
