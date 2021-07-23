import React, {useEffect} from 'react';
import './marker.scss';
import {FaMapMarkerAlt} from 'react-icons/fa';
const Marker = (props) => {
    let makeMarkerStrikeAtPoint = () =>{
        let marker = document.getElementsByClassName('marker')[0];
        if(marker){
            marker.classList.add("strike");
        }
    }
    useEffect(() => {
        setTimeout(() => {
            makeMarkerStrikeAtPoint();
        }, 1000);
    }, []);
    return (
        <div className="marker" id={"marker" + (props.tittle? props.title : "")}>
            <FaMapMarkerAlt></FaMapMarkerAlt>
        </div>
    );
}

export default Marker;
