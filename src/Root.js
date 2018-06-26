import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { BrowserRouter as Router, HashRouter, Switch, Route } from "react-router-dom";

// Store
import configureStore from './store';

import Login from "./pages/login";
import App from "./pages/app";

const { persistor, store } = configureStore();

// comment this line for producction
// indexedDB.deleteDatabase('localforage');

class Root extends Component {

	render() {
		return(
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<Router>
						<HashRouter>
							<Switch>
								<Route exact path="/" component={Login} />
								<Route path="/app" component={App} />
							</Switch>
						</HashRouter>
					</Router>
				</PersistGate>
			</Provider>
		)
	}

}

export default Root;


