import React, {useEffect, useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import AwesomeForm from '../../AwesomeForm';
import bcrypt from 'bcryptjs';
import Firebase from './../../Firebase';
import './sign-in.scss';
const SignIn = (props) => {
    const history = useHistory();
    const [passwordField, setPasswordField] = useState("");
    const [usernameField, setUsernameField] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const [userFound, setUserFound] = useState(null);
    const [passWordMatch, setPasswordMatch] = useState(null);
    const [readyForPassword, setReadyForPassword] = useState(false);
    const db = Firebase.firestore();
   /*bcrypt.genSalt(10, function(err,salt){
        bcrypt.hash(pass, salt, function(err, hash){
            dahash = hash;
        })
    })*/
    
    let updatePasswordToTestUser = (user) =>{
        const salt = bcrypt.genSaltSync(10);
        var pass = "292/B22Bui";
        var dahash = bcrypt.hashSync(pass,salt);
        db.collection("users").doc(user).update({
            password: dahash
        })
    }
    let comparePasswordWithHash = (pass, dahash) => {
        bcrypt.compare(pass, dahash, function(err,res){
            if(res){
                setPasswordMatch(true);
                props.setUserForApp(user);
                history.push("");
            } else {
                setPasswordMatch(false);
                console.log("Wrong pass word or ID")
            }   
        })
    }
    let userInDatabase = (user) => {
        db.collection("users").get().then((res)=>{
                var found = false;
                res.docs.map((doc)=>{
                    if(doc.data().username === user){
                       found = true;
                       setUser(user);
                       setReadyForPassword(true);
                    } 
                });
                setUserFound(found);
        })
    }
    let getPasswordFromUser = (user) =>{
        db.collection("users").doc(user).get().then((res)=>{
            setPassword(res.data().password)
        });
    }
    let handlePasswordFieldChange = (e) => {
        setPasswordField(e.target.value);
    }
    let handleUsernameFieldChange = (e) => {
        setUsernameField(e.target.value)
    }
    let handleSignIn = () => {
        if(readyForPassword){
            if (userFound && password !== ""){
                setPasswordMatch(comparePasswordWithHash(passwordField, password));
            } else if (userFound){
                getPasswordFromUser(user);
            }
        } else {
            if (user !== usernameField || user !== ""){
                userInDatabase(usernameField);
            }
        }

        /* if(userInDatabase(usernameField)){
            setUserFound(true);
        }else{
            setUserFound(false);
        } */
    }
   /*  useEffect(()=>{
        if(password !== ""){
            setPasswordMatch(comparePasswordWithHash(passwordField, password));
        }
    },[password]) */
    useEffect(()=>{
       if(user !== ""){
           getPasswordFromUser(user);
       }
    },[userFound])
    useEffect(()=>{})
    return (
        <div className="sign-in-aqc">
                <div className={"error no-user " + (userFound === true || userFound ===  null ? "error-hidden" : "")}>No user found</div>
                <div className={"error password-unmatch " + (passWordMatch === true || passWordMatch === null ? "error-hidden" : "")}>Wrong password</div>
                <AwesomeForm title="Sign In" width="fix-width small"> 
                    <span className="username aform-field">
                        <label>
                            User Name
                        </label>
                        <input type="text" name="user" value={usernameField} onChange={handleUsernameFieldChange} autoComplete="off" disabled={readyForPassword}>

                        </input>
                    </span>
                    <span className={"user-password aform-field" + (userFound && readyForPassword? "":" hidden-field")} >
                        <label>
                            Password
                        </label>
                        <input type="password" name="pass" value={passwordField} onChange={handlePasswordFieldChange} autoComplete="off">

                        </input>
                    </span>
                    <button className={"aform-button submit"} onClick={()=>{
                        history.push("/sign-up");
                    }}>Sign Up</button>
                    <button className={"aform-button submit"+ (readyForPassword ? " " : " hidden-btn")} onClick={()=>{setReadyForPassword(false); setUser(""); setPasswordMatch(true)}}>Change username</button>
                    <button className="aform-button submit" onClick={handleSignIn}>{!readyForPassword ? "Next" : "Sign In"}</button>
                </AwesomeForm>
        </div>
    );
}

export default SignIn;
