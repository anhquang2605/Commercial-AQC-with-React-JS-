import React, {useEffect, useState  , useRef} from 'react';
import {IoClose, IoMdCheckmark} from 'react-icons/io5';
import LinkCards from './../Plugins/LinkCards';
import Modal from './../../Plugins/Modal';
import './display-panel.scss';
const DisplayPanel = (props) => {
    const changePassRefModal = useRef(null);
    const otherInfo = [{name: "Your Cards", path: "account/cards"},{name: "Gift Cards You Owned", path: "account/gcards"},{name: "Your Orders", path: "account/orders"}]
    const [address, setAddress] = useState({});
    const [retrievedItemFromFirestore, setRetrievedItemFromFirestore] = useState([]);
    let setCurrentPanel = () =>{
        let currentOtion = props.current;
        let thePanels = document.getElementsByClassName("panel");
        for (var i = 0; i < thePanels.length; i+=1){
            thePanels[i].classList.remove("current");
        }
        let thePanel = document.getElementById(currentOtion);
        thePanel.classList.add("current");
    }
    useEffect(() => {
        let cols = document.getElementsByClassName("content-col");
        for( var i = 0; i < cols.length; i+=1){
            let col = cols[i];
            col.addEventListener("click", (e) =>{
                e.stopPropagation();
                var text = col.innerHTML;
                var inputElement = document.createElement("input");
                var buttonConfirmed = document.createElement("button");
                var buttonCancel = document.createElement("button");
                inputElement.type = "text";
                inputElement.className = "editable-field";
                inputElement.value = text;

                col.textContent  = '';
                buttonCancel.textContent = "Cancel"
                buttonCancel.addEventListener("click", (e)=>{
                    e.preventPropagation();
                    col.textContent = "";
                    console.log("here");
                    col.innerHTML = text;    
                });
                buttonConfirmed.textContent = "Confirmed";
                buttonConfirmed.addEventListener("click", (e)=>{
                    e.preventPropagation();
                    var inputString = inputElement.value;
                    col.innerHTML = inputString;    
                });
                col.appendChild(inputElement);
                col.appendChild(buttonConfirmed);
                col.appendChild(buttonCancel);
            });
        }

        setAddress(props.account.shippings[0]);
    },[]);
    useEffect(() => {
        if(props.current !== undefined){
            setCurrentPanel();
        }
    }, [props.current]);
    return (
        <div className="display-panel">
             <div className="panel" id="information">
               { props.account && <table>
                    <tbody>
                        <tr>
                            <td className="title-col">User Name</td>
                            <td className="content-col">{props.account.username}</td>
                        </tr>
                        <tr>
                            <td className="title-col">Email</td>
                            <td className="content-col">{props.account.email}</td>
                        </tr>
                        <tr>
                            <td className="title-col">Phone</td>
                            <td className="content-col">{props.account.phone}</td>
                        </tr>
                        <tr>
                            <td className="title-col">Nick Name</td>
                            <td className="content-col">{props.account.nickname}</td>
                        </tr>
                        <tr>
                            <td className="title-col">Address</td>
                            <td className="content-col">{address ? address.address + ", " + address.city +", " + address.resiState + ", " + address.zip : <span>No shipping Address</span>}</td>
                        </tr>
                    </tbody>
                </table>}
                <button onClick={()=>{changePassRefModal.current.showModal()}}>Change Password</button>
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
