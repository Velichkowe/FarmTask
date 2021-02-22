import React from 'react';
import { useHistory } from 'react-router-dom';

const MachineRows = ({ elem, handleDeleteRow }) => {
    const history = useHistory();

    const handleUpdateMachine = (machine) => {
        history.push('/updateMachine', machine);
    }
    
    return (
        <tr>
            <td>{elem.name}</td>
            <td>{elem.machineType.name}</td>
            <td>{elem.grainTankCapacity || '---'}</td>
            <td>{elem.maxHp || '---'}</td>
            <td>{elem.maxCutWidth || '---'}</td>
            <td>{elem.unloadingSpeed || '---'}</td>
            <td>{elem.maxLiftCapacity || '---'}</td>
            <td>{elem.transmission || '---'}</td>
            <td>{elem.engine || '---'}</td>
            <td>{elem.pickUpWidth || '---'}</td>
            <td>{elem.plungerSpeed || '---'}</td>
            <td>
                <div className="btn__delete-item">
                    <div 
                        className="btn__delete"
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
                        onClick={(e) => handleUpdateMachine(elem)}
                    >
                        Edit
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default MachineRows;