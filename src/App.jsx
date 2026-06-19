// src/App.jsx
import React, { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import NavbarCom from "./components/NavbarCom/NavbarCom.jsx";
import ScrollToTop from "./Pages/Scroll To Top/ScrollToTop.jsx";
import FooterCom from "./components/FooterCom/FooterCom.jsx";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import RouteFallback from './components/RouteFallback/RouteFallback.jsx';

// Routes are code-split so each page (and heavy deps like MUI on
// /admin + /login) loads on demand instead of in the initial bundle.
const Home = lazy(() => import("./Pages/home/Home.jsx"));
const About = lazy(() => import("./Pages/about/About.jsx"));
const Job = lazy(() => import("./Pages/job/Job.jsx"));
const Contacts = lazy(() => import("./Pages/contact/Contacts.jsx"));
const News = lazy(() => import("./Pages/News/News.jsx"));
const Service = lazy(() => import("./Pages/Service/Service.jsx"));
const Privacy = lazy(() => import("./Pages/privacy/privacy.jsx"));
const Quote = lazy(() => import("./Pages/Quote/Quote.jsx"));
const Login = lazy(() => import('./Pages/Login/Login.jsx'));
const AdminPanel = lazy(() => import('./Pages/Admin/AdminPanel.jsx'));
const NotFound = lazy(() => import("./Pages/404/NotFound.jsx"));

function App() {
    const location = useLocation();

    return (
        <div className="app">
            {/* <Construction/> */}
            <ScrollToTop />
            <NavbarCom />
            <main className="main-app">
                <Suspense fallback={<RouteFallback />}>
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/apply" element={<Job />} />
                            <Route path="/contact" element={<Contacts />} />
                            <Route path="/trucks" element={<News />} />
                            <Route path="/services" element={<Service />} />
                            <Route path="/quote" element={<Quote />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </AnimatePresence>
                </Suspense>
            </main>
            <FooterCom />
        </div>
    );
}

export default App;
