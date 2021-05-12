import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import './header_footer.css';
class footer extends Component{
    render(){
        return(
        <div>
            <footer>
                <div className="footerSection">
                    <Container>
                        <div className="footerSectionInner">
                            <Row>
                            <Col md={6} className="footerColumn">
                                    <div className="footerHeading"> Contact Us</div>
                                    <div className  = "footerContent">
                                    <Row>
                                        <div id="address">
                                        <p style={{textAlign:"left" ,fontSize:"1.1rem"}}>
                                            We highly appreciate any kind of queries, suggestions or feedback regarding this platform.
                                            Please feel free to write to us at <Link to="/contact">Contact Us</Link> page
                                        </p>
                                        </div>
                                    </Row>
                                    
                                    
                                    </div>
                                </Col>

                                <Col md={6} className="footerColumn">
                                    <div className="footerHeading"> About Us</div>
                                    <div className  = "footerContent">
                                        <p style={{textAlign:"left" ,fontSize:"1.1rem"}}>
                                            We are students of Punjab Engineering College, 2023 batch. You can find more about us at <Link to="/aboutUs">About Us</Link> page
                                        </p>
                                    </div>
                                </Col>

                                

                            </Row>
                            {/* <br/>
                            <hr></hr>
                            <br/> */}
                            
                            <br/>
                            <p>Made with ❤️ by the students of Punjab Engineering College, Chandigarh</p>
                            <br/>
                            <hr/>
                            <p style={{fontSize:"1.1rem"}}>&#169;	2021. All rights Reserved.</p>
                        </div>    
                    </Container>
                </div>
            </footer>
        </div>
        );
    }
}
export default footer;