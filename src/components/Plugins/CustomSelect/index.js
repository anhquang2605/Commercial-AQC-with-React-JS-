import React, {useState,useEffect} from 'react';
import './custom-select.scss';
const CustomSelect = (props) =>{
    //to provide list for list of item, desiredField for what value or name would be used in the item 
    //optional setOption function to be passed so that any change from here will be notified to the user 
    //of this plugin
    const [list, setList] = useState(props.list);
    const [id, setID] = useState(props.id);
    const [selected, setSelected] = useState({});
    const [dropped, setDropped] = useState(false);
    const [desiredField, setDesiredField] = useState(props.desiredField? props.desiredField : "name");
    let handleSelected = (item) =>{
        setSelected(item);
        //if the user pass the set option function
        props.setOption && props.setOption(item);
        closeList();
    }
    let dropList = (e) =>{
        e.stopPropagation();
        setDropped(true);
        var dropdown = document.getElementById(id);
        if (dropdown){
            dropdown.classList.add("expanded");
        }
    }
    let closeList = () =>{
        setDropped(false);
        var dropdown = document.getElementById(id);
        if(dropdown){
            dropdown.classList.remove("expanded");
        }
       
    }
    let handleOutSideClick = () =>{
        const outsideClickListener = e => {
            if(e.target.closest("custom-select") === null){
                //function to close component is here
                closeList();
                removeOutsideClick();
            } 
        }
        const removeOutsideClick = () =>{
            document.removeEventListener("click",handleOutSideClick);
        }
        document.addEventListener('click', outsideClickListener);
    }

    useEffect(() => {
        setList(props.list);
        setSelected(props.selected? props.selected: props.list[0]);
    }, []);
    useEffect(()=>{
        setList(props.list);
    },[props.list])
    return (
        <div className="custom-select">
            <div className="select-list-container">
                <div onClick={(e)=>{
                dropList(e); 
                handleOutSideClick();
                }} className={"selected" + (dropped? " select-clicked" : " ") }>{props.label ? props.label : "Select " + desiredField} 
                {!dropped ? <span className="material-icons-outlined">expand_more</span> : <span className="material-icons-outlined">expand_less</span> }</div>
                <div className="list-dropdown" id={id}>
                    {list && list.map((item)=>(
                        <div key={item[desiredField]} onClick={(e)=>{
                            handleSelected(item)}}>
                            {item[desiredField]}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CustomSelect;
