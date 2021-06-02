import React,{useEffect, useState} from 'react';
import EmailForm from './EmailForm';
import ContactInfo from './ContactInfo';
import {RiProfileLine} from 'react-icons/ri';
import {MdEmail} from 'react-icons/md';
const ContactUs = (props) => {

    return (
        <div className="contact-us">
            <h4> Contact Us</h4>
            <h6 className="contact-title"><RiProfileLine></RiProfileLine>Contact Information</h6>
            <ContactInfo></ContactInfo>
            <h6 className="contact-title"><MdEmail></MdEmail> sent us an email!</h6>
            <EmailForm account={props.account}></EmailForm>
        </div>
    );
}

export default ContactUs;
