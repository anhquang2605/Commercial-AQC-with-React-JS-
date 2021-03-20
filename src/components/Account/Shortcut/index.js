import React, {useState, useEffect} from 'react';
import {IoIosArrowDropdownCircle} from "react-icons/io";
import {Link} from 'react-router-dom';
import './shortcut.scss';
const Shortcut = (props) => {
    let revealDropDown = () =>{
        let dropdown = document.getElementById("drop-down-account-detail");
        dropdown.classList.remove("display-none");
    }
    useEffect(() => {
       document.addEventListener("click", function(e){
           e.stopPropagation();
        let dropdown = document.getElementById("drop-down-account-detail");
           if(!dropdown.classList.contains("display-none")){
            if(!e.target.matches(".more-detail-btn")){
                dropdown.classList.add("display-none"); 
            };}

        });
        return () => {
        };
    }, []);
    return (
        <div className="account-shortcut">
            <div className="mini-information">
                <span className="hello-user">Hello {props.username}</span>
                <span className="more-detail-btn"  onClick={revealDropDown}><IoIosArrowDropdownCircle></IoIosArrowDropdownCircle></span>
            </div>
            <div className="dropdown-account-nav display-none" id="drop-down-account-detail">
                <ul>
                    <li><Link to="/account">Account info</Link></li>
                    <li><Link to="/account/orders">Your Orders</Link></li>
                    <li><Link to="/account/cards">Your Payment</Link></li>
                    <li><Link to="/account/gcards">Your Gift Cards</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Shortcut;
