import React from 'react';
import './contact-information.scss';
import ContactBox from './ContactBox';
import MapLocation from './MapLocation';
const ContactInfo = () => {
    return (
        <div className="contact-information">
            <ContactBox></ContactBox>
            <MapLocation></MapLocation>
        </div>
    );
}

export default ContactInfo;
