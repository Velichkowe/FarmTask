import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Farms from '../farms/farms';
import CreateFarm from '../createFarm/createFarm';
import UpdateFarm from '../updateFarm/updateFarm';

import './showFarms.css';
import Buttons from './buttons';
import CountryRegionDropdown from '../countryRegionDropdown/countryRegionDropdown';
import { Col, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { GET_LOGGED_USER } from '../../constants/gqlUserConstants';
import { GET_ALL_USER_REGIONS_BY_USER_ID } from '../../constants/gqlUserLocationConstants';
import { GET_USER_COUNTRIES_BY_USER_REGION_ID } from '../../constants/gqlUserLocationConstants';
import { GET_ROLE_BY_ID } from '../../constants/gqlRoleConstants';

const ShowFarms = () => {
    const [user, setUser] = useState();
    const [userRole, setUserRole] = useState({
        id: -1,
        name: ''
    });
    const [userRegions, setUserRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState({
        id: -1,
        name: 'Regions'
    });
    const [selectedCountry, setSelectedCountry] = useState({
        id: -1,
        name: 'Countries'
    });
    const [userCountries, setUserCountries] = useState([]);

    const [getAllUserRegions] = useLazyQuery(GET_ALL_USER_REGIONS_BY_USER_ID, {
        fetchPolicy: 'network-only',
        onCompleted(data) {
            setUserRegions(data.userRegionsByUserId);
        }
    });

    const [getAllUserCountries] = useLazyQuery(GET_USER_COUNTRIES_BY_USER_REGION_ID, {
        fetchPolicy: 'network-only',
        onCompleted(data) {
            setUserCountries(data.userCountriesByUser_RegionId);
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

    const [getRoleById] = useLazyQuery(GET_ROLE_BY_ID, {
        fetchPolicy: 'network-only',
        onCompleted(data) {
            setUserRole(data.getRoleById);
            setUser({...user, roleName: data.getRoleById.name});
            let userId;

            if(data.getRoleById.name === "employee") {
                userId = parseInt(user.userId);
            }
            else {
                userId = parseInt(user.id);
            }

            getAllUserRegions({
                variables: {
                    userId
                }
            })
        }
    });

    const handleSelectRegion = (elem) => {
        setSelectedRegion(elem.region);
        setSelectedCountry({ id: -1, name: 'Country' });
        let userId;
        
        if(userRole.name === "employee") {
            userId = parseInt(user.userId);
        }
        else {
            userId = parseInt(user.id);
        }

        getAllUserCountries({
            variables: {
                userId,
                regionId: parseInt(elem.region.id)
            }
        });
    }

    const handleSelectCountry = (elem) => {
        setSelectedCountry(elem.country);
    }
    
    return (
        <>
            <BrowserRouter>
                <Col sm={3} md={3} lg={3} className="region_country-picker">
                    <div className="component_head">
                        <h2>Assigned Regions & Countries</h2>
                    </div>
                    
                    <div className="picker">
                        <div className="picker__label">
                            <p>Pick a region</p>
                        </div>

                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {selectedRegion.name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {userRegions.map((elem, idx) => {
                                    return (
                                        <CountryRegionDropdown 
                                            key={idx}
                                            handleSelectRegion={(e) => handleSelectRegion(elem)}
                                            elem={elem}
                                        />
                                    )
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className="picker">
                        <div className="picker__label">
                            <p>Pick a country</p>
                        </div>

                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {selectedCountry.name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {userCountries.length === 0 ? 
                                    <p>No countries for that region</p>
                                    : 
                                    userCountries.map((elem, idx) => {
                                        return (
                                            <CountryRegionDropdown 
                                                key={idx}
                                                handleSelectRegion={(e) => handleSelectCountry(elem)}
                                                elem={elem}
                                            />
                                        )
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    
                    <Buttons 
                        selectedRegion={selectedRegion}
                        selectedCountry={selectedCountry}
                        user={user}
                    />
                </Col>

                <Switch>
                    <Route exact path="/farms" component={Farms}/>
                    <Route exact path="/createFarm" component={CreateFarm}/>
                    <Route exact path="/updateFarm" component={UpdateFarm}/>
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default ShowFarms;
