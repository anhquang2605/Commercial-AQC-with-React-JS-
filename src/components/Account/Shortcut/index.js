import React, {useEffect} from 'react';
import {IoIosArrowDropdownCircle} from "react-icons/io";
import {Link} from 'react-router-dom';
import './shortcut.scss';
const Shortcut = (props) => {
    return (
        <div className="account-shortcut">
            <div className="mini-information">
                <span className="hello-user">Hello {props.username}</span>
                <span className="more-detail-btn"><IoIosArrowDropdownCircle></IoIosArrowDropdownCircle></span>
            </div>
            <div className="dropdown-account-nav" id="drop-down-account-detail">
                <ul>
                    <li><Link to="/account/information">Account info</Link></li>
                    <li><Link to="/account/orders">Your Orders</Link></li>
                    <li><Link to="/account/payments">Your Payment</Link></li>
                    <li><Link to="/account/payments">Your Gift Cards</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Shortcut;
