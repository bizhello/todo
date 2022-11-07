import React from "react";
import { Routes, Route, Navigate} from 'react-router-dom';
import routes from '../router/routes';

const AppRouter = ()=> {
    return(
        <>
        <Routes>
            {routes.map(route => 
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.component}
                    exact={route.exact}
                />
            )} 
            <Route
                path="*"
                element={<Navigate to='/posts'/>} />
        </Routes>
    </>
    )
}

export default AppRouter