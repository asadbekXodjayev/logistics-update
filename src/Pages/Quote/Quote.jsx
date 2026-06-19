import React from 'react';
import QuoteCom from '../../components/QuoteCom/QuoteCom.jsx';
import PageTransition from '../../components/Motion/PageTransition.jsx';

const Quote = () => {
    return (
        <PageTransition>
            <QuoteCom />
        </PageTransition>
    );
};

export default Quote;
