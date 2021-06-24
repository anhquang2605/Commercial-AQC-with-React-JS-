import React, {useEffect, useState, useImperativeHandle} from 'react';
import  {AiFillCloseCircle} from 'react-icons/ai';
import './modal.scss';
const Modal = React.forwardRef((props,ref) => {//expose showModal method to the user
    let [id, setid] = useState("modal" + (props.name? ("_"+props.name) : ""));
    let hideModal = () => {
        var daModal = document.getElementById(id);
        daModal.classList.add("hide-modal");
    }
    let showModal = () => {
        var daModal = document.getElementById(id);
        daModal.classList.remove("hide-modal");
    }
    useImperativeHandle(ref, () => ({
        showModal: showModal, hideModal: hideModal
    }));//use ref in parent component to access to the component methods from outside
    useEffect(()=>{
        if (props.hide === false){
            showModal();
        }
    },[props.hide])
    return (
        //initially hide the modal with hide-modal class, can be found in modal.scss in the same directory
        <div className="modal-container hide-modal" id={"modal" + (props.name? ("_"+props.name) : "") }>
            <div className="modal awesome_form fix-width wide">
                {props.hasTitle && <h5>{props.name.replaceAll('-'," ").toUpperCase()}</h5>}
                <button className="close-btn-modal" onClick={hideModal}><AiFillCloseCircle></AiFillCloseCircle></button>
                {props.children}
            </div>
            <div className="black-curtain"></div>
        </div>
    );
});

export default Modal;
