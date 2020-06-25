import { Component } from 'react';
import React from "react";
import './style.css';
import { Field, reduxForm } from 'redux-form';
import InputField from 'app/components/form/InputField';

export class AstronomerConversationLayout extends Component{

    
    render() {        
        const messages = [{question: "“I want to ask about La Superba. In what year period i can take a photo with that?”", answer: "“I want to ask about La Superba. In what year period i can take a photo with that?I want to ask about La Superba. In what year period i can take a photo with that?I want to ask about La Superba. In what year period i can take a photo with that?I want to ask about La Superba. In what year period i can take a photo with that?I want to ask about La Superba. In what year period i can take a photo with that?”"}];
        
        return (
            <div className="astronomer-conversation-main">
                {messages.map((message)=>(
                    <div className="astronomer-message-container">
                        {/* {(index == 0 || array[index].date !== array[index-1].date ) ? (
                            <h5 className="conversation-date">{message.date}</h5>
                        ):null} */}
                        
                        <div className="astronomer-message-content">
                            {/* {message.showIcon && (
                                <div className="col-left polygon-background">
                                    <img src={message.iconURL}/>
                                </div>
                            )}                             */}
                            <div className="col-right">
                                <div>
                                    <span className="astronomer-conversation-head">{"12 June 2020, 13:40"}</span>
                                    <span className="astronomer-conversation-head">Status: {"Answered (13 June 2020, 10:42)"}</span>
                                    <span className="astronomer-conversation-head">AstoType: {"Free Question"}</span>
                                    <span className="astronomer-conversation-head">Anonyme Questions: {"Yes"}</span>
                                </div>
                                <br/>
                                <p className="astronomer-message-head">{"Questions:"}</p>
                                <p className="astronomer-message-text" dangerouslySetInnerHTML={{__html: message.question}} />
                                <br/>
                                <p className="astronomer-message-head">{"Answer:"}</p>
                                <p className="astronomer-message-text" dangerouslySetInnerHTML={{__html: message.answer}} />
                            </div>
                            
                        </div>                        
                    </div>
                ))}
                <div className="astronomer-message-container">
                    <div className="astronomer-message-content">
                        <div className="enter-message-container">
                            <input className="message-input" placeholder="Write your question below and one of our astronomers will answer you" type="text" />
                            <img className="message-send-button" src="https://vega.slooh.com/assets/v4/dashboard-new/send_icon_grey.svg" />
                        </div>
                        <div className="astronomer-message-options">
                            <span className="astornomer-question-type">Astro Type: </span>
                            <select className="astronomer-message-type">
                                <option>Free Question</option>
                            </select>
                            <input className="astronomer-anonyme" type="checkbox"/>
                            <span class="astronomer-anonyme-text">{"Ask as an Anonyme"}</span>
                        </div>
                    </div>
                    
                </div>
            </div>   
        );
    }

}