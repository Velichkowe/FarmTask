import React, { useState } from 'react';

import { Button, Col, Row, Table, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import FarmRows from '../../fields/farmRows/farmRows';
import ShowMachines from '../machines/showMachines';
import CreateMachine from '../createMachine/createMachine';
import MachineActions from '../machineActions/machineActions';
import '../../fields/showFarmFields/showFarmFields.css';
import './showFarmMachines.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { GET_LOGGED_USER } from '../../constants/gqlUserConstants';
import { GET_FARMS_BY_USER_ID } from '../../constants/gqlFarmConstants';

const ShowFarmMachines = () => {
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
    
    useQuery(GET_LOGGED_USER, {
        onCompleted(data) {
            getFarmsByUserId({
                variables: {
                    userId: parseInt(data.getLoggedUser.id)
                }
            });
        },
        fetchPolicy: "network-only"
    });

    const handleSelectRow = (farm) => {
        setSelectedFarm(farm);
    }

    return (
        <BrowserRouter>
            <Col sm={3} md={3} lg={3} className="margin-top">
                <div>
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
                    </div>
                            
                    <div>
                        <MachineActions 
                            selectedFarm={selectedFarm}
                        />
                    </div>
                </div> 
            </Col>

            <Switch>
                <Route exact path="/machines" component={ShowMachines} />
                <Route exact path="/createMachine" component={CreateMachine} />
            </Switch>
        </BrowserRouter>
    )
}

export default ShowFarmMachines;
