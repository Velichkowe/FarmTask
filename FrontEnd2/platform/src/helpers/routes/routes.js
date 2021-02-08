import React from 'react';
import { Route } from "react-router-dom"
import BasicComponent from '../../components/basicComponents';

const routes = [
    {
        route: '/showUsers',
        componentName: 'showAllUsers'
    }
]

export const getRoutes = () => {
    const results = [];

    routes.forEach((element, index) => {
        // const RouteComponent = Route;
        
        results.push(
            <Route
                exact
                path={`/${element.route}`}
                key={element.route + index}
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