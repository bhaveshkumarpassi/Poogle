import React, { useState } from "react";
import { BrowserRouter, Router } from "react-router-dom";
import Main from "./components/main";
import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import history from './history';
import {FaBars} from 'react-icons/fa';
import Sidebar from './components/sidebar/sidebar'
import Header from './components/header_footer/header'
import Footer from './components/header_footer/footer'
import './App.css';

function App(props) {
	const [collapsed, setCollapsed] = useState(false);
	const [toggled, setToggled] = useState(false);
	const handleCollapsedChange = (checked) => {
		setCollapsed(checked);
	  };
	const handleToggleSidebar = (value) => {
		setToggled(value);
	};
	
	
	return (
		<BrowserRouter>
			<Router history={history}>
			{/* <ScrollToTop> */}
				<div className={`app  ${toggled? 'toggled':''}`}>
					<Sidebar collapsed={collapsed} toggled={toggled} handleToggleSidebar={handleToggleSidebar}/>
					<main>
						<div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
							<FaBars />
						</div>
							<Header/>
							<Main />
							<Footer/>
					</main>
				</div>
				{/* </ScrollToTop> */}

			</Router>
		</BrowserRouter>
	);
}	
export default App;
