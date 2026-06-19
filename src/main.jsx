import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {BlogProvider} from "./Context.jsx";
import {TrackModalProvider} from "./components/TrackModal/TrackModalContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <ErrorBoundary>
                <BlogProvider>
                    <TrackModalProvider>
                        <App/>
                    </TrackModalProvider>
                </BlogProvider>
            </ErrorBoundary>
        </BrowserRouter>
    </StrictMode>,
)
