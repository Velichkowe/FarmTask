import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './userRows.css';

const UserRows = ({ elem, updateApproved }) => {
    const [checked, setChecked] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setChecked(elem.isApproved);
    }, [elem])

    const showUserDetails = (e) => {
        if(e.target.id !== "btn") {
            history.push('/userRegion', elem);
        }
    }

    return (
        <tr className="table__user-row" onClick={showUserDetails}>
            <td>{elem.firstName}</td>
            <td>{elem.lastName}</td>
            <td>{elem.role.name}</td>
            <td>{checked ? 'Yes' : 'No'}</td>
            <td>
                <button 
                    id="btn" 
                    onClick={() => updateApproved(elem)} 
                    className={`button__approve ${checked ? 'button__checked' : 'button__unchecked'}`} 
                />
            </td>
        </tr>
    );
}

export default UserRows;
