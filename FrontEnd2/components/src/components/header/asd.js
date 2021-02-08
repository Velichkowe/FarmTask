import  React, { useState } from 'react';
import ApolloProvider from '../../apolloProvider/apolloProvider';
import HeaderComponent from './header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import { Button, Col, Row, Table } from 'react-bootstrap';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import './header.css';

// import GET_ALL_USERS from '../../requests/getAllUsers';

const  Header = () => {
	// const { data } = useQuery(GET_ALL_USERS);

	// const [showAllUsersToggle, setShowAllUsersToggle] = useState(false);

	// const handleShowUsers = () => {
	// 	setShowAllUsersToggle(!showAllUsersToggle);
	// }

	return (
		<ApolloProvider>
			{/* <HeaderComponent /> */}
			<BrowserRouter>
				<Route path="/test" component={HeaderComponent} />
			</BrowserRouter>
		</ApolloProvider>
	);
};

export  default  Header;
