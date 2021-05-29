import React, {useState, useEffect} from 'react';
import CollapseTab from './../../Plugins/CollapseTab';
import Firebase from './../../Firebase';
import './help.scss';
const Help = () => {
    const db = Firebase.firestore();
    const LIST_MAIN_ITEMS = ["helps", "guides"];
    let preparedList;
    let updateCurrentItem = (item) =>{
        setCurrentItem(item);
    }
    const [list, setList] = useState([
        {
            title: "helps",
            content: ""
        },
        {
            title: "guides",
            content: ""
        }
    ])
    let retrieveDocumentsFromFireStore = () =>{
        for (let i = 0; i < LIST_MAIN_ITEMS.length; i += 1){
            let daList = [];
            db.collection(LIST_MAIN_ITEMS[i]).onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc)=>{
                    daList.push(doc.data());
                });
                let newArr = [...list];
                newArr[i].content =  <ul className={LIST_MAIN_ITEMS[i] + " side-panel-items"}>{daList.map((item)=>(
                    <li key={item.title} className="help-list-item" onClick={()=>{
                        updateCurrentItem(item);
                    }}>{item.title}</li>))}
                    </ul>;
                setList(newArr);
            })
        }
      
    }
   
    const [currentItem, setCurrentItem] = useState(null);
    const [proccessedList, SetProcessedList] = useState([]);
    let processContentParagraph = (p) =>{
        let paragraphs = p.split("$$$");
        return paragraphs.map((item, index)=>(
            <p key={index}>{item}</p>
        ));
    }
    useEffect(() => {
            retrieveDocumentsFromFireStore();
    }, []);
    useEffect(()=>{
        if(proccessedList.length === 0){
            SetProcessedList(list);
        }
    },[list]);
    return (
        <div className="help">
            <h4>Help</h4>
            <div className="panel">
            <div className="side-panel">
                <CollapseTab list={proccessedList? proccessedList : []} >
                </CollapseTab>
            </div>
            <div className="display-panel">
                {currentItem ? <div>
                    <h3>{currentItem.title}</h3>
                    <div className="help-content">{processContentParagraph(currentItem.content)}</div>
                </div>:<div className="no current Item">Please choose the question on the collapsable list on the left side</div>}
               
            </div>
            </div>
           
        </div>
    );
}

export default Help;
