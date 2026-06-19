import React from 'react';
import JobCom from '../../components/JobCom/JobCom.jsx';
import PageTransition from '../../components/Motion/PageTransition.jsx';
import '../Pages.css';

const Job = () => {
    return (
        <PageTransition>
            <div className="job-container">
                <JobCom />
            </div>
        </PageTransition>
    );
};

export default Job;
