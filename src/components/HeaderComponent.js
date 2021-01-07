import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form, FormGroup, Input, Label
} from 'reactstrap';

class Header extends Component {

    constructor(props) {
        super(props);
    
        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
          isNavOpen: false
        };
      }
    
      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        })
      }

      render() {
          return(
                <div>
                <Navbar dark expand="md" className='navigation'>
                        <NavbarBrand href="/">CollegeQuora</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                        <div className='container'>
                        <div className='row align-items-center justify-content-center'>
                        <div className='col-sm-8'>
                        <Nav navbar>
                            <NavItem>
                            <NavLink href="/Home/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink href="/Profile/">Profile</NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink href="/Spaces/">Spaces</NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink href="/Notifications/">Notifications</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Add
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Add Question
                                </DropdownItem>
                                <DropdownItem>
                                    Add Answer
                                </DropdownItem>
                                <DropdownItem>
                                    Add Blog
                                </DropdownItem>
                            </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        </div>
                        <div className='col-sm-4 mr-10'>
                        <Form>
                            <FormGroup>
                                <Input type="search" name="search" id="search" placeholder="Search ..... "/>
                            </FormGroup>
                        </Form>
                        </div>
                        </div>
                        </div>
                        </Collapse>
                </Navbar>
            </div>
          )
      }
}

export default Header;