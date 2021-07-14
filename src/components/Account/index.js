import React ,{useEffect, useState, useRef} from 'react';
import './account.scss';
import Firebase from './../Firebase';

import DisplayPanel from './DisplayPanel';
import OptionPanel from './OptionPanel';
const Account = (props) => {
    const db = Firebase.firestore();
    const [optionItems, setOptionItems] = useState();
    const [currentOption, setCurrentOption] = useState();
    let getOptionItems = () =>{
        db.collection("account-side-panel").get().then((response)=>{
            let daList = [];
            response.forEach((doc)=>{
                daList.push(doc.data());
            });
            setOptionItems(daList);
            setCurrentOption(daList[0].name);
        })
    }
    let setCurrentOptionForAccount = (option) =>{
        setCurrentOption(option);
    }
    useEffect(() => {
        getOptionItems();
        if(optionItems && currentOption === undefined){
            setCurrentOption(optionItems[0].name);
        }
    }, []);
/*     useEffect(() => {
        if(retrievedItemFromFirestore.length !== 0){
            setOptionItems(retrievedItemFromFirestore);
        }
    }, [retrievedItemFromFirestore]); */
    return (
        <div className="account">
            <h4>Account Information</h4>
           {optionItems ? <OptionPanel setCurrent={setCurrentOptionForAccount} list={optionItems} current={currentOption}></OptionPanel> : ""}
            {currentOption && <DisplayPanel account = {props.account} current={currentOption}>

            </DisplayPanel>}
           
        </div>
    );
}

export default Account;
