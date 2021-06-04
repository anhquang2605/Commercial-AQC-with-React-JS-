import React, {useState,useEffect} from 'react';
import './contact-box.scss';
import Firebase from "./../../../Firebase";
import {AiOutlineShop, AiOutlinePhone, AiOutlineMail} from 'react-icons/ai';
import {GoLocation} from 'react-icons/go';
const ContactBox = () => {
    const [list, setList] = useState([]);
    const [preparedComponent, setPreparedComponent] = useState([]);
    const db = Firebase.firestore();
    const ICON_MATCH = {
        "company name": <AiOutlineShop></AiOutlineShop>,
        "phone": <AiOutlinePhone></AiOutlinePhone>,
        "email": <AiOutlineMail></AiOutlineMail>,
        "address": <GoLocation></GoLocation>,
    }
    let fetchListFromDb = () =>{
        db.collection("contact informations").get().then((snap)=>{
            let dalist = [...list];
            snap.forEach((item)=>{
                dalist.push(item.data());
            });
            setList(dalist);
        })
    }
    let makeComponentFromList = () => {
        return list.map((item)=>(
            <div key={item.title} className="contact-bar">
                <div className="contact-title">
                    {ICON_MATCH[item.title]}
                </div>
                <div className="contact-content">
                    {item.content}
                </div>
            </div>
        )) 
  
    }
    useEffect(()=>{
        fetchListFromDb();
    },[])
    useEffect(() => {
        if(preparedComponent.length === 0){
            setPreparedComponent(makeComponentFromList());
        }
    }, [list]);
    return (
        <div className="contact-box">
            {preparedComponent? preparedComponent : ""}
        </div>
    );
}

export default ContactBox;
