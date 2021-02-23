import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useState } from 'react';

import FarmRows from '../farmRows/farmRows';
import ShowFields from '../fields/showFields';
import FieldActions from '../fieldsActions/fieldsActions';
import CreateField from '../createField/createField';
import UpdateField from '../updateField/updateField';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Col, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './showFarmFields.css'

import { GET_LOGGED_USER } from '../../constants/gqlUserConstants';
import { GET_FARMS_BY_USER_ID } from '../../constants/gqlFarmConstants';
import { GET_ROLE_BY_ID } from '../../constants/gqlRoleConstants';

const ShowFarmFields = (props) => {
    const [user, setUser] = useState();
    const [farms, setFarms] = useState([]);
    const [selectedFarm, setSelectedFarm] = useState({
        id: -1,
        name: ''
    });
    
    const [getFarmsByUserId] = useLazyQuery(GET_FARMS_BY_USER_ID, {
        onCompleted(data) {
            setFarms(data.getFarmsByUserId);

        },
        fetchPolicy: "network-only"
    });
    
    const [getRoleById] = useLazyQuery(GET_ROLE_BY_ID, {
        fetchPolicy: 'network-only',
        onCompleted(data) {
            setUser({...user, roleName: data.getRoleById.name});
            let userId;

            if(data.getRoleById.name === "employee") {
                userId = parseInt(user.userId);
            }
            else {
                userId = parseInt(user.id);
            }

            getFarmsByUserId({
                variables: {
                    userId
                }
            });
        }
    });
    
    useQuery(GET_LOGGED_USER, {
        onCompleted(data) {
            setUser(data.getLoggedUser);

            getRoleById({
                variables: {
                    id: data.getLoggedUser.roleId
                }
            })
        },
        fetchPolicy: "network-only"
    });

    const handleSelectRow = (farm) => {
        setSelectedFarm(farm);
    }

    if(!user) {
        return null;
    }
    
    return (
        <>
            <BrowserRouter>
                <Col sm={3} md={3} lg={3} className="show_farm_fields">
                    <h1>All farms</h1>

                    <div className="table__farms">
                        <Table striped hover responsive className="table--background">
                            <thead>
                                <tr>
                                    <th>Farm name</th>
                                    <th>Country name</th>
                                </tr>
                            </thead>

                            <tbody>
                                {farms.map((elem, idx) => {
                                    return (
                                        <FarmRows 
                                            key={idx} 
                                            elem={elem}
                                            handleSelectRow={handleSelectRow}
                                        />
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>

                    <div>
                        <p>Selected farm: {selectedFarm.name}</p>

                        <FieldActions 
                            selectedFarm={selectedFarm}
                            user={user}
                        />
                    </div>
                </Col>

                <Switch>
                    <Route exact path="/fields" component={ShowFields} />
                    <Route exact path="/createField" component={CreateField} />
                    <Route exact path="/updateField" component={UpdateField} />
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default ShowFarmFields;
