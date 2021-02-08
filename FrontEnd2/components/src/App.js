import  React from 'react';
import ApolloProvider from './apolloProvider/apolloProvider';
import Test from './components/users/showAllUsers';
// import HeaderComponent from './header';
// import Test from './components/test/test';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<>
			<ApolloProvider>
				
			</ApolloProvider>
		</>
	);
}

export default App;
