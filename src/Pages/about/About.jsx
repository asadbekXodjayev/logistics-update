import React from 'react';
import AboutCom from '../../components/AboutCom/AbourtCom.jsx';
import PageTransition from '../../components/Motion/PageTransition.jsx';
import '../Pages.css';

const About = () => {
    return (
        <PageTransition>
            <div className="about-page">
                <AboutCom />
            </div>
        </PageTransition>
    );
};

export default About;
