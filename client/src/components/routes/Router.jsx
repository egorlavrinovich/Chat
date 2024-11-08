import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Auth} from "./Main/Auth.jsx";
import {Chat} from "./Chat/Chat.jsx";

const ROUTES_MAP = [
    {
        path: '/',
        component: <Auth/>
    },
    {
        path: '/chat',
        component: <Chat/>
    }]


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {ROUTES_MAP.map(({path, component}) => <Route key={path} path={path} element={component}/>)}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;