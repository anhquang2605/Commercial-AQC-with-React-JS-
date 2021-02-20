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
                <Modal ref={changePassRefModal} name="change-pass">
                    <div>
                        <div><span>new passwords</span><span><input autoComplete="off" type="password"></input></span></div>
                        <div><span>re enter new passwords</span><span><input autoComplete="off" type="password"></input></span></div>
                        <button>Confirm change</button>
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
