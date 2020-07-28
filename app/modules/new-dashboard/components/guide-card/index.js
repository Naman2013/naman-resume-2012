import { Component } from 'react';
import React from "react";
import './style.scss';
import { Button } from '../button';
import { browserHistory } from 'react-router';

export class GuideCard extends Component{

    
    render() {
        const { guide } = this.props;
        const limit = 75;

        return (
            <div className="guide-card">
                {/* <div className="guide-content"> */}
                    <h4 className="guide-title" dangerouslySetInnerHTML={{ __html: guide.itemTitle}}/>                             
                    <h4 className="guide-subtitle" dangerouslySetInnerHTML={{ __html: guide.author}}/>
                    <h4 className="guide-info" dangerouslySetInnerHTML={{ __html: guide.description.length > limit ? guide.description.substring(0,limit)+"..." : guide.description}}/>
                    <Button
                        type={"button"}
                        onClickEvent={()=>{browserHistory.push(guide.linkURL)}} 
                        text={guide.linkLabel}                                             
                        style={"button-border"}
                    />
                {/* </div>   */}
            </div>
        );
    }

}