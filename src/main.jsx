import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {BlogProvider} from "./Context.jsx";
import {TrackModalProvider} from "./components/TrackModal/TrackModalContext.jsx";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <BlogProvider>
            <TrackModalProvider>
                <App/>
            </TrackModalProvider>
        </BlogProvider>
    </BrowserRouter>,
)
