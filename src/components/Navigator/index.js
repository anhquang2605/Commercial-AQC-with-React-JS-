import React, {useEffect, useState} from 'react';
import * as ROUTES from '../../Constants/Routes'
import './navigator.scss';
import OverlayScrollbars from 'overlayscrollbars';
const Navigator = (props) =>{
    const [datarget, setdaTarget] = useState();

    let handleStickyScroll = (container) => {
        var header = document.getElementById("header");
        if(header){
            var headerOffSet = parseInt(header.offsetTop) - 10;
            var handleOffsetOfScroll = container.scroll().handleOffset.y;
            if(headerOffSet < 0 ) headerOffSet = 0;
            if(handleOffsetOfScroll > headerOffSet ){
                header.classList.add("sticky");
            } else {
                header.classList.remove("sticky");
            } 
        }
    }
    useEffect(() => {
        if(props.osScrollBar !== ""){
            let target = props.osScrollBar.osInstance();
            if(target){
                target.options({
                    callbacks:{
                        onScroll: ()=>{handleStickyScroll(target)}
                    }
                })
            }
            /* props.osScrollBar.addEventListener("scroll", ()=>{
              console.log("Here");
          }) */
        }
    }, [props.osScrollBar]);
    return(
        <div id="header">
            {props.children}
        </div>
    )

}
export default Navigator;