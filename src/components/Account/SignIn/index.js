import React, {useEffect, useState} from 'react';
import AwesomeForm from '../../AwesomeForm';
import bcrypt from 'bcryptjs';
import Firebase from './../../Firebase';
import './sign-in.scss';
const SignIn = () => {
    const [passwordField, setPasswordField] = useState("");
    const [usernameField, setUsernameField] = useState("");
    const [password, setPassword] = useState("");
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
                return true;
            } else {
                return false;
                console.log("Wrong pass word or ID")
            }   
        })
    }
    let userInDatabase = (user) => {
        let found = false;
        db.collection("users").get().then((res)=>{
                res.docs.map((doc)=>{
                    if(doc.data().username === user){
                       console.log("user found");
                       found = true;
                    }
                })
        });
        return found;
    }
    let handlePasswordCheck = () => {

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
    useEffect(()=>{
        let user = "anhquang2605"
        if(userInDatabase(user)){
            getPasswordFromUser(user);
        } else {
            console.log("dont find any user named" + user)
        };
    },[])
    useEffect(()=>{
        if(password !== ""){
            comparePasswordWithHash("292/B22Bui", password);
        }
    },[password])
    return (
        <div className="sign-in-aqc">
                <AwesomeForm title="Sign In"> 
                    <span className="username aform-field">
                        <label>
                            User Name
                        </label>
                        <input type="text" name="user" value={usernameField} onChange={handleUsernameFieldChange}>

                        </input>
                    </span>
                    <span className="user-password aform-field">
                        <label>
                            Password
                        </label>
                        <input type="password" name="pass" value={passwordField} onChange={handlePasswordFieldChange}>

                        </input>
                    </span>
                    <button>Sign In</button>
                </AwesomeForm>
        </div>
    );
}

export default SignIn;
