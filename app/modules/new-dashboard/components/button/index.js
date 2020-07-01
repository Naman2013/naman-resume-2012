import { Component } from 'react';
import React from "react";
import './style.scss';


export class Button extends Component{

    
    render() {
        const { text, style, onClickEvent, type, icon} = this.props;    

        return (            
                <button className={"button-container "+ style} onClick={onClickEvent} type={type}>
                    {icon && <img alt="" className="button-icon" src={icon} />}
                    <span>{text}</span>
                </button>
        );
    }

}