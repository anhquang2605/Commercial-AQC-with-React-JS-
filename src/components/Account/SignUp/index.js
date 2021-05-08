import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import AwesomeForm from '../../AwesomeForm';
import Firebase from '../../Firebase';
import bcrypt from 'bcryptjs';
import './sign-up.scss';
const SignUp = () => {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState("");
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [validUser, setValidUser] = useState(true);
    const [foundUser, setFoundUser] = useState(false);
    const [validPassword, setValidPassword] = useState(true);
    const [validPasswordLength, setValidPasswordLength] = useState(true);
    const [readyToCreate, setReadyToCreate] = useState(true);
    const db = Firebase.firestore();
    const USER_LENGTH_MINIMUM = 6;
    const PASSWORD_LENGTH_MINUMUM = 8;
    const history = useHistory();
    let handleUserNameChange = (e) =>{
        setUsername(e.target.value);
    }
    let handleCheckUserName = () =>{
        let userFieldValue = userName;
        if(userFieldValue.length < USER_LENGTH_MINIMUM){
            setValidUser(false);
        } else {
            setValidUser(true);
        }
        if (userFieldValue!==""){
            db.collection("users").doc(userFieldValue).get().then((doc)=>{
                if (doc.exists){
                    setFoundUser(true);
                } else {
                    setFoundUser(false);
                }
            })
        }
      
    }
    let hashPasswordForAccount = (pass) =>{
        const salt = bcrypt.genSaltSync(10);
        var dahash = bcrypt.hashSync(pass,salt);
        return dahash;
    }
    let handlePasswordChange = (e) =>{
        setPassword(e.target.value);
    }
    let handlePasswordMatchChange = (e) =>{
        setPasswordMatch(e.target.value);
    }
    let handleMatchingPassword = () =>{
        setValidPassword(password===passwordMatch);
    }
    let handleCheckPasswordLength = () =>{
        setValidPasswordLength(password.length >= PASSWORD_LENGTH_MINUMUM)
    }
    let handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    let handleNicknameChange = (e) =>{
        setNickname(e.target.value);
    }
    let handleCreateAccount = () =>{
        if(password === "" || userName === ""){
            setReadyToCreate(false);
            handleCheckUserName();
            handleCheckPasswordLength();
        } else {
            let validForm = validPassword&&validPasswordLength&&!foundUser&&validUser;
            if(validForm){
                setReadyToCreate(validForm);
                let account = {
                    cards: [],
                    email: email,
                    gcards: [],
                    kart: [],
                    nickname: nickname,
                    orders: [],
                    phone: "",
                    shippings: [],
                    tcards: [],
                    username: userName
                }
                let user = {
                    password: hashPasswordForAccount(password),
                    username: userName
                }
                db.collection("users").doc(userName).set(user);
                db.collection("accounts").doc(userName).set(account);
                history.push("/sign-in");
            }
            
        }
    }
    return (
        <div id="sign-up">
            <AwesomeForm title="Sign Up" width="fix-width small">
                <span className="aform-field">
                    <label>User Name</label>
                    <input type="text" name="user-name" value={userName} onBlur={handleCheckUserName} onChange={handleUserNameChange} autoComplete="off"></input>
                    <span className="error" hidden={!foundUser}>This username was used, please try using a different one</span>
                    <span className="error" hidden={validUser}>Username should be at least 6 characters</span>

                </span>
                <span className="aform-field">
                    <label>Preferred name</label>
                    <input type="text" name="nickname" value={nickname} onChange={handleNicknameChange}></input>
                </span>
                <span className="aform-field">
                    <label>Your Password</label>
                    <input type="password" name="password" value={password} onBlur={handleCheckPasswordLength} onChange={handlePasswordChange}></input>
                    <span className="error" hidden={validPasswordLength}>password should be at least 8 characters</span>
                </span>
                <span className="aform-field">
                    <label>Re-enter Password</label>
                    <input type="password" name="password-match" onBlur={handleMatchingPassword} value={passwordMatch} onChange={handlePasswordMatchChange}></input>
                    <span className="error" hidden={validPassword}>the password does not match with what you entered</span>
                </span>
                <span className="aform-field">
                    <label>Email</label>
                    <input type="email" name="email" value={email} onChange={handleEmailChange}></input>
                </span>
                <span className="error" hidden={readyToCreate}>Can not create account, please resolve the errors</span>
                <button onClick={handleCreateAccount} className="aform-button submit">Create Account</button>
            </AwesomeForm>
        </div>
    );
}

export default SignUp;
