import React, {useState,useEffect, useImperativeHandle} from 'react';
import './collapsable.scss';
const Collapsable = React.forwardRef((props,ref) => {
    //States
    let [idChosenDiv, setIdChosenDiv] = useState("chosen_"+props.itemName);
    let [idChangeDiv, setIdChangeDiv] = useState("change_field_"+props.itemName);


    //Methods of the component
      //When user click change button to change their cards option
    let handleChange = (e) =>{
        e.stopPropagation();
        var changeField = document.getElementById(idChangeDiv);
        var chosen = document.getElementById(idChosenDiv);
        changeField.classList.remove("display-none");
        chosen.classList.add("display-none");
    }
      //when use click close button or commit to change to hide the change option tab
    let handleClose = (e) =>{
       e.stopPropagation();
       var changeField = document.getElementById(idChangeDiv);
       var chosen = document.getElementById(idChosenDiv);
        chosen.classList.remove("display-none");
        changeField.classList.add("display-none");
    }
    useImperativeHandle(ref, ()=>({//expose the component methods to its user, must use useRef to refer to it 

    }));
    return (
        <div className="collapsable">
            <div id={idChosenDiv} className="chosen-collapsable">
                {props.chosenChildren}
                <button className="change-btn" onClick={handleChange}>Change</button>
            </div>
            <div id={idChangeDiv} className="change-collapsable display-none">
                {props.changeChildren}
                {props.extra? props.extra : ""}
                <button className="close-btn" onClick={handleClose}>Commit Change (Close)</button>
            </div>
        </div>
    );
});

export default Collapsable;
