import React from 'react';
import { Route } from "react-router-dom"
import BasicComponent from '../../components/basicComponents';

const routes = [
    {
        route: '/showUsers',
        componentName: 'showUsers'
    },
    {
        route: '/showFarms',
        componentName: 'showFarms'
    },
    {
        route: '/showFarmFields',
        componentName: 'showFarmFields'
    },
    {
        route: '/showFarmMachines',
        componentName: 'showFarmMachines'
    },
    {
        route: '/showEmployees',
        componentName: 'showEmployees'
    }
]

export const getRoutes = () => {
    const results = [];

    routes.forEach((element, index) => {
        results.push(
            <Route
                exact
                path={element.route}
                key={element.route}
                render={() => 
                    React.createElement(BasicComponent, {
                        componentName: element.componentName
                    })
                }
            />
        );
    });

    return results;
}