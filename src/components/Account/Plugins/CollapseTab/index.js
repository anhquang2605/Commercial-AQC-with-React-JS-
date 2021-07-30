import React from 'react';
import './collapse-tab.scss';
const CollapseTab = (props) => {
    let handleCollapse = (e) => {
        const target = e.target;
        if(target){
            var dropdownIcon =  target.previousSibling;
            target.parentNode.nextSibling.classList.toggle("display-none");
            if(dropdownIcon.innerHTML === "expand_more"){
                dropdownIcon.innerHTML = "expand_less";
            }else{
                dropdownIcon.innerHTML = "expand_more";
            }
        }
        //target.nextSibbling.nextSibbling.classList.toggle("display-none");
        //console.log(target.nextSibbling.nextSibbling);
    }
    return (
        <div className="collapse-tabs">
            {props.list && props.list.map((item,index)=>{
                return(
                <div className="collapse-tab" key={index} id={"collapse-"+index}>
                    <div className="collapse-title">
                        {item.title}
                        <span class="material-icons">expand_more</span>
                        <div className="screen"  onClick={handleCollapse}></div>
                    </div>
                    <div className="collapse-content display-none">
                        {item.content}
                    </div>
                </div>
                )
            })}
            
        </div>
    );
}

export default CollapseTab;
