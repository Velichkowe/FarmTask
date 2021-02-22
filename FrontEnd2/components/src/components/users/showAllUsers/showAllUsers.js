import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import UserRegions from '../userRegions/userRegions';
import { getAllUsers } from '../../../requests/getAllUsers';
import UserRows from '../userRows/userRows';
import { UPDATE_USER } from '../../../requests/saveUser';
import { loadToastSuccess, loadToastError } from '../../loadToast/loadToast';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Table, Dropdown } from 'react-bootstrap';
import './showAllUsers.css';

const APPROVED = 'Approved';
const NOT_APPROVED = 'Not Approved';
const ALL = 'All';
const APPROVE_ERROR = 'There was an error with user approval :( !';
const APPROVE_SUCCESS = 'User approval is successful :) !';

const ShowAllUsers = () => {
    let data = getAllUsers();

    const [updateUser] = useMutation(UPDATE_USER, {
        onError(err) {
            loadToastError(APPROVE_ERROR);
        },
        onCompleted(data) {
            loadToastSuccess(APPROVE_SUCCESS);
        }
    });

    const [users, setUsers] = useState();
    const [filterText, setFilterText] = useState(ALL);

    if(!data) {
        return null;
    }

    if(!users) {
        setUsers(data.users);

        return null;
    }
    
    const filterByAll = () => {
        setUsers(data.users);
        setFilterText(ALL);
    }

    const filterByApproved = () => {
        setUsers(data.users.filter(elem => elem.isApproved == true));
        setFilterText(APPROVED);
    }
    
    const filterByNotApproved = () => {
        setUsers(data.users.filter(elem => elem.isApproved == false));
        setFilterText(NOT_APPROVED);
    }

    const updateApproved = (user) => {
        let newUsers = users.map((elem) => { return { ...elem } });
        
        newUsers.find(elem => elem.userId === user.userId).isApproved = !user.isApproved;
        updateUser({
            variables: {
                userId: user.userId,
                isApproved: user.isApproved ? 0 : 1
            }
        });

        setUsers(newUsers);
    }

    return (
        <div className="users">
            <BrowserRouter>
                <Col sm={8} md={8} lg={8} className="table-field">
                    <Table striped hover responsive className="table-background">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Role</th>
                                <th>Approved</th>
                                <th>Approve</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((elem, idx) => <UserRows key={idx} elem={elem} updateApproved={updateApproved} />)}
                        </tbody>
                    </Table>

                    <div className="filter__options">
                        <Dropdown className="dropdown__menu">
                            <Dropdown.Toggle className="toggle__button">
                                {filterText}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => filterByAll()}>All</Dropdown.Item>
                                <Dropdown.Item onClick={() => filterByApproved()}>Approved</Dropdown.Item>
                                <Dropdown.Item onClick={() => filterByNotApproved()}>Not Approved</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Col>

                <Switch>
                    <Route path="/userRegion" component={UserRegions} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default ShowAllUsers;
