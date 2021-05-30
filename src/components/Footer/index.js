import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Firebase from 'firebase';
import './footer.scss';
const Footer = () => {
    const [list, setList] = useState({});
    const [preparedList, setPreparedList] = useState([]);
    const db = Firebase.firestore();
    const LIST_OF_ITEMS = ["account guides", "helps" ,"guides"];
    const currentTime = new Date();
    let fetchItems = () =>{
        for (var i = 0; i < LIST_OF_ITEMS.length; i += 1){
            let item = LIST_OF_ITEMS[i];
            let daList = [];
            db.collection(item).onSnapshot(querySnapshot=>{
                querySnapshot.forEach(data=>{
                    console.log(data.data());
                    daList.push(data.data());
                });
                let holdArray = {};
                console.log(list);
                for (var key in list){
                    holdArray[key] = list[key];
                }
               holdArray[item] = daList;
               console.log(holdArray);
               setList(holdArray);
               // setList((prevState) => {...prevState, holdArray});
            })
        }
        }
    let prepareComponents = () =>{
        setPreparedList(()=>{
            for (var dakey in list){
                return (<ul key={dakey} className="footer-items">
                    <li className="main-item">{dakey}</li>
                    {list[dakey].map((item)=>(
                        <li key={item.title}><Link to={item.route}>{item.title}</Link></li>
                    ))}
                </ul>)
            }
        })
    }
    useEffect(() => {
            fetchItems();
    }, []);
    useEffect(()=>{
       prepareComponents();
    },[list])
    return (
        <div className="footer">
            {preparedList ? preparedList : "Nothing"}
        </div>
    );
}

export default Footer;
