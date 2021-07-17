import React, {useEffect, useState  , useRef, Fragment} from 'react';
import Firebase from "./../../Firebase";
import {FaExchangeAlt} from 'react-icons/fa';
import CustomSelect from './../../Plugins/CustomSelect';
import LinkCards from './../Plugins/LinkCards';
import Modal from './../../Plugins/Modal';
import './display-panel.scss';
const DisplayPanel = (props) => {
    const changePassRefModal = useRef(null);
    const otherInfo = [{name: "Your Cards", path: "account/cards"},{name: "Gift Cards You Owned", path: "account/gcards"},{name: "Your Orders", path: "account/orders"}];
    const [curAddress, setCurAddress] = useState({});
    const db = Firebase.firestore();
    const account = db.collection("accounts").doc(props.account.username);
    let setCurrentPanel = () =>{
        let currentOtion = props.current;
        let thePanels = document.getElementsByClassName("panel");
        for (var i = 0; i < thePanels.length; i+=1){
            thePanels[i].classList.remove("current");
        }
        let thePanel = document.getElementById(currentOtion);
        thePanel.classList.add("current");
    }
    let setFieldOfAccountOnFireStore = (field, data) =>{
        var obj = {};
        obj[field] =  data;
        account.update(obj);
        props.reFetch();
    };
    const updateShippingField = (field, data) =>{
        
    }
    let handleEditableSwapOfField = (e,col) =>{
            e.stopPropagation();
            var parent = col.parentNode;
            col.hidden = true;
            var dataField = parent.dataset.field;
            var dataObject = parent.dataset.obj;
            if(dataField !== "username" && dataField !== "shippings"){
                var text = col.textContent;
                var inputElement = document.createElement("input");
                var buttonConfirmed = document.createElement("button");
                var buttonCancel = document.createElement("button");
                //Setting the content the input and other buttons on the fly
                inputElement.type = "text";
                inputElement.className = "editable-field";
                inputElement.value = text;
                buttonCancel.textContent = "Cancel"
                buttonConfirmed.textContent = "Confirmed";
                //Add events listeners to the buttons
                buttonCancel.addEventListener("click", (e)=>{
                    e.stopPropagation();
                    parent.innerHTML = "";
                    col.hidden = false;
                    parent.append(col);
                });
               buttonConfirmed.addEventListener("click", (e)=>{
                    e.stopPropagation();
                    parent.innerHTML = "";
                    var inputString = inputElement.value;
                    col.hidden= false;
                    parent.append(col);
                    if(dataObject === "account"){
                        setFieldOfAccountOnFireStore(dataField, inputString);
                    } else if(dataObject === "shipping"){
                        updateShippingField(dataField, inputString)
                    }
                   
                    //col.innerHTML = inputString;    
                });
                //Add the components to the target
                parent.appendChild(inputElement);
                inputElement.focus();
                parent.appendChild(buttonConfirmed);
                parent.appendChild(buttonCancel);
            }  
    }
    let handleSetcurrentAddress = () => {
        if(props.account.shippings!==undefined && props.account.shippings.length > 0) {
            let shippings = props.account.shippings;
            for(let shipping of shippings){
                //for primary shipping address, get them first
                if(shipping.current === true){
                    setCurAddress(shipping);
                    return;
                }
            }
        }
    }
    let handleSetPrimaryClick = () =>{

    }
    let handleUpdateShipping = (obj) =>{

    }
    //handle when shipping address is change throught the custom select component
    let setOption = (address) =>{
        setCurAddress(address);
    }
    useEffect(() => {
        //Add click event to editable component of personal information section
        let cols = document.getElementsByClassName("edit-hover");
        for( var i = 0; i < cols.length; i+=1){
            let col = cols[i];
            col.addEventListener("click", (e) => {handleEditableSwapOfField(e,col)});
        }
        //handle address for shipping information
        handleSetcurrentAddress();
        //setAddress(props.account.shippings[0]);
    },[]);
    useEffect(() => {
        if(props.current !== undefined){
            setCurrentPanel();
            
        }
    }, [props.current]);
    return (
        <div className="display-panel">
             <div className="panel" id="information">
               { props.account && <div className="information-container sub-section">
               <h5 className="panel-title">Personal information</h5>
                        <div className="field-panel">
                            <div className="title-col">User Name</div>
                            <div className="content-col" data-field="username">{props.account.username}</div>
                        </div>
                        <div className="field-panel">
                            <div className="title-col">Email</div>
                            <div className="content-col editable" data-obj="account" data-field="email"><div className="edit-hover">{props.account.email}</div></div>
                        </div>
                        <div className="field-panel">
                            <div className="title-col">Phone</div>
                            <div className="content-col editable" data-obj="account" data-field="phone"><div className="edit-hover">{props.account.phone}</div></div>
                        </div>
                        <div className="field-panel">
                            <div className="title-col">Nick Name</div>
                            <div className="content-col editable" data-obj="account" data-field="nickname"><div className="edit-hover">{props.account.nickname}</div></div>
                        </div>
                        </div>}
                <div className="shipping sub-section information-container">
                    <h5 className="panel-title">
                        shippings
                    </h5>
                    {curAddress ? 
                        <Fragment>
                            { (props.account.shippings.length > 1) && <CustomSelect id="select-shipping" setOption={setOption} label="View different address" desiredField="address" list={props.account.shippings}></CustomSelect>}
                          <div className="field-panel">
                            <div className="title-col">Address</div>
                            <div className="content-col editable" data-obj="shipping" data-field="address"><div className="edit-hover">{curAddress.address}</div></div>
                        </div>
                        <div className="field-panel">
                            <div className="title-col">City</div>
                            <div className="content-col editable" data-obj="shipping" data-field="city"><div className="edit-hover">{curAddress.city}</div></div>
                        </div>
                        <div className="field-panel">
                            <div className="title-col">State</div>
                            <div className="content-col editable" data-obj="shipping" data-field="resiState"><div className="edit-hover">{curAddress.resiState}</div></div>
                        </div>
                        <div className="field-panel">
                            <div className="title-col">Zip</div>
                            <div className="content-col editable" data-obj="shipping" data-field="zip"><div className="edit-hover">{curAddress.zip}</div></div>
                        </div>
                        </Fragment>
                        : "No shipping address, please add"}
                        <div className="btn-group">
                            {curAddress && 
                            <Fragment>
                            <button className={"operation-btn set-primary-btn"+ (curAddress.current? " primary" : "")}>
                                {!curAddress.current? 
                                (<span><span class="material-icons-outlined">grade</span>Set this address as primary</span>) 
                                : (<span><span class="material-icons">grade</span>This address is primary</span>) }
                            </button>
                            <button className="operation-btn delete-btn"><span class="material-icons-outlined">delete</span> Delete this address</button>
                            </Fragment>
                            }
                            <button className="operation-btn add-btn"> <span className="material-icons-outlined">add_location_alt</span>Add new address</button>
                        </div>
                    
                </div>
                <div className="password sub-section information-container">
                    <h5 className="panel-title">
                        password
                    </h5>
                    <button className="change-password-btn operation-btn" onClick={()=>{changePassRefModal.current.showModal()}}><FaExchangeAlt></FaExchangeAlt>Change Password</button>
                
                </div>
                <Modal hasTitle={true} ref={changePassRefModal} name="change-password">
                <   div className="form-in-modal">
                        <span className="form-row-control">
                            <legend>New Password</legend>
                            <input type="password" value=""></input>
                        </span>
                        <span className="form-row-control">
                            <legend>Re enter new password </legend>
                            <input type="password" value=""></input>
                        </span>
                        <div className="add-card-btn half">Confirm Change Password</div>
                    </div>
                   
                </Modal>
               {/*  <div className="other-information-access">
                    {otherInfo && <LinkCards list={otherInfo}>
                    </LinkCards>}
                </div> */}
            </div>

            <div className="panel" id="settings">
                setting
            </div>
            <div className="panel" id="orders">
                orders
            </div>
            <div className="panel" id="payments">
                payments
            </div>
        </div>
    );
}

export default DisplayPanel;
