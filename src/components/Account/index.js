import React ,{useEffect, useState} from 'react';
import { useParams } from 'react-router';
import './account.scss';
import Firebase from './../Firebase';

import DisplayPanel from './DisplayPanel';
import OptionPanel from './OptionPanel';
const Account = (props) => {
    const db = Firebase.firestore();
    const {subpath} = useParams();
    const [optionItems, setOptionItems] = useState();
    const [currentOption, setCurrentOption] = useState();
    let getOptionItems = () =>{
        db.collection("account-side-panel").get().then((response)=>{
            let daList = [];
            response.forEach((doc)=>{
                daList.push(doc.data());
            });
            setOptionItems(daList);
        })
    }
    let setCurrentOptionForAccount = (option) =>{
        setCurrentOption(option);
    }
    useEffect(() => {
        if(subpath){
            getOptionItems();
            setCurrentOption(subpath);
        } else {
            getOptionItems();
            if(optionItems && currentOption === undefined){
                setCurrentOption(optionItems[0].name);
            }
        }
        
      
    }, []);
    useEffect(() => {
        if(subpath !== currentOption){
            setCurrentOption(subpath);
        }   
    }, [subpath]);
/*     useEffect(() => {
        if(retrievedItemFromFirestore.length !== 0){
            setOptionItems(retrievedItemFromFirestore);
        }
    }, [retrievedItemFromFirestore]); */
    return (
        <div className="account">
            <h4>Account Information</h4>
           {optionItems ? <OptionPanel setCurrent={setCurrentOptionForAccount} list={optionItems} current={currentOption}></OptionPanel> : ""}
            {currentOption && <DisplayPanel reFetch={props.refetchAccount} account = {props.account} current={currentOption}>

            </DisplayPanel>}
           
        </div>
    );
}

export default Account;
