import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, useHistory } from 'react-router-dom';
import { loadToastError } from '../../loadToast/loadToast';
import './farmRows.css';

const NO_RIGHT_ERROR = "You don't have right to use this option !";

const FarmRows = ({ elem, handleDeleteFarm, user }) => {
    const history = useHistory();

    const handleUpdateFarm = (elem) => {
        if(user.roleName === "employee") {
            loadToastError(NO_RIGHT_ERROR);
            
            return;
        }

        history.push('/updateFarm', elem);
    }

    return (
        <>
            <tr className="table__farm-row">
                <td>{elem.name}</td>
                <td>{elem.country.name}</td>

                <td>
                    <div className="btn__item">
                        <div 
                            className="btn__delete"
                            id={elem.id} 
                            onClick={(e) => handleDeleteFarm(elem)}
                        >
                            x
                        </div>
                    </div>
                </td>

                <td>
                    <div className="btn__item">
                        <div 
                            className="btn__update"
                            id={elem.id} 
                            onClick={(e) => handleUpdateFarm(elem)}
                        >
                            Edit
                        </div>
                    </div>
                </td>
            </tr>
        </>
    );
}

export default FarmRows;
