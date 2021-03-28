// import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
// import {Container, Row, Col,Image} from 'react-bootstrap';
// import './notification.css';

// class notificationCard extends Component {
//     render() {
//         let type= this.props.type;
//         let text = type==='personal--Comment'? 'commented on your post': '';
//         return (
//             <div className="notification__card">
//                 <div className="notifier__profile">
//                     <Link to={this.props.spaceLink}><Image src={this.props.image} className="notifier__profile--image"/></Link>    
//                 </div>
//                 <div className="notfication__content">
//                     <span className="notification__header">
//                         {this.props.spaceName} {text}
//                         <div className="header__content">
//                             <span className="dot__icon"></span>
//                             {this.props.date}
//                         </div>
//                     </span>
//                     {/* <br/> */}
//                     <Link to={this.props.postLink} id="post__link">
//                         {this.props.description}
//                     </Link>
//                 </div>
//            </div>
//         )
//     }
// }
// export default notificationCard;