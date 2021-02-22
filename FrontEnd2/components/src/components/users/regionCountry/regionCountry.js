import React from 'react';
import { ListGroup } from 'react-bootstrap';

const RegionCountry = ({ elem, userId, handleDeleteRow, handleSelectRegion }) => {
    return (
        <div className="list__group--flex">
            <ListGroup.Item
                className={`list-group__item`}
                onClick={() => handleSelectRegion ? handleSelectRegion(elem) : undefined}
            >
                <div className="region__name">
                    <p>{elem.name}</p>
                </div>
            </ListGroup.Item>

            <div className="btn__delete-item">
                <div 
                    className="btn__delete"
                    id={elem.id} 
                    onClick={(e) => handleDeleteRow(elem)}
                >
                    x
                </div>
            </div>
        </div>
    )
}

export default RegionCountry;
