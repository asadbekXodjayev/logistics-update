import React from 'react';
import PrivacyCom from '../../components/PrivacyCom/PrivacyCom.jsx';
import PageTransition from '../../components/Motion/PageTransition.jsx';
import '../Pages.css';

const Privacy = () => {
    return (
        <PageTransition>
            <div className="privacy-page">
                <PrivacyCom />
            </div>
        </PageTransition>
    );
};

export default Privacy;
