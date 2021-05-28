import React from 'react';
import CollapseTab from './../../Plugins/CollapseTab';
import './help.scss';
const Help = () => {
    const list = [
        {
            title: "help",
            content: ""
        },
        {
            title: "guide",
            content: ""
        }
    ]
    return (
        <div className="help">
            <h4>Help</h4>
            <div className="panel">
            <div className="side-panel">
                <CollapseTab list={list} >
                </CollapseTab>
            </div>
            <div className="display-panel">

            </div>
            </div>
           
        </div>
    );
}

export default Help;
