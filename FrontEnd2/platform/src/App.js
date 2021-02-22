import React, { useState, useEffect } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

import { getRoutes } from './helpers/routes/routes';
import { AUTH_TOKEN } from './components/constants/constants';

import './App.css';
import  { useDynamicScript } from './helpers/federationHelper/federationHelper';
import Login from './components/loginPage/loginPage';
import Register from './components/registerPage/registerPage';
import AppContainer from './components/appContainer/appContainer';

const App = () => {
	const [apolloClient, setApolloClient] = useState(undefined);
	const [routes, setRoutes] = useState();
	const [token, setToken] = useState(localStorage.getItem(AUTH_TOKEN));
	const { failed } = useDynamicScript();

	useEffect(() => {
		const httpLink = createHttpLink({
			uri: 'http://localhost:4000/graphql',
		})

		const authLink = setContext((_, { headers }) => {
			const storedToken = localStorage.getItem(AUTH_TOKEN);

			return {
				headers: {
					...headers,
					authorization: storedToken ? `Bearer ${storedToken}` : '',
				}
			}
		})

		const client = new ApolloClient({
			link: authLink.concat(httpLink),
			cache: new InMemoryCache()
		});

		const routes = getRoutes();
		setRoutes(routes);
		setApolloClient(client);
	}, [])

	if(!apolloClient || failed) {
		return null;
	}

	return (
		<ApolloProvider client={apolloClient}>
			<div>
				<BrowserRouter>
					{!token ? <Redirect to="/login" /> : <Redirect to="/appContainer" />}

					<Switch>
						<Route exact path='/' component={Login}/>
						<Route exact path='/login' component={Login} />
						<Route exact path='/register' component={Register} />
						<Route exact path='/appContainer' component={AppContainer} />
					</Switch>
				</BrowserRouter>
			</div>
		</ApolloProvider>
	);
}

export default App;
