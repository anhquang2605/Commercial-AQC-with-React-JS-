import React from 'react';
import './collapse-tab.scss';
import {RiArrowUpSLine,RiArrowDownSLine} from 'react-icons/ri';
const CollapseTab = (props) => {
    let handleCollapse = (e) => {
        const target = e.target;
        let contentBox, id, arrowUp, arrowDown;
        if(target.nodeName ==="IMG"){
            contentBox =  target.parentElement.parentElement.nextSibling;
            contentBox.classList.toggle("display-none");
        } else if(!target.matches(".collapse-title")){
            contentBox = target.parentElement.nextSibling
            contentBox.classList.toggle("display-none");
        } else {
           contentBox =  target.nextElementSibling;
           contentBox.classList.toggle("display-none")
        };
        id = contentBox.getAttribute("id");
        arrowUp = contentBox.previousSibling.children[0];
        arrowDown = contentBox.previousSibling.children[1];
        if(contentBox.classList.contains("display-none")){
            arrowUp.classList.add("hidden-arrow");
            arrowDown.classList.remove("hidden-arrow"); 
        }else{
            arrowUp.classList.remove("hidden-arrow");
            arrowDown.classList.add("hidden-arrow"); 
        }
    }
    return (
        <div className="collapse-tabs">
            {props.list && props.list.map((item,index)=>{
                return(
                <div className="collapse-tab" key={index} id={"collapse-"+index}>
                    <div className="collapse-title" onClick={handleCollapse}>
                        {item.title}
                        <RiArrowUpSLine id={index+"-arrowup"}></RiArrowUpSLine>
                        <RiArrowDownSLine id={index+"-arrowdown"} className="hidden-arrow"></RiArrowDownSLine>
                    </div>
                    <div className="collapse-content" id={index}>
                        {item.content}
                    </div>
                </div>
                )
            })}
            
        </div>
    );
}

export default CollapseTab;
