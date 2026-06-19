import React from 'react';
import ContactCom from '../../components/ContactCom/ContactCom.jsx';
import PageTransition from '../../components/Motion/PageTransition.jsx';
import '../Pages.css';

const Contacts = () => {
    return (
        <PageTransition>
            <div className="contacts-container">
                <ContactCom />
            </div>
        </PageTransition>
    );
};

export default Contacts;
