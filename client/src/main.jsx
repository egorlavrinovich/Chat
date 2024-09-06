import './index.scss'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import {ConfigProvider} from "antd";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ConfigProvider theme={{
            token: {
                fontFamily: 'monospace',
                colorText: 'rgb(17,17,206)',
                colorBgContainer: 'rgba(255,255,255,0.45)'
            },
            components: {
                Form: {
                    itemMarginBottom: '12px'
                },
                Input: {
                    activeBg: 'rgba(255,255,255,0.15)',
                    hoverBg: 'rgba(255,255,255,0.15)'
                }
            }
        }}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ConfigProvider>
    </StrictMode>,
)
