import React, {useState, useEffect, useRef} from 'react';
import './process-tracker.scss';
/**
 * What to provide via props? 
 * _ provide list(Array<Object>) of items that have 4 properties: 
 *      name(String) which is used to display as the process name does not need to be the same with route, 
 *      route(string) (this match with the route in app), 
 *      done(bool) for keeping track of the progress and,
 *      icon(html element) - (optional) for the icon inside the circle
 * _ provide name(String) to make unique id for the component
 * 
 * 
 */
const ProcessTracker = (props) => {
    const [list, setList] = useState([]);
    const [curItem, setCurItem] = useState(null);
    const curItemRef = useRef({});
    const listRef = useRef([]);
    listRef.current=list;
    curItemRef.current = curItem;//To get the state inside window event listener, when resize
    // the window event listener create a closure so it use the intitial state the moment it attached to the function
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
        if(theProcess && curItemRef.current !== undefined ){
            let theProgression = theProcess.getElementsByClassName("filled-progress")[0];
            let theBar= theProcess.getElementsByClassName("progress-bar")[0];
            let routeName = curItemRef.current.replace("/","");
            let theItem = document.getElementById(routeName + "-check");
            let index = parseInt(theItem.dataset.index);
            let theCheckedCircle = theItem.getElementsByClassName("checked-item")[0];
            let curWidth = theCheckedCircle.offsetLeft; 
            if(index === listRef.current.length - 1){
                //Final
                curWidth = theBar.offsetWidth;
            }
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
        for(var item of daList){
            item.done = false;
        }
        for (var i = 0; i <= indexOfCur; i += 1){
            daList[i].done = true;
        }
        setList(daList);
    }
    let handleTrackerCalculation = () =>{
        handleItemsWidth(props.list);
        handleTrackerBarProgression();
    }
    useEffect(() => {
        if(props.list !== undefined && props.list !== null){
            setList(props.list);
        }
        window.addEventListener("resize", function(){
              handleTrackerCalculation();
        }); 
        return () => window.removeEventListener("resize",function(){
            handleTrackerCalculation(); 
        })
    }, []);
    
    useEffect(()=>{
        setCurItem(props.page);
    },[props.page])
    useEffect(()=>{
        if(curItem !== undefined && curItem !== null) 
        { 
            itemMarker();
            handleTrackerCalculation();
        }
        
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
            {list ? list.map((item,index)=>(
                <div data-index={index} key={item.name} className={"item " + (item.done ? "item-done" : "")} id={item.route + "-check"}>
                     <div class="checked-item">
                        {item.icon? item.icon : ""}
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
