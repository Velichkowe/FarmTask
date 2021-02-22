import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, useHistory } from 'react-router-dom';

import './farmRows.css';

const FarmRows = ({ elem, handleDeleteFarm }) => {

    return (
        <>
            <tr className="table__farm-row">
                <td>{elem.name}</td>
                <td>{elem.country.name}</td>

                <td>
                    <div className="btn__delete-item">
                        <div 
                            className="btn__delete"
                            id={elem.id} 
                            onClick={(e) => handleDeleteFarm(elem)}
                            
                        >
                            x
                        </div>
                    </div>
                </td>
            </tr>
        </>
    );
}

export default FarmRows;