import React from 'react';

const FarmRows = ({ elem, handleSelectRow }) => {
    return (
        <>
            <tr 
                className="table__farms-row"
                onClick={() => handleSelectRow(elem)}
            >
                <td>{elem.name}</td>
                <td>{elem.country.name}</td>
            </tr>
        </>
    )
}

export default FarmRows;
