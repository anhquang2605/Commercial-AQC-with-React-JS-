import React, {useEffect, useState  , useRef, Fragment} from 'react';
import Firebase from "./../../Firebase";
import {FaExchangeAlt} from 'react-icons/fa';
import CustomSelect from './../../Plugins/CustomSelect';
import Orders from '../Orders';
import LinkCards from './../Plugins/LinkCards';
import GCards from '../GCards';
import Cards from '../Cards';
import bcrypt from 'bcryptjs';
import Modal from './../../Plugins/Modal';
import './display-panel.scss';
import AwesomeForm from '../../AwesomeForm';
const DisplayPanel = (props) => {
    const changePassRefModal = useRef(null);
    const EditShippingRefModal = useRef(null);
    const AddShippingRefModal = useRef(null);
    const INITIAL_ADDING_FORM_OBJECT = {
        address: "",
        city: "",
        current: false,
        resiState: "",
        zip: ""
    }
    const INITIAL_PASSWORD_CHANGE_FORM_OBJECT = {
        password:"",
        passwordMatch:"",
        validPassword: false,
        passwordMatched: false,
        dirty: false
    }
    const PASSWORD_LENGTH_MINUMUM = 8;
    const otherInfo = [{name: "Your Cards", path: "account/cards"},{name: "Gift Cards You Owned", path: "account/gcards"},{name: "Your Orders", path: "account/orders"}];
    const [curAddress, setCurAddress] = useState();
    const [editAddressForm, setEditAddressForm] = useState({});
    const [beforeEditedAddress, setBeforeEditedAddress] = useState({});
    const [addAddressForm, setAddAddressForm] = useState({...INITIAL_ADDING_FORM_OBJECT});
    const [errorFieldsInAddingForm, setErrorFieldsInAddingForm] = useState([]);
    const [repeatedAddress, setRepeatedAddress] = useState(false);
    const [changePasswordForm, setChangePasswordForm] = useState({...INITIAL_PASSWORD_CHANGE_FORM_OBJECT});
    const db = Firebase.firestore();
    const account = db.collection("accounts").doc(props.account.username);
    let setCurrentPanel = () =>{
        let currentOtion = props.current;
        let thePanels = document.getElementsByClassName("panel");
        for (var i = 0; i < thePanels.length; i+=1){
            thePanels[i].classList.remove("current-panel");
        }
        let thePanel = document.getElementById(currentOtion);
        thePanel.classList.add("current-panel");
    }
    let setFieldOfAccountOnFireStore = (field, data) =>{
        var obj = {};
        obj[field] =  data;
        account.update(obj);
        props.reFetch();
    };
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
                let handleCancel = (e, btn)=>{
                    e.stopPropagation();
                    parent.innerHTML = "";
                    col.hidden = false;
                    parent.append(col);
                    btn.removeEventListener("click", handleCancel)
                }
                let handleConfirm = (e, btn)=>{
                    e.stopPropagation();
                    parent.innerHTML = "";
                    var inputString = inputElement.value;
                    col.hidden= false;
                    parent.append(col);
                    if(dataObject === "account"){
                        setFieldOfAccountOnFireStore(dataField, inputString);
                    }
                  btn.removeEventListener("click", handleConfirm);
                    //col.innerHTML = inputString;    
                }
                //Setting the content the input and other buttons on the fly
                inputElement.type = "text";
                inputElement.className = "editable-field";
                inputElement.value = text;
                buttonCancel.textContent = "Cancel"
                buttonCancel.className = "cancel-edit";
                buttonConfirmed.textContent = "Confirmed";
                //Add events listeners to the buttons
                buttonCancel.addEventListener("click", (event) =>{
                    handleCancel(event,buttonCancel)
                });
               buttonConfirmed.addEventListener("click", (event) => {
                  handleConfirm(event,buttonConfirmed)
               });
                //Add the components to the target
                parent.appendChild(inputElement);
                inputElement.focus();
                parent.appendChild(buttonConfirmed);
                parent.appendChild(buttonCancel);
            }  
    }
    let handleSetcurrentAddress = () => {
        if(props.account.shippings && props.account.shippings.length === 1) {
            //for account that only has 1 shipping address
            let shipping = props.account.shippings[0];
            setCurAddress(shipping);
            setEditAddressForm(shipping);
            setBeforeEditedAddress(shipping);
        } else if(props.account.shippings && props.account.shippings.length > 0){
            let shippings = props.account.shippings;
            for(let shipping of shippings){
                //for primary shipping address, get them first
                if(shipping.current === true){
                    setCurAddress(shipping);
                    setEditAddressForm(shipping);
                    setBeforeEditedAddress(shipping);
                } 
            }
        }
    }
    //HANDLE EDITING SHIPPING ADDRESS
    let handleEdittingAddress = (e) =>{
        setEditAddressForm((prevState)=>({
            ...prevState,
            address: e.target.value
        }));
    }
    let handleEdittingCity = (e) =>{
        setEditAddressForm((prevState)=>({
            ...prevState,
            city: e.target.value
        }));
    }
    let handleEdittingState = (e) =>{
        setEditAddressForm((prevState)=>({
            ...prevState,
            resiState: e.target.value
        }));
    }
    let handleEdittingZip = (e) =>{
        setEditAddressForm((prevState)=>({
            ...prevState,
            zip: e.target.value
        }));
    }
    let handleConfirmEdit = (e) =>{
        if (beforeEditedAddress !== editAddressForm){
            account.update({
                shippings: Firebase.firestore.FieldValue.arrayRemove(beforeEditedAddress)
            }).then(()=>{
                account.update({
                    shippings: Firebase.firestore.FieldValue.arrayUnion(editAddressForm)
                }).then(()=>{
                    EditShippingRefModal.current.hideModal();
                    setCurAddress(editAddressForm);
                    setEditAddressForm(editAddressForm);
                    setBeforeEditedAddress(editAddressForm);
                    //props.reFetch();
                })
            })
        } else {
            EditShippingRefModal.current.hideModal();
        }  
    }
      //HANDLE ADDING SHIPPING ADDRESS
      let handleAddingAddress = (e) =>{
        setAddAddressForm((prevState)=>({
            ...prevState,
            address: e.target.value
        }));
    }
    let handleAddingCity = (e) =>{
        setAddAddressForm((prevState)=>({
            ...prevState,
            city: e.target.value
        }));
    }
    let handleAddingState = (e) =>{
        setAddAddressForm((prevState)=>({
            ...prevState,
            resiState: e.target.value
        }));
    }
    let handleAddingZip = (e) =>{
        setAddAddressForm((prevState)=>({
            ...prevState,
            zip: e.target.value
        }));
    }
    let handleAddingPrimary = (e) =>{
        setAddAddressForm((prevState)=>({
            ...prevState,
            current: e.target.checked
        }));
    }
    let handleConfirmAdd = (e) =>{
        let shippingAddresses = props.account.shippings;
        let primaryChoice = addAddressForm.current;//keep user choice here for the object comparasion later, since the current status can be different 
        let repeated = false;
        //but similar address, city, zip and state can be all the same cause same address to slip through validation
        let addressFields = Object.keys(addAddressForm);
        for(let address of shippingAddresses){
          if(address.address === addAddressForm.address){
              repeated = true;
              setRepeatedAddress(true);
          }
        }
        addAddressForm.current = primaryChoice;

       let errorList = [];
       for (let field of addressFields){
           if(addAddressForm[field] === "") errorList.push(field);
       }
       if (errorList.length> 0){
        setErrorFieldsInAddingForm(errorList);
        for (let error of errorList){
            puttingErrorOnInputFieldsInAddingForm(error);
        }
        return;
       }
       
        //Validate 
        if (!repeated){
            if(addAddressForm.current === true){
                //reset all primary to false if user want to set new address to primary
                for(let address of shippingAddresses){
                    address.current = false;
                }
            } 
            shippingAddresses.push({...addAddressForm});
            account.update({
                shippings: shippingAddresses
            }).then(()=>{
                setCurrentAddressEveryWhere({...addAddressForm});
                props.reFetch();
                setAddAddressForm({...INITIAL_ADDING_FORM_OBJECT});
                setRepeatedAddress(false);
                AddShippingRefModal.current.hideModal();
            })
        } else {
            EditShippingRefModal.current.hideModal();
        }
       
    }
    let puttingErrorOnInputFieldsInAddingForm = (errorField) =>{
        let theForm = document.getElementById("modal_add-new-address");
        let theFields = theForm.getElementsByClassName("aform-field");
        for(let field of theFields){
            if(field.classList.contains(errorField)){
                field.getElementsByTagName("input")[0].classList.add("errorInput")
            }
            
        }
    }
    let resetErrorInput = () =>{
        let forms = document.getElementsByClassName("awesome_form");
        for(let form of forms){
            let inputs = form.getElementsByTagName("input")
            for(let input of inputs){
               input.classList.remove("errorInput");
            }
        }
    }
    //SET PRIMARY FOR ADDRESSES, find the one that is primary, delete it, find the one to be primary, delete it, 
    //then add the new primary along with the old primary to the list
    let setThisAsPrimary = (e) => {
        let newShippings = [...props.account.shippings];
        let shippingsFields = Object.keys(curAddress);
        let newCurAddres = {...curAddress};
        //look for the primary one, set primary status to false;
        for (let shipping of newShippings){
            if(shipping.current === true){
                shipping.current = false;
            }
        }
        //find the address to be updated
         for (let shipping of newShippings){
            let matches = 0;
            for(let key of shippingsFields){
                if(shipping[key] === curAddress[key]){
                    matches += 1;
                }
            }
            if(matches === shippingsFields.length){
                //matchess, update the list and the item to be used later
                shipping.current = true;
                newCurAddres.current = true;
            }
        } 
        account.update({
            shippings: newShippings
        }).then(()=>{
            props.reFetch();
            setCurrentAddressEveryWhere(newCurAddres);
        })
    }
    //DELETE CURRENT ADDRESS
    let deleteCurrentAddress = () =>{
        let toBeDeleted = {...curAddress};
        let shippingList = [...props.account.shippings];
        let remainingList = shippingList.filter( data => data.address != toBeDeleted.address);
        let remainingIsNotEmpty = remainingList && remainingList.length > 0
        if(toBeDeleted.current === true){   
            if(remainingIsNotEmpty){
                remainingList[0].current = true;
            }
        }
        //delete the data first
        account.update({
            shippings: remainingList
        }).then(()=>{
            props.reFetch();
            if(remainingIsNotEmpty){
                setCurrentAddressEveryWhere(props.account.shippings[0])
            };
        })
    }
    //handle when shipping address is change throught the custom select component
    let setOption = (address) =>{
        setCurrentAddressEveryWhere(address);
    }
    //update the current address, forms
    let setCurrentAddressEveryWhere = (address) =>{
        setCurAddress(address);
        setEditAddressForm(address);
        setBeforeEditedAddress(address);
    }
    //CHANGE PASSWORD
    let hashPasswordForAccount = (pass) =>{ //send the hash version to the server
        const salt = bcrypt.genSaltSync(10);
        var dahash = bcrypt.hashSync(pass,salt);
        return dahash;
    }
    let handlePasswordChange = (e) =>{
        setChangePasswordForm((prevState)=>({
            ...prevState,
            password: e.target.value
        }));
        if(changePasswordForm.dirty === false){
            setChangePasswordForm((prevState)=>({
                ...prevState,
               dirty: true
            }));
        } else {
            if(changePasswordForm.passwordMatch.length >0){
                setChangePasswordForm((prevState)=>({
                    ...prevState,
                    passwordMatched: e.target.value === changePasswordForm.passwordMatch
                }))
            }
        }
    }
    let handlePasswordMatchChange = (e) =>{
       setChangePasswordForm((prevState)=>({
            ...prevState,
           passwordMatch: e.target.value,
           passwordMatched: e.target.value === changePasswordForm.password
        }))
        if(changePasswordForm.dirty === false){
            setChangePasswordForm((prevState)=>({
                ...prevState,
               dirty: true
            }));
        }
    }
    let handleMatchingPassword = () =>{
        setChangePasswordForm((prevState)=>({
            ...prevState,
            passwordMatched: prevState.password === prevState.passwordMatch
        }))
    }
    let handleCheckPasswordLength = () =>{
        setChangePasswordForm((prevState)=>({
            ...prevState,
           validPassword: changePasswordForm.password.length >= PASSWORD_LENGTH_MINUMUM 
        }))
    }
    let handleConfirmPassword = () =>{
       account.update({
            password: hashPasswordForAccount(changePasswordForm.password)
        }).then(()=>{ 
            db.collection("users").doc(props.account.username).update({
                password: hashPasswordForAccount(changePasswordForm.password),
            }).then(()=>{
                let daChangePassModal = document.getElementById("modal_change-password");
                let formContainer, okMessateContainer;
                if(daChangePassModal){
                    formContainer = daChangePassModal.getElementsByClassName("form-in-modal")[0];
                    okMessateContainer = daChangePassModal.getElementsByClassName("password-change-ok-message")[0];
                }
                if(okMessateContainer&&formContainer){
                    okMessateContainer.classList.remove("display-none");
                    formContainer.classList.add("display-none");
                }
            }).catch((error)=>{
                console.log(error);
            })
           
       }).catch((error)=>{
           console.log(error);
       }) 
    }
    let resetChangePasswordForm = () =>{
        let daChangePassModal = document.getElementById("modal_change-password");
        let formContainer, okMessateContainer;
            if(daChangePassModal){
                formContainer = daChangePassModal.getElementsByClassName("form-in-modal")[0];
                okMessateContainer = daChangePassModal.getElementsByClassName("password-change-ok-message")[0];
            }
        if (formContainer && okMessateContainer){
            formContainer.classList.remove("display-none");
            okMessateContainer.classList.add("display-none");
        }
        setChangePasswordForm({...INITIAL_PASSWORD_CHANGE_FORM_OBJECT});
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
                            <div className="content-col" data-obj="shipping" data-field="address">{curAddress.address}</div>
                        </div>
                        <div className="field-panel">
                            <div className="title-col">City</div>
                            <div className="content-col" data-obj="shipping" data-field="city">{curAddress.city}</div>
                        </div>
                        <div className="field-panel">
                            <div className="title-col">State</div>
                            <div className="content-col" data-obj="shipping" data-field="resiState">{curAddress.resiState}</div>
                        </div>
                        <div className="field-panel">
                            <div className="title-col">Zip</div>
                            <div className="content-col" data-obj="shipping" data-field="zip">{curAddress.zip}</div>
                        </div>
                        </Fragment>
                        : "No shipping address, please add"}
                        <div className="btn-group">
                            {curAddress && 
                            <Fragment>
                            <button onClick={setThisAsPrimary} className={"operation-btn set-primary-btn"+ (curAddress.current? " primary" : "")}>
                                {!curAddress.current? 
                                (<span><span class="material-icons-outlined">grade</span>Set this address as primary</span>) 
                                : (<span><span class="material-icons">grade</span>This address is primary</span>) }
                            </button>
                            <button className="operation-btn edit-btn" onClick={()=>{
                                EditShippingRefModal.current.showModal();
                            }}><span class="material-icons-outlined">edit</span> Edit this address</button>
                            <button onClick={deleteCurrentAddress} className="operation-btn delete-btn"><span class="material-icons-outlined">delete</span> Delete this address</button>
                            </Fragment>
                            }
                            <button className="operation-btn add-btn" onClick={()=>{
                                setErrorFieldsInAddingForm([]);
                                AddShippingRefModal.current.showModal(resetErrorInput);
                            }}> <span className="material-icons-outlined">add_location_alt</span>Add new address</button>
                        </div>
                    
                </div>
                <div className="password sub-section information-container">
                    <h5 className="panel-title">
                        password
                    </h5>
                    <button className="change-password-btn operation-btn" onClick={()=>{changePassRefModal.current.showModal(resetChangePasswordForm)}}><FaExchangeAlt></FaExchangeAlt>Change Password</button>
                
                </div>
                {/*MODALS CODES HERE*/}
                <Modal hasTitle={true} ref={changePassRefModal} name="change-password">
                    <div className="form-in-modal">
                       <span className="form-row-control">
                            <legend>New Password</legend>
                            <input type="password" value={changePasswordForm.password} onBlur={handleCheckPasswordLength} onChange={handlePasswordChange}></input>
                            <span className="error" hidden={changePasswordForm.validPassword && changePasswordForm.dirty}>Password should be at least 8 characters</span>
                        </span>
                        <span className="form-row-control">
                            <legend>Re enter new password </legend>
                            <input type="password" value={changePasswordForm.passwordMatch} onChange={handlePasswordMatchChange}></input>
                            <span className="error" hidden={changePasswordForm.passwordMatched && changePasswordForm.dirty}>Password re-entered should be match with the above</span>
                        </span>
                        <button onClick={handleConfirmPassword} className={"aform-button submit half" + (changePasswordForm.dirty && changePasswordForm.validPassword && changePasswordForm.passwordMatched ? "" : " not-ready")}>Confirm Password Change</button>
                    </div>
                    <div className="password-change-ok-message display-none">
                        <div className="message"><span class="material-icons-round">done</span>Great! You are off to a new password!</div>
                        <button onClick={()=>{changePassRefModal.current.hideModal()}}>Ok</button>
                    </div>
                </Modal>
                <Modal autoHeight={true} hasTitle={true} ref={EditShippingRefModal} name="edit-address">
                    <AwesomeForm included={true}>
                            <span className="address aform-field">
                                <label>Address</label>
                                <input type="text" required={true} onChange={handleEdittingAddress} value={editAddressForm.address}  autoComplete={false}></input>
                            </span>
                            <span className="city aform-field half">
                                <label>City</label>
                                <input type="text" required={true} onChange={handleEdittingCity} value={editAddressForm.city} autoComplete={false}></input>
                            </span>
                            <span className="resiState aform-field half">
                                <label>State</label>
                                <input type="text" required={true} onChange={handleEdittingState} value={editAddressForm.resiState} autoComplete={false}></input>
                            </span>
                            <span className="zip aform-field half">
                                <label>Zip code</label>
                                <input type="text" required={true} onChange={handleEdittingZip} value={editAddressForm.zip} autoComplete={false}>{}</input>
                            </span>
                            <button className="aform-button submit half" onClick={handleConfirmEdit}>Confirm</button>
                    </AwesomeForm>
                </Modal>
                <Modal autoHeight={true} hasTitle={true} ref={AddShippingRefModal} name="add-new-address">
                    <AwesomeForm included={true}>
                            <span className={"error-repeated error-message" + (repeatedAddress? "" : " hidden-message") }>This address is repeated, please change one of the field below</span>
                            <span className={"error-empty error-message" + (errorFieldsInAddingForm && errorFieldsInAddingForm.length > 0 ? "" : " hidden-message") }>
                                Please fill 
                                {
                                    errorFieldsInAddingForm && errorFieldsInAddingForm.map((item)=>(<span className="error-field-item">{(item === "resiState" ? "state" : item)}</span>))
                                }
                            </span>
                            <span className="address aform-field">
                                <label>Address</label>
                                <input type="text" onChange={handleAddingAddress} value={addAddressForm.address}  autoComplete={false}></input>
                            </span>
                            <span className="city aform-field half">
                                <label>City</label>
                                <input type="text" onChange={handleAddingCity} value={addAddressForm.city} autoComplete={false}></input>
                            </span>
                            <span className="resiState aform-field half">
                                <label>State</label>
                                <input type="text" onChange={handleAddingState} value={addAddressForm.resiState} autoComplete={false}></input>
                            </span>
                            <span className="zip aform-field half">
                                <label>Zip code</label>
                                <input type="text" onChange={handleAddingZip} value={addAddressForm.zip} autoComplete={false}>{}</input>
                            </span>
                            <span className="current aform-field fourth">
                                <label>Set as primary?</label>
                                <input type="checkbox" onChange={handleAddingPrimary} value={addAddressForm.current} >{}</input>
                            </span>
                            <button className={"aform-button submit fourth"} onClick={handleConfirmAdd}>Confirm</button>
                    </AwesomeForm>
                </Modal>
               {/*  <div className="other-information-access">
                    {otherInfo && <LinkCards list={otherInfo}>
                    </LinkCards>}
                </div> */}
            </div>

            <div className="panel" id="settings">
                Place holder for setting components
            </div>
            <div className="panel" id="orders">
               <Orders ordersOfAccount={props.account.orders}></Orders>
            </div>
            <div className="panel" id="payments">
                <Cards reFetch={props.reFetch} accountID={props.account.username} list={props.account.cards}></Cards>
                <GCards reFetch={props.reFetch} accountID={props.account.username} list={props.account.gcards}></GCards>
            </div>
        </div>
    );
}

export default DisplayPanel;
