import { Component } from 'react';
import React from "react";
import './style.scss';


export class Button extends Component{

    
    render() {
        const { text, style, onClickEvent, type, icon, disabled} = this.props;    

        return (            
                <button className={"button-container "+ style} onClick={onClickEvent} type={type} disabled={disabled}>
                    {icon && <img alt="" className="new-button-icon" src={icon} />}
                    {text}
                </button>
        );
    }

}