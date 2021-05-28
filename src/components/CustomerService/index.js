import React, {useState, useEffect} from 'react';
import FlexLinks from './../Plugins/FlexLinks';
import SERVICEITEMS from './../../Constants/ServicesItems';
import {AiFillCreditCard} from 'react-icons/ai';
import {MdAssignmentReturn, MdAccountBox} from 'react-icons/md';
import {FaGift} from 'react-icons/fa';
import {GiHelp} from 'react-icons/gi';
import {RiShoppingBag2Fill} from 'react-icons/ri';
import "./customer-service.scss";
const CustomerService = () => {
    const [list, setList] =  useState(null);
    const SERVICESICONS = {
        "help and guide": <GiHelp></GiHelp>, 
        "refunds": <MdAssignmentReturn></MdAssignmentReturn> , 
        "your account": <MdAccountBox></MdAccountBox> , 
        "payments": <AiFillCreditCard></AiFillCreditCard>,
        "gift cards": <FaGift></FaGift>, 
        "orders": <RiShoppingBag2Fill></RiShoppingBag2Fill>}
    useEffect(() => {
        let daList = SERVICEITEMS.map((item)=>{
            item.extra = SERVICESICONS[item.title];
            return item;
        });
        setList(daList);
    }, []);
    return (
        <div className="customer-service">
            <h4>Customer Service</h4>
            {list !== null && <FlexLinks list={list} >

            </FlexLinks>}
        </div>
    );
}

export default CustomerService;
