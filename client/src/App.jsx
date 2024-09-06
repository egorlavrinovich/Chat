import {Route, Routes} from "react-router-dom";
import {Main} from "./components/routes/Main/Main.jsx";
import {Chat} from "./components/routes/Chat/Chat.jsx";
import './App.scss'

const ROUTES_MAP = [
    {
        path: '/',
        component: <Main/>
    },
    {
        path: '/chat',
        component: <Chat/>
    }]

function App() {

    return (
        <Routes>
            {ROUTES_MAP.map(({path, component}) => <Route path={path} element={component}/>)}
        </Routes>
    )
}

export default App
