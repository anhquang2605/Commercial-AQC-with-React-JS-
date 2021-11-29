import React,{useEffect, useState} from 'react';
import { useHistory} from 'react-router-dom';
import emailjs, {init} from 'emailjs-com';
import './email-form.scss';
import './../../AwesomeForm/awesome-form.scss';
import EMAIL_SETTINGS from './../../../Constants/EmailJSInfo';
import {BiMailSend} from 'react-icons/bi';
import {FcHighPriority} from 'react-icons/fc';
const EmailForm = (props) => {
    const [email, setEmail] = useState(props.account? props.account.email : "");
    const [message, setMessage] = useState();
    const [name, setName] = useState();
    const [emailSent, setEmailSent] = useState(false);
    const [success, setSuccess] = useState(true);
    const history = useHistory();
    let sendEmail = (e) => {
        e.preventDefault();
       // emailjs.sendForm(EMAIL_SETTINGS.id);
/*        emailjs.sendEmail(EMAIL_SETTINGS.id, "send_email", {email: email, message: message}).then(result=>{
           console.log(result.text);
       }, error => {
           console.log(error.text);
       }); */
        let templateParams = {
           email:email, 
           message: message, 
           name:name, 
           app: EMAIL_SETTINGS.temp_id.replace("_", " ")
        };
        var promise = new Promise((resolve, reject)=>{
            let buttonWidth = e.target.offsetWidth;
            let buttonHeight = e.target.offsetHeight;
            console.log(buttonHeight,buttonWidth);
            let loadingHTML = document.getElementsByClassName("loading")[0];
            let expndCirHTML =  document.getElementsByClassName("expanding-circle")[0];    
            loadingHTML.style.display = "block";
            //the circle spawn at the center 
            expndCirHTML.style.left = (e.target.offsetLeft + buttonWidth/2) + "px";
            expndCirHTML.style.top = (e.target.offsetTop + buttonHeight/2) + "px";
            expndCirHTML.classList.add("enlarge");
            resolve();
        })
        promise.then(()=>{
            emailjs.send(EMAIL_SETTINGS.id, EMAIL_SETTINGS.temp_id, templateParams).then(
                (result)=>{
                let sentHTML = document.getElementById("sent"); 
                sentHTML.style.display = "flex";
                console.log(result.text);
                setTimeout(()=>{
                    setEmailSent(true);
                    setSuccess(true);
                },1000)
            }, (error) => {
                let notsentHTML = document.getElementById("not-sent"); 
                notsentHTML.style.display = "flex";
                setTimeout(()=>{
                    setEmailSent(true);
                    setSuccess(false);
                },1000)
                console.log(error.text);
            });   
        });
      
       
    }
    let handleEmail = (e) =>{
        setEmail(e.target.value);
    }
    let handleMessage = (e) =>{
        setMessage(e.target.value);
    }
    let handleName = (e) =>{
        setName(e.target.value);
    }
    let resetForm = () =>{
        document.getElementsByClassName("email-sent")[0].style.display = "none";
        document.getElementsByClassName("email-not-sent")[0].style.display = "none";
        document.getElementsByClassName("expanding-circle")[0].classList.remove("enlarge");
        document.getElementsByClassName("loading")[0].style.display = "none"
        setName("");
        setEmail(props.account? props.account.email : "");
        setMessage("");
        setEmailSent(false);
    }
    useEffect(() => {
        init("user_ViVEM5j115nc24QkpvHJr");
    }, []);
    return (
        <div className="email-form">
                <form className={"awesome_form"+ (emailSent? " hidden-ui": "")}>
                    <div className="loading" >
                        <div className="expanding-circle">

                        </div>
                    </div>
                        <span className="aform-field">
                            <label>Email</label>
                            <input type="text" name="email" value={email} onChange={handleEmail}/>
                        </span>
                        <span className="aform-field">
                            <label>Name (Optional)</label>
                            <input type="text" name="name" value={name} onChange={handleName}/>
                        </span>
                        <span className="aform-field">
                            <label>Message</label>
                            <textarea name="message" value={message} onChange={handleMessage}/>
                        </span>
                        <button className="aform-button submit" onClick={sendEmail}>Submit</button>
                </form>
                <div id="sent" style={{display: "none"}} className={"email-sent awesome_form"+ (emailSent && success? "" : " hidden-ui")}>
                    <BiMailSend></BiMailSend>
                    <h5>Awesome, Email Sent!</h5>
                    <p>Thank you for the feedback, someone will answer the email soon</p>
                    <button className="aform-button submit" onClick={()=>{history.push("")}}>Continue Shopping</button> 
                    <button className="aform-button submit" onClick={resetForm}>Send Another Message</button>
                </div>
                <div id="not-sent" style={{display: "none"}} className={"email-not-sent awesome_form display-none "+ (emailSent && !success? "" : " hidden-ui")}>
                    <FcHighPriority></FcHighPriority>
                    <h5>Uh Oh! OTL</h5>
                    <p>There is something wrong with the email service, email is not sent. Call us via <a href="tel:669-264-9439" className="phone-contact">(669)-264-9439</a>, or please try again</p>
                    <button className="aform-button submit" onClick={()=>{history.push("")}}>Continue Shopping</button> 
                    <button className="aform-button submit" onClick={resetForm}>Send Another Message</button>
                </div>
        </div>
    );
}

export default EmailForm;
