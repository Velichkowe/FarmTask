import React from 'react';
import { useHistory } from 'react-router-dom';

import './leftSideBar.css';
import UsersLogo from '../../../assets/users.png';
import FarmsLogo from '../../../assets/farms.png';
import FieldsLogo from '../../../assets/fields.png';
import MachinesLogo from '../../../assets/machines.png';
import AddUser from '../../../assets/addUser.png';

const LeftSideBar = ({ role, user }) => {
    const history = useHistory();

    return (
        <>
            <div className="sidebar">
                <ul className="sidebar__menu">
                    {role.name === 'admin' ? 
                        (
                            <li>
                                <button onClick={() => history.push('/showUsers')} className="button__show-all">
                                    <img className="side-menu-button" src={UsersLogo} alt="Users Logo" />
                                </button>
                            </li> 
                        ) : null
                    }

                    <li>
                        <button onClick={() => history.push('/showFarms')} className="button__show-all">
                            <img className="side-menu-button" src={FarmsLogo} alt="Farms logo" />
                        </button>
                    </li>

                    <li>
                        <button onClick={() => history.push('/showFarmFields', user)} className="button__show-all">
                            <img className="side-menu-button" src={FieldsLogo} alt="Fields logo" />
                        </button>
                    </li>

                    <li>
                        <button onClick={() => history.push('/showFarmMachines', user)} className="button__show-all">
                            <img className="side-menu-button" src={MachinesLogo} alt="Machines logo" />
                        </button>
                    </li>
                    
                    {role.name !== 'employee' ? (
                        <li>
                            <button onClick={() => history.push('/showEmployees', user)} className="button__show-all">
                                <img className="side-menu-button" src={AddUser} alt="Add user logo" />
                            </button>
                        </li>
                    ) : null }
                </ul>
            </div>
        </>
    )
}

export default LeftSideBar;
