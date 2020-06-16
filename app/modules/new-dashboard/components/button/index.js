import { Component } from 'react';
import React from "react";
import './style.css';


export class Button extends Component{

    
    render() {
        const { text, style, onClickEvent, type} = this.props;    

        return (            
                <button className={"button-container "+ style} onClick={onClickEvent} type={type}>
                    {text}
                </button>
        );
    }

}