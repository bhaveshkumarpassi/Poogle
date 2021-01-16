import React from 'react';
import { ProSidebar, SidebarHeader,  SidebarFooter, SidebarContent,Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '../main';
import {Link} from 'react-router-dom';
import { FaHome, FaGem, FaStickyNote, FaBlog, FaQuestionCircle} from 'react-icons/fa';
import {MdContactMail} from 'react-icons/md'
import {RiTeamLine} from 'react-icons/ri'
import {HiChat} from 'react-icons/hi'
import './sidebar.css'

function Sidebar({collapsed, toggled, handleToggleSidebar}){    
return(
<ProSidebar breakPoint='md' collapsed={collapsed} 
          toggled={toggled} onToggle={handleToggleSidebar}
>
    <SidebarHeader>
        Poogle
    </SidebarHeader>
    <SidebarContent>
  <Menu iconShape="square">
    <MenuItem icon={<FaHome />}>
      Home <Link to="/home"/>
    </MenuItem>
    
    <MenuItem icon={<FaStickyNote />}>
      Spaces <Link to="/spaces"/>
    </MenuItem>
    
    <SubMenu title='Add' icon={<span className='fa fa-plus-circle'/>}>
      <MenuItem>Add Question</MenuItem>
      <MenuItem>Add Answer</MenuItem>
      <MenuItem>Add Blog</MenuItem>
    </SubMenu>
    
    <MenuItem icon={<span className='fa fa-bell'/>}>
      Notifications
    </MenuItem>
    
    <SubMenu title="Top Categories" icon={<FaGem />}>
      <MenuItem>Top Questions</MenuItem>
      <MenuItem>Top Blogs</MenuItem>
      <MenuItem>Top Answers</MenuItem>
    </SubMenu>
    
    <SubMenu title="Questions" icon={<FaQuestionCircle />}>
      <MenuItem>Latest questions</MenuItem>
      <MenuItem>Unanswered</MenuItem>
      <MenuItem>Most viewed</MenuItem>
      <MenuItem>All questions</MenuItem>
    </SubMenu>
    
    <SubMenu title="Blogs" icon={<FaBlog />}>
      <MenuItem>Latest blogs</MenuItem>
      <MenuItem>Most viewed</MenuItem>
      <MenuItem>All blogs</MenuItem>
    </SubMenu>
    
    <MenuItem icon={<HiChat />}>
      Chat Others <Link to="/chat"/>
    </MenuItem>

    <MenuItem icon={<RiTeamLine />}>
      About Us <Link to="/aboutUs"/>
    </MenuItem>
    
    <MenuItem icon={<MdContactMail />}>
      Contact Us <Link to="/contact"/>
    </MenuItem>
    
    <MenuItem icon={<span className='fa fa-user-circle'/>}>
      Profile <Link to="/profile/1"/>
    </MenuItem>
    
    <MenuItem icon={<span className='fa fa-sign-in'/>}>
      Login <Link to="/login"/>
    </MenuItem>
  </Menu>
  </SidebarContent>
  <SidebarFooter>
      <p>All rights reserved</p>
  </SidebarFooter>
</ProSidebar>
)
}

export default Sidebar;
