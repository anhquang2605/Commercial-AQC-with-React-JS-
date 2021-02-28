import React ,{useEffect, useState, useRef} from 'react';
import Modal from './../Plugins/Modal';
import './account.scss';
import LinkCards from './Plugins/LinkCards';
const Account = (props) => {
    const changePassRefModal = useRef(null);
    const otherInfo = [{name: "Your Cards", path: "account/cards"},{name: "Gift Cards You Owned", path: "account/gcards"},{name: "Your Orders", path: "account/orders"}]
    return (
        <div>
            <h4>Account Information</h4>
            <div className="account information">
                <table>
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
                    </tbody>
                </table>
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
                <div className="other-information-access">
                    {otherInfo && <LinkCards list={otherInfo}>
                    </LinkCards>}
                </div>
            </div>
        </div>
    );
}

export default Account;
