import React from 'react';

const FieldRows = ({ elem, handleDeleteRow }) => {
    return (
        <tr>
            <td>{elem.name}</td>
            <td>{elem.crop.name}</td>
            <td>{elem.soil.name}</td>
            <td>
                <div className="btn__delete-item">
                    <div 
                        className="btn__delete"
                        id={elem.id} 
                        onClick={(e) => handleDeleteRow(elem)}
                    >
                        x
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default FieldRows;