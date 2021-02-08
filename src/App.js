import React, { useState } from "react";
import { BrowserRouter, Router } from "react-router-dom";
import Main from "./components/main";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import history from './history';
import {FaBars} from 'react-icons/fa';
import Sidebar from './components/sidebar/sidebar'
import Header from './components/header_footer/header'
import Footer from './components/header_footer/footer'
import './App.css';
const store = ConfigureStore();

function App() {
	const [collapsed, setCollapsed] = useState(false);
	const [toggled, setToggled] = useState(false);
	const handleCollapsedChange = (checked) => {
		setCollapsed(checked);
	  };
	const handleToggleSidebar = (value) => {
		setToggled(value);
	};
	
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Router history={history}>
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
				</Router>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
