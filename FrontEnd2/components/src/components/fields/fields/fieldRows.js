import React from 'react';
import { useHistory } from 'react-router-dom';
import { loadToastError } from '../../loadToast/loadToast';

const NO_RIGHTS_ERROR = "You don't have right to use this option !";

const FieldRows = ({ elem, handleDeleteRow, user }) => {
    const history = useHistory();
    
    const handleUpdateField = (elem) => {
        if(user.roleName === 'employee') {
            loadToastError(NO_RIGHTS_ERROR);

            return;
        }
        
        history.push('/updateField', elem);
    }

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
            <td>
                <div className="btn__item">
                    <div 
                        className="btn__update"
                        id={elem.id} 
                        onClick={(e) => handleUpdateField(elem)}
                    >
                        Edit
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default FieldRows;