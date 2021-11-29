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
        "help and guide": {icon: <GiHelp></GiHelp>, description: "How to navigate account and others, this is where you can find Q and A and other information reagarding the service and your account"}, 
        "refunds": {icon: <MdAssignmentReturn></MdAssignmentReturn> , description: "Want to return and get refund on a certain item? look no further"} , 
        "your account": {icon:  <MdAccountBox></MdAccountBox> , description: "Mange your account, you can update shipping information, payments, giftcards, and other personal informations"}, 
        "payments": {icon: <AiFillCreditCard></AiFillCreditCard>, description: "Add, delete and update cards that you owned"} ,
        "gift cards": {icon: <FaGift></FaGift>, description: "Add, delete and update gift cards that you owned"}, 
        "orders": {icon: <GiHelp></GiHelp>, description: "Keep track of your orders here, consist of current and from the past orders"}}
    useEffect(() => {
        let daList = SERVICEITEMS.map((item)=>{
            let iconItem = SERVICESICONS[item.title];
            item.extra = iconItem.icon;
            item.description = iconItem.description; 
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
