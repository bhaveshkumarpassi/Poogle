import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { ProSidebar, SidebarHeader,  SidebarFooter, SidebarContent,Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '../main';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Image, Navbar,Nav, NavDropdown} from 'react-bootstrap';
import { FaHome, FaGem, FaStickyNote, FaBlog, FaQuestionCircle} from 'react-icons/fa';
import Logo from '../../Images/logo_1.png'
import {MdContactMail} from 'react-icons/md'
import {RiTeamLine} from 'react-icons/ri'
import {HiChat} from 'react-icons/hi'
import './sidebar.css'


const renderSignIn = (status)=>{
  if(status.isSignedIn=="true"){
    return(
      <>
      <MenuItem icon={<span className='fa fa-user-circle'/>}>
        Profile <Link to={"/profile/"+status.userId}/>
      </MenuItem>

      <MenuItem icon={<span className='fa fa-sign-in'/>}>
        Logout <Link to="/logout"/>
      </MenuItem> 
      </>
    )
  }else{
    return(
      <>
      <MenuItem icon={<span className='fa fa-sign-in'/>}>
        Login <Link to="/login"/>
      </MenuItem>
      <MenuItem icon={<span className='fa fa-sign-in'/>}>
        Signup <Link to="/signup"/>
      </MenuItem>
      </>
    )
  }

}

const renderSignInTop = (status)=>{
  if(status.isSignedIn=="true"){
    return(
      <>
      <SubMenu title='Add' icon={<span className='fa fa-plus-circle'/>}>
        <MenuItem>Add Question <Link to="/addQuestion"/></MenuItem>
        <MenuItem>Add Blog <Link to='/addBlog' /></MenuItem>
      </SubMenu>
    
      <MenuItem icon={<span className='fa fa-bell'/>}>
        Notifications <Link to="/notifications"/>
      </MenuItem> 
      </>
    )
  }
  else return(
    <>
    </>
  )
}

function Sidebar({collapsed, toggled, handleToggleSidebar}){
  let auth = useSelector(state=> state.auth)||false;   

return(
<ProSidebar breakPoint='md' collapsed={collapsed} 
          toggled={toggled} onToggle={handleToggleSidebar}
>

    <SidebarHeader>
        Poogle
        <Image src={Logo} className="ml-2 d-inline-block align-top" id ="CompanyImage" alt="company_logo"/>
    </SidebarHeader>
    
    <SidebarContent>
  <Menu iconShape="square">
    <MenuItem icon={<FaHome />}>
      Home <Link to="/home"/>
    </MenuItem>
    
    <MenuItem icon={<span className='fa fa-lg fa-scribd mr-2'></span>}>
      Spaces <Link to="/spaces"/>
    </MenuItem>

    {renderSignInTop(auth)}
    
    {/* <SubMenu title="Top Categories" icon={<FaGem />}>
      <MenuItem>Top Questions</MenuItem>
      <MenuItem>Top Blogs</MenuItem>
      <MenuItem>Top Answers</MenuItem>
    </SubMenu> */}
    
    <SubMenu title="All Categories" icon={<FaQuestionCircle />}>
      <MenuItem>Latest questions <Link to={`/all-categories/${'Latest'}`} /></MenuItem>
      <MenuItem>Unanswered <Link to={`/all-categories/${'Unanswered'}`} /></MenuItem>
      <MenuItem>Most Liked <Link to={`/all-categories/${'Votes'}`} /></MenuItem>
      <MenuItem>Most Viewed <Link to={`/all-categories/${'Views'}`} /></MenuItem>
    </SubMenu>
    
    <MenuItem icon={<HiChat />}>
      Get Assistance <Link to="/chat"/>
    </MenuItem>

    <MenuItem icon={<RiTeamLine />}>
      About Us <Link to="/aboutUs"/>
    </MenuItem>
    
    <MenuItem icon={<MdContactMail />}>
      Contact Us <Link to="/contact"/>
    </MenuItem>
    
    
    {renderSignIn(auth)}
    

  </Menu>
  </SidebarContent>
  <SidebarFooter>
      <p>All rights reserved</p>
  </SidebarFooter>
</ProSidebar>
)
}

export default Sidebar;
