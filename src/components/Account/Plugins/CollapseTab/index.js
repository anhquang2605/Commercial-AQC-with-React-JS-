import React from 'react';
import './collapse-tab.scss';
const CollapseTab = (props) => {
    let handleCollapse = (e) => {
        const target = e.target;
        
        if(target.nodeName ==="IMG"){
            target.parentElement.parentElement.nextSibling.classList.toggle("display-none");
        } else if(!target.matches(".collapse-title")){
            target.parentElement.nextSibling.classList.toggle("display-none");
        } else {
            target.nextElementSibling.classList.toggle("display-none")
        };
    }
    return (
        <div className="collapse-tabs">
            {props.list && props.list.map((item,index)=>{
                return(
                <div className="collapse-tab" key={index} id={"collapse-"+index}>
                    <div className="collapse-title" onClick={handleCollapse}>
                        {item.title}
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
