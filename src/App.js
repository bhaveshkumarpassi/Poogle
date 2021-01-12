import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/main";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

const store = ConfigureStore();

function App() {
	return (
		// <div>
		//   <BrowserRouter>
		//     <Main />
		//   </BrowserRouter>
		// </div>
		// provides access of redux to store to main and thus to all othet components.
		<Provider store={store}>
			<BrowserRouter>
				<div className="App">
					<Main />
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
