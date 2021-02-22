import React, { useState, useEffect } from 'react';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';

import RegionCountry from '../regionCountry/regionCountry';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Dropdown, ListGroup } from 'react-bootstrap';
import './userRegions.css';
import { getAllRegions } from '../../../requests/getAllRegions';

const ADD_USER_REGION = gql`
    mutation addUserRegion(
        $userId: Int!
        $regionId: Int!
    ) {
        addUserRegion(
            userId: $userId
            regionId: $regionId
        ) {
            region { id name }
        }
    }
`;

const ADD_USER_COUNTRY = gql`
    mutation addUserCountry(
        $userId: Int!
        $countryId: Int!
        $regionId: Int!
    ) {
        addUserCountry(
            userId: $userId
            countryId: $countryId
            regionId: $regionId
        ) {
            id userId regionId
            country { id name }
        }
    }
`;

const GET_ALL_USER_REGIONS_BY_USER_ID = gql`
    query userRegionsByUserId(
        $userId: Int!
    ) {
        userRegionsByUserId(
            userId: $userId
        ) {
            region {
                id name
            }
        }
    }
`;

const DELETE_USER_REGION = gql`
    mutation deleteUserRegion(
        $userId: Int!
        $regionId: Int!
    ) {
        deleteUserRegion(
            userId: $userId
            regionId: $regionId
        ) { id }

        deleteUserCountryByRegion(
            userId: $userId
            regionId: $regionId
        ) { id }
    }
`;

const DELETE_USER_COUNTRY = gql`
    mutation deleteUserCountry(
        $userId: Int!
        $countryId: Int!
    ) {
        deleteUserCountry(
            userId: $userId
            countryId: $countryId
        ) { id }
    }
`;

const GET_ALL_COUNTRIES_BY_REGION = gql`
    query countriesByRegionId(
        $regionId: Int!
    ) {
        countriesByRegionId(
            regionId: $regionId
        ) {
            id name
        }
    }
`;

const GET_USER_COUNTRIES_BY_USER_REGION_ID = gql`
    query userCountriesByUser_RegionId(
        $userId: Int!
        $regionId: Int!
    ) {
        userCountriesByUser_RegionId(
            userId: $userId
            regionId: $regionId
        ) {
            country { 
                id name 
            }
        }
    }
`;

const UserRegions = ( props ) => {
    const { location: { state } } = props;
    const regionsData = getAllRegions();

    useEffect(() => {
        setAllCountriesByRegion([]);
        setUserCountriesByUser_Region([]);
    }, [state])

    const [userRegions, setUserRegions] = useState();
    const [allCountriesByRegion, setAllCountriesByRegion] = useState([]);
    const [userCountriesByUser_Region, setUserCountriesByUser_Region] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState({
        id: 0
    });
    const { loading: userRegionLoading } = useQuery(GET_ALL_USER_REGIONS_BY_USER_ID, {
        variables: {
            userId: parseInt(state.id)
        },
        fetchPolicy: 'network-only',
        onCompleted(data) {
            setUserRegions(data.userRegionsByUserId);
        }
    });

    const [getAllCountriesByRegionQuery] = useLazyQuery(GET_ALL_COUNTRIES_BY_REGION, {
        fetchPolicy: 'network-only',
        onCompleted(data) {
            setAllCountriesByRegion(data.countriesByRegionId);
        }
    });

    const [getAllUserCountriesByUser_RegionId] = useLazyQuery(GET_USER_COUNTRIES_BY_USER_REGION_ID, {
        fetchPolicy: 'network-only',
        onCompleted(data) {
            setUserCountriesByUser_Region(data.userCountriesByUser_RegionId);
        }
    });

    const [addNewUserRegion] = useMutation(ADD_USER_REGION, {
        onError(err) {
            console.log(err);
        },
        onCompleted(data) {
            if(!data.addUserRegion) {
                toast.error('Region already assigned !', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                toast.success('Region assigned successfully !', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setUserRegions([...userRegions, { region: { ...data.addUserRegion.region }} ]);
            }
        }
    });
    
    const [addNewUserCountry] = useMutation(ADD_USER_COUNTRY, {
        onError(err) {
            console.log(err);
        },
        onCompleted(data) {
            if(!data.addUserCountry) {
                toast.error('Country already assigned !', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                toast.success('Country assigned successfully !', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setUserCountriesByUser_Region([...userCountriesByUser_Region, { country: { ...data.addUserCountry.country }} ]);
            }
        }
    });

    const [delUserRegion] = useMutation(DELETE_USER_REGION, {
        onError(err) {
            console.log('delete error', err);
        },
        onCompleted(data) {
            setUserCountriesByUser_Region([]);
        }
    });
    
    const [delUserCountry] = useMutation(DELETE_USER_COUNTRY, {
        onError(err) {
            console.log('delete error', err);
        }
    });
    
    if(!regionsData || !userRegions) {
        return null;
    }
    
    const regions = [...regionsData.regions];


    const handleAddRegion = (elem) => {
        addNewUserRegion({
            variables: {
                userId: parseInt(state.id),
                regionId: parseInt(elem.id)
            }
        });
    }

    const handleAddCountry = (elem) => {
        addNewUserCountry({
            variables: {
                userId: parseInt(state.id),
                countryId: parseInt(elem.id),
                regionId: parseInt(selectedRegion.id)
            }
        });
    }

    const handleDeleteUserRegion = (elem) => {
        delUserRegion({
            variables: {
                userId: parseInt(state.id),
                regionId: parseInt(elem.id)
            }
        });
        toast.success('Region removed successfully !', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setUserRegions(userRegions.filter(e => parseInt(e.region.id) !== parseInt(elem.id)));
    }

    const handleDeleteUserCountry = (elem) => {
        delUserCountry({
            variables: {
                userId: parseInt(state.id),
                countryId: parseInt(elem.id)
            }
        });
        setUserCountriesByUser_Region(userCountriesByUser_Region.filter(e => parseInt(e.country.id) !== parseInt(elem.id)));
    }

    const handleSelectRegion = (region) => {
        getAllCountriesByRegionQuery({
            variables: {
                regionId: parseInt(region.id)
            }
        });
        getAllUserCountriesByUser_RegionId({
            variables: {
                userId: parseInt(state.id),
                regionId: parseInt(region.id)
            }
        });
        setSelectedRegion(region);
    }

	return (
        <div className="user__region-country">
            <Col lg={12} md={12} sm={12}>
                <h1><u>{state.firstName + ' ' + state.lastName}</u></h1>
                
                <div className="user__regions-country">
                    <div className="user__assigned-regions-country">
                        <h2>Assigned Regions</h2>

                        {userRegions.length === 0 ?
                            <p>No regions assigned !</p> 
                            :
                            <ListGroup className="list__group">
                                {userRegions.map(
                                    (elem, idx) => {
                                        return (
                                            <RegionCountry 
                                                key={idx} 
                                                elem={elem.region} 
                                                userId={state.id}
                                                handleDeleteRow={handleDeleteUserRegion}
                                                handleSelectRegion={handleSelectRegion}
                                            />
                                        )
                                    }
                                )}
                            </ListGroup>
                        }
                    </div>

                    <div className="user__assign-region-country">
                        <div>
                            <p>Add region</p>

                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Regions
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {regions.map((elem, idx) => {
                                        return (
                                            <Dropdown.Item key={idx} onClick={() => handleAddRegion(elem)}>{elem.name}</Dropdown.Item>
                                        )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            
                <div className="user__regions-country">
                    <div className="user__assigned-regions-country">
                        <h2>Assigned countries</h2>

                        {userCountriesByUser_Region.length === 0 ?
                            <p>No countries assigned or no region selected</p> 
                            :
                            <ListGroup className="list__group">
                                {userCountriesByUser_Region.map(
                                    (elem, idx) => {
                                        return (
                                            <RegionCountry 
                                                key={idx} 
                                                elem={elem.country} 
                                                userId={state.id}
                                                handleDeleteRow={handleDeleteUserCountry}    
                                            />
                                        )
                                    }
                                )}
                            </ListGroup>
                        }
                    </div>

                    <div className="user__assign-region-country">
                        <div>
                            <p>Add Country</p>

                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Countries
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {allCountriesByRegion.length === 0 ?
                                        <Dropdown.Item>No countries for that region</Dropdown.Item>
                                        
                                        : 
                                        allCountriesByRegion.map((elem, idx) => {
                                            return (
                                                <Dropdown.Item key={idx} onClick={() => handleAddCountry(elem)}>{elem.name}</Dropdown.Item>
                                            )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </Col>
       </div>
    );
};

export  default  UserRegions;
