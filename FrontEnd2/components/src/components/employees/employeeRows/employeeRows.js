import React from 'react';

const EmployeeRows = ({ elem, handleSelectRow}) => {
    return (
        <>
            <tr 
                className="table__row"
                onClick={() => handleSelectRow(elem)}
            >
                <td>{elem.firstName}</td>
                <td>{elem.lastName}</td>
                <td>{elem.email}</td>
            </tr>
        </>
    )
}

export default EmployeeRows;