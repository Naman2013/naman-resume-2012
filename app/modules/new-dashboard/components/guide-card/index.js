import { Component } from 'react';
import React from "react";
import './style.scss';
import { Button } from '../button';

export class GuideCard extends Component{

    
    render() {
        const { guide } = this.props;

        return (
            <div className="guide-card">                
                <h4 className="guide-title">{guide.title}</h4>                             
                <h4 className="guide-subtitle">{guide.subtitle}</h4>
                <h4 className="guide-info">{guide.info}</h4> 
                <Button
                    type={"button"}
                    onClickEvent={()=>{}} 
                    text={"View Guide"}                                             
                    style={"button-border"}
                />
            </div>
        );
    }

}