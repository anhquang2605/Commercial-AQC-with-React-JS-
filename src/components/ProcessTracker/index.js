import React, {useState, useEffect} from 'react';
import './process-tracker.scss';
const ProcessTracker = (props) => {
    const [list, setList] = useState([]);
    const [curItem, setCurItem] = useState(null);
    let handleItemsWidth = (list) => {
        let theProcess = document.getElementById("process-" + props.name);
        if(theProcess){
            let theProgression = theProcess.getElementsByClassName("progress-bar")[0];
            let widthOfProgress = theProgression.offsetWidth;
            let noOfItems = list.length;
            let itemWidth = widthOfProgress/ noOfItems;
            let itemList = theProcess.getElementsByClassName("item-list")[0];
            itemList.style.width = widthOfProgress + "px";
            let items = itemList.getElementsByClassName("item"); 
            for (var i  = 0; i < items.length; i+=1){
                items[i].style.width = itemWidth + "px";
            }
        }
    }
    let handleTrackerBarProgression = () => {
        let theProcess = document.getElementById("process-" + props.name);
        if(theProcess ){
            let theProgression = theProcess.getElementsByClassName("filled-progress")[0];
            let routeName = props.page.replace("/","");
            let theItem = document.getElementById(routeName + "-check");
            
            let theCheckedCircle = theItem.getElementsByClassName("checked-item")[0];
            let curWidth = theCheckedCircle.offsetLeft; 
            theProgression.style.width = curWidth + "px";
        }
    }
    let findIndexInList = (key,value,list) =>{
        for (var i = 0; i < list.length; i+=1){
            if(list[i][key] === value){
                return i;
            }
        }
        return -1;
    }
    let itemMarker = () =>{
        let daList = [...list];
        let indexOfCur = findIndexInList("route",props.page.replace("/",""),daList);
        console.log(indexOfCur);
        for(var item of daList){
            item.done = false;
        }
        for (var i = 0; i <= indexOfCur; i += 1){
            daList[i].done = true;
        }
        console.log(daList);
        setList(daList);
    }
    useEffect(() => {
        if(props.list !== undefined && props.list !== null){
            setList(props.list);
        }
        window.addEventListener("resize", function(){
            handleItemsWidth(props.list);
            handleTrackerBarProgression();   
        }); 
        return () => window.removeEventListener("resize",function(){
            handleItemsWidth(props.list);
            handleTrackerBarProgression();   
        })
    }, []);
    
    useEffect(()=>{
        if(curItem !== props.page)
        setCurItem(props.page);
    },[props.page])
    useEffect(()=>{
        if(curItem !== undefined && curItem !== null) 
        { 
        itemMarker();
        handleItemsWidth(props.list);
        handleTrackerBarProgression();}
        
    },[curItem])
    useEffect(()=>{
        
    },[list])
    return (
        <div className="process-tracker" id={ props.name? "process-"+props.name : ""}>
            <div class="progress-bar">
                <div class="filled-progress">

                </div>
            </div>
            <div className="item-list">
            {list ? list.map((item)=>(
                <div key={item.name} className={"item " + (item.done ? "item-done" : "")} id={item.route + "-check"}>
                     <div class="checked-item">

                     </div>
                    <div class="item-name">
                       {item.name}
                    </div>
                </div>
            )): "No Item"}
            </div>
        </div>
    );
}

export default ProcessTracker;
