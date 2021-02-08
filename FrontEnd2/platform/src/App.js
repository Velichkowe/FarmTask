import React, { useState, useEffect } from 'react';
import System from './helpers/system/system';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Routes } from './helpers/routeManager/routeManager';
import { getRoutes } from './helpers/routes/routes';

import './App.css';

const Header = React.lazy(() => import("components/header"));

const App = () => {
	const [system, setSystem] = useState(undefined);
	const [apolloClient, setApolloClient] = useState(undefined);
	const [routes, setRoutes] = useState();
	console.log('asdsad')
	
	useEffect(() => {
		const client = new ApolloClient({
			uri: 'http://localhost:4000/',
			cache: new InMemoryCache()
		});

		const routes = getRoutes();
		console.log(routes);
		setRoutes(routes);

		setApolloClient(client);
	}, [])

	// const setApp2 = () => {
	// 	setSystem({
	// 		url: "http://localhost:3002/remoteEntry.js",
	// 		scope: "components",
	// 		module: "./showUsers"
	// 	});
	// }

	if(!apolloClient) {
		return null;
	}

	return (
		<ApolloProvider client={apolloClient}>
			<div>
				<React.Suspense fallback="Header is loading">
					<Header />
				</React.Suspense>

				{/* <button onClick={setApp2}>Load app 1 widget</button> */}

				{/* <div>
					<System system={system}/>
				</div> */}
				<BrowserRouter>
					<Routes routes={routes}/>
				</BrowserRouter>
			</div>
		</ApolloProvider>
	);
}

export default App;

