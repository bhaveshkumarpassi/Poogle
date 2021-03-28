// import React, { Component } from 'react'
// import {Container, Row, Col,Image} from 'react-bootstrap';
// import { Breadcrumb, BreadcrumbItem } from "reactstrap";
// import {Link} from 'react-router-dom'
// import Jumbotron from 'react-bootstrap/Jumbotron';
// import {Nav, NavItem, NavLink} from 'reactstrap'
// import './notification.css';
// import UserImg from '../../Images/profile_pic.png'
// import NotificationCard from './notificationCard';

// // const RenderTags = ({blogDemand}) => blogDemands.tagNames.map((tag) => {
    
// //     return(
// //         <Badge pill className='tag'>{tag}</Badge>
// //     );
// // })



// class AllBlogDemands extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             showQues:true,
//         }
//         this.activateSpaces = this.activateQues.bind(this);

//     }
//     activateQues(){
//         this.setState({
//             showQues:true,
//         })
//     }

//     renderQues(){
//         let Description="I’m a 2019 computer science graduate, now it’s been more than a year since I’ve been looking for a fresher job in IT. What are ..."
//         return(
//             <>
//             <NotificationCard spaceLink="#" postLink="#" image={UserImg} spaceName="Job Search" date="31 FEB 1921" description={Description}/>
//             <NotificationCard spaceLink="#" postLink="#" image={UserImg} spaceName="SPACE NAME" date="31 FEB 1921" description={Description}/>
//             <NotificationCard spaceLink="#" postLink="#" image={UserImg} spaceName="test 45" date="31 FEB 1921" description={Description}/>
//             <NotificationCard spaceLink="#" postLink="#" image={UserImg} spaceName="test 6" date="31 FEB 1921" description={Description}/>
//             <NotificationCard spaceLink="#" postLink="#" image={UserImg} spaceName="Vampires" date="31 FEB 1921" description={Description}/>
//             </>
//         )
//     }
//     renderPersonal(){
//         let Description="Keep up the good work buddy"
//         return(
//             <>
//                 <p>This is the content related to the post comments</p>
//                 <NotificationCard type="personal--Comment" spaceLink="#" postLink="#"  image={UserImg} spaceName="Koala" date="31 FEB 1921" description={Description}/>
//                 <NotificationCard type="personal--Comment" spaceLink="#" postLink="#" image={UserImg} spaceName="Giraffe" date="31 FEB 1921" description={Description}/>
//                 <NotificationCard type="personal--Comment" spaceLink="#" postLink="#" image={UserImg} spaceName="Elephant" date="31 FEB 1921" description={Description}/>
//             </>
//         )
//     }

//     render() {
//         return (

//             <div className="notifications__section">
//                 <Container>
//                     <Col md={10} sm={12} className="notifications__main__content">
//                         <Row>
//                             <Breadcrumb className="mb-4 page__navigation__breadCrump">
//                                 <BreadcrumbItem>
//                                     <Link to="/home">Home</Link>
//                                 </BreadcrumbItem>
//                                 <BreadcrumbItem active>Notifications</BreadcrumbItem>
//                             </Breadcrumb>
//                         </Row>
                        
//                         <Row>
//                             <div className='row ml-1 mr-1 notifications__nav'>
//                                 <Nav className='col-12' tabs>  
//                                     <NavItem className='notification__filters'>
//                                         <NavLink href='#' active={this.state.showQues} onClick={() => this.activateQues()}>Questions</NavLink>
//                                     </NavItem>
//                                     <NavItem className='notification__filters'>
//                                         <NavLink href='#' active={this.state.showBlogs} onClick={() => this.activateBlogs()}>Blogs</NavLink>
//                                     </NavItem>
//                                     <NavItem className='notification__filters'>
//                                         <NavLink href='#' active={this.state.showContent} onClick={() => this.activateContent()}>Yours</NavLink>
//                                     </NavItem>
//                                 </Nav>
//                             </div>
//                         </Row>

//                         <div className="notifications__content">
//                            {this.state.showQues && this.renderQues()}
//                            {this.state.showBlogs && this.renderQues()}
//                            {this.state.showContent && this.renderPersonal()}
//                         </div>

//                     </Col>
//                 </Container>
//             </div>

        
//         )
//     }
// }
// export default AllBlogDemands;