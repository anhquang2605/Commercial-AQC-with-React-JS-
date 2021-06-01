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
        let myList = {};
        for (var i = 0; i < LIST_OF_ITEMS.length; i += 1){
            let item = LIST_OF_ITEMS[i];
            let daList = [];
            db.collection(item).get().then(querySnapshot=>{
                querySnapshot.forEach(data=>{
                    daList.push(data.data());
                });
               myList[item] = daList;
               // setList((prevState) => {...prevState, holdArray});
            }).then(()=>{
                if(Object.keys(myList).length === LIST_OF_ITEMS.length){
                    //to make sure that there is maximum items of the array 
                    setList(myList);
                }
            })
        }
        
        }
    let prepareComponents = () =>{
        setPreparedList(()=>{
            let array = [];
            for (var dakey in list){
                array.push(<ul key={dakey} className="footer-items">
                    <li className="main-item">{dakey}</li>
                    {list[dakey].map((item)=>(
                        <li key={item.title}><Link to={item.route? item.route: "#"}>{item.title}</Link></li>
                    ))}
                </ul>)
            }
            return array;
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
