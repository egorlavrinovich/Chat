import './App.scss'
import io from "socket.io-client";
import {ConfigProvider} from "antd";
import Router from "./components/routes/Router.jsx";
import {theme} from "./constants/theme.js";

export const initSocket = () => io.connect(import.meta.env.VITE_WS_HOST)

function App() {
    return (
        <ConfigProvider theme={theme}>
            <Router/>
        </ConfigProvider>
    )
}

export default App
