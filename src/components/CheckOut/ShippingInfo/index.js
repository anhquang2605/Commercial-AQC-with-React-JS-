import React, {useState, useEffect} from 'react';
import './shipping-info.scss';
import Collapsable from "../../Plugins/Collaspable";
import firebase from '../../../firebase';
const shippingInitObj = {
    name: "Pikachu",
    address: "3637 Snell Ave",
    apt: "spc 67",
    resiState: "CA",
    city: "San Jose",
    zip: "95236"
}
const db = firebase.firestore();
const ShippingInfo = () => {
    //States
    const [shippingList, setShippingList] = useState([]);
    const [currentShipping, setCurrentShipping] = useState(shippingInitObj)
    const [allStates, setAllStates] = useState();
    const [shippingFormValues, setShippingFormValues] = useState({});
    //Methods

    //Getting states data from json file at public directory
    useEffect(() => {
        db.collection("shippings").get().then((dat)=>{
            var collections = dat.docs;
            var list = [];
            var promise = new Promise((resolve)=>{
                collections.forEach((doc)=>{
                    list.push(doc.data())
                });
                resolve();
             });
            promise.then(()=>{
                setShippingList(list);
            });
        })
        fetch("USstates.json").then((dat)=>dat.json()).then(data=>{
            setAllStates(data);
        });
    }, []);
    return (
        <div id="shipping-info">
                <h4 className="check-out-title">Shipping</h4>
                <Collapsable
                    itemName="shipping"
                   //Top part of the collapsable plugin
                    chosenChildren= {currentShipping && 
                        <div className="shipping-chosen">
                            <span className="chosen-shipping-name">{currentShipping.name}</span>
                            <span className="chosen-shipping-address-line">{currentShipping.address} #{currentShipping.apt}</span>
                            <span className="chosen-shipping-city-state">{currentShipping.city}, {currentShipping.resiState} {currentShipping.zip} </span>
                        </div>
                    }
                    //Bottom part of the collapsable plugin where change field and form present
                    changeChildren={
                        (
                        <div>
                            <div className="shipping-options">
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {shippingList && shippingList.map((ship)=>{
                                        return(
                                       <tr key={ship.id}>
                                           <td><input type="radio"></input></td>
                                           <td className="ship-name">{ship.name}</td>
                                           <td className="ship-address">{ship.address}</td>
                                       </tr>     
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="shipping-adding">
                                <span className="add-shipping-name">
                                    <label className="label">For (Name):</label>
                                    <input value={shippingFormValues.name} type="text" placeholder="Enter Name Here"></input>
                                </span>
                                <span className="add-shipping-address">
                                    <label className="label">Address</label>
                                    <input value={shippingFormValues.address} type="text" placeholder="Enter Address"></input>
                                </span>
                                <span className="add-shipping-state">
                                    <label className="label">State</label>
                                    <select value={shippingFormValues.resiState}>
                                        {allStates && allStates.map((daState)=>{
                                            return(
                                                <option value={daState.abbreviation}>{daState.name}</option>
                                            );
                                        })}
                                    </select>
                                </span>
                                <span className="add-shipping-city">
                                    <label className="label">City</label>
                                    <input value={shippingFormValues.city} type="text" placeholder="Enter City"></input>
                                </span>
                                <span className="add-shipping-zip">
                                    <label className="label">Zip</label>
                                    <input value={shippingFormValues.zip} type="text" placeholder="Enter zip code"></input>
                                </span>
                            </div>
                        </div>
                        )
                    }
                >

                </Collapsable>
               
                <div className="Shipping-changed">

                </div>
        </div>
    );
}

export default ShippingInfo;
