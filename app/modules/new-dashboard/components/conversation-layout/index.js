import { Component } from 'react';
import React from "react";
import './style.scss';


export class ConversationLayout extends Component{

    
    render() {        
        const messages = [{message: "A new Discussion: <span class='highlight'>Operation on how to take photo</span> was posted in <span class='highlight'>Ptolemy</span> by <span class='highlight'>Diego Toscan</span> (10GP)", time: "09:12 UTC", showIcon: false, iconURL: "", date: "April 15, 2020"},
                            {message: "<span class='highlight'>Brooklyn Black</span> received a Jupiter Badge", time: "12:33 UTC", showIcon: true, iconURL: "https://vega.slooh.com/assets/v4/dashboard-new/jupiter.svg", date: "April 15, 2020"},
                            {message: "A new Discussion: <span class='highlight'>Operation on how to take photo</span> was posted in <span class='highlight'>Ptolemy</span> by <span class='highlight'>Diego Toscan</span> (10GP)", time: "09:12 UTC", showIcon: false, iconURL: "", date: "Today, April 17, 2020"},
                            {message: "<span class='highlight'>Brooklyn Black</span> received a Jupiter Badge", time: "12:33 UTC", showIcon: true, iconURL: "https://vega.slooh.com/assets/v4/dashboard-new/jupiter.svg", date: "Today, April 17, 2020"}];
        
        return (
            <div className="conversation-main">
                {messages.map((message, index, array)=>(
                    <div className="message-container">
                        {(index == 0 || array[index].date !== array[index-1].date ) ? (
                            <h5 className="conversation-date">{message.date}</h5>
                        ):null}
                        
                        <div className="message-content">
                            {message.showIcon && (
                                <div className="col-left polygon-background">
                                    <img src={message.iconURL}/>
                                </div>
                            )}                            
                            <div className="col-right">
                                <p className="message-text" dangerouslySetInnerHTML={{__html: message.message}} />
                                <br/>
                                <p className="message-time">{message.time}</p>
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>   
        );
    }

}