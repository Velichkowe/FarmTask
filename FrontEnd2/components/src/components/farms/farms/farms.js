import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';

import FarmRows from '../farmRows/farmRows';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Table } from 'react-bootstrap';
import './farms.css';

import { loadToastError } from '../../loadToast/loadToast';
import { loadToastSuccess } from '../../loadToast/loadToast';

import { GET_FARMS_BY_USER_COUNTRY_ID } from '../../constants/gqlFarmConstants';
import { DELETE_FARM_BY_ID } from '../../constants/gqlFarmConstants';

const DELETE_SUCCESS = 'Farm deleted Successfully !';
const DELETE_ERROR = 'There was an error deleting this farm !';
const NO_RIGHTS_ERROR = "You don't have right to use this option !";

const Farms = (props) => {
    const { location: { state }} = props;
    const [userFarms, setUserFarms] = useState([]);

    useQuery(GET_FARMS_BY_USER_COUNTRY_ID, {
        variables: {
            userId: state.user.roleName === "employee" ? parseInt(state.user.userId) : parseInt(state.user.id),
            countryId: parseInt(state.country.id)
        },
        onCompleted(data) {
            setUserFarms(data.getUserFarms);
        },
        fetchPolicy: "network-only"
    });

    const [deleteFarm] = useMutation(DELETE_FARM_BY_ID, {
        onCompleted(data) {
            if(data) {
                loadToastSuccess(DELETE_SUCCESS);
            } else {
                loadToastError(DELETE_ERROR);
            }
        }
    })

    const handleDeleteFarm = (elem) => {
        if(state.user.roleName === "employee") {
            loadToastError(NO_RIGHTS_ERROR);
            
            return;
        }

        const id = parseInt(elem.id);

        deleteFarm({
            variables: {
                id
            }
        });

        setUserFarms(userFarms.filter(e => parseInt(e.id) !== id));
    }

    return (
        <Col sm={6} md={6} lg={6} className="show_farms_by_country">
            <div className="field__component">
                <h1>Farms</h1>
                
                <div className="table__farm">
                    <Table striped hover responsive className="table--background">
                        <thead>
                            <tr>
                                <th>Farm name</th>
                                <th>Country name</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>

                        <tbody>
                            {userFarms.map((elem, idx) => {
                                return (
                                    <FarmRows 
                                        key={idx} 
                                        elem={elem} 
                                        user={state.user}
                                        handleDeleteFarm={handleDeleteFarm}
                                    />
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </Col>
    )
}

export default Farms;
