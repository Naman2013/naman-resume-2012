import { Component } from 'react';
import React from "react";
import './style.scss';
import { TabHeaderWithStatus } from '../tab-header-with-status';



export class Observatories extends Component{

    state = {
        selectedheader: "Chile"
    }

    onTabChange=(title)=>{
        const { getWeatherDataAction } = this.props;
        
        switch(title){

            case "Chile":
                getWeatherDataAction({obsId: "chile"});                
                break;

            case "Canary Islands":
                getWeatherDataAction({obsId: "teide"});
                break;            
            
        }
        this.setState({selectedheader: title});
    };     

    render() {
        const heading = "Observatories";        
        const { ref, wxList, skyConditions } = this.props;
        const { selectedheader } = this.state;
        
        return (
            <div className="observatory-main" ref={ref}>                
                <h2 className="observatory-heading">{heading}</h2>
                <TabHeaderWithStatus
                        headings={[{heading: "Chile", status: false, statusText: "Offline(Non-Active Hours)"},
                                   {heading: "Canary Islands", status: true, statusText: "Online"}]}
                        activeHeading={selectedheader}
                        spaceequally={false}
                        onTabChange={this.onTabChange}
                />
                <div className="observatory-content">
                    <div className="observatory-row">
                        <div className="observatory-col-left">
                            <h5 className="observatory-col-txt">Current Time in Chile</h5>
                            <h5 className="observatory-col-value">12:36 UTC</h5>
                            <br/>
                            <h5 className="observatory-col-txt">Night Telescope Hours</h5>
                            <h5 className="observatory-col-value">23:30 - 06:00 UTC</h5>
                            <br/>
                        </div>
                        <div className="observatory-col-right">
                        <h5 className="observatory-col-txt">Sunrise - Sunset</h5>
                            <h5 className="observatory-col-value">11:07 - 22:18 UTC</h5>
                            <br/>
                            <h5 className="observatory-col-txt">Moonrise - Moonset</h5>
                            <h5 className="observatory-col-value">03:10 - 17:00 UTC</h5>
                            <br/>
                            <h5 className="observatory-col-txt">Lunar Phase</h5>
                            <h5 className="observatory-col-value">Waning Gibbous (64%)</h5>
                            <br/>                        
                        </div>
                        <div className="observatory-col-large">
                        <div className="observatory-row">
                            <div className="flex-point3">
                                {/* <h2 className="temp-value">49°F</h2> */}
                                <div className="pad5">
                                    <img className="icon-value" src="https://vega.slooh.com/assets/v4/dashboard-new/temperature.svg"/>
                                    <span className="values" dangerouslySetInnerHTML={{ __html: wxList.temperature + wxList.temperatureUnits}}/>
                                </div>
                                <div className="pad5">
                                    <img className="icon-value" src="https://vega.slooh.com/assets/v4/dashboard-new/humidity1.svg"/>
                                    <span className="values" dangerouslySetInnerHTML={{ __html: wxList.humidity + wxList.humidityUnits}}/>
                                </div>
                                <div className="pad5"> 
                                    <img className="icon-value" src="https://vega.slooh.com/assets/v4/dashboard-new/wind1.svg"/>
                                    <span className="values" dangerouslySetInnerHTML={{ __html: wxList.windspeed + wxList.windspeedUnits}}/>
                                </div>
                                <div className="pad5">
                                    <img className="icon-value" src="https://vega.slooh.com/assets/v4/dashboard-new/dew_point.svg"/>
                                    <span className="values" dangerouslySetInnerHTML={{ __html: wxList.dewpoint + wxList.dewpointUnits}}/>                                    
                                </div>
                            </div>
                            <div className="flex-1">
                                <h4 className="observatory-col-value pad5">Sky Rating</h4>
                                <h5 className="level">{"Level "+skyConditions.seeingConditionsIndex}</h5>
                                <p className="reason">{skyConditions.seeingConditionsDescription}</p>
                            </div>
                        </div>                        
                    </div> 
                    </div>
                    <br/>
                    <div className="observatory-col">
                        <div className="observatory-row">
                            <div className="flex-point3">
                                <div className="pad5">
                                    <img className="icon-value" src="https://vega.slooh.com/assets/v4/dashboard-new/temperature.svg"/>
                                    <span className="values" dangerouslySetInnerHTML={{ __html: wxList.temperature + wxList.temperatureUnits}}/>
                                </div>
                                <div className="pad5">
                                    <img className="icon-value" src="https://vega.slooh.com/assets/v4/dashboard-new/humidity1.svg"/>
                                    <span className="values" dangerouslySetInnerHTML={{ __html: wxList.humidity + wxList.humidityUnits}}/>
                                </div>
                                <div className="pad5"> 
                                    <img className="icon-value" src="https://vega.slooh.com/assets/v4/dashboard-new/wind1.svg"/>
                                    <span className="values" dangerouslySetInnerHTML={{ __html: wxList.windspeed + wxList.windspeedUnits}}/>
                                </div>
                                <div className="pad5">
                                    <img className="icon-value" src="https://vega.slooh.com/assets/v4/dashboard-new/dew_point.svg"/>
                                    <span className="values" dangerouslySetInnerHTML={{ __html: wxList.dewpoint + wxList.dewpointUnits}}/>                                    
                                </div>
                            </div>
                            <div className="flex-1">
                                <h4 className="observatory-col-value pad5">Sky Rating</h4>
                                <h5 className="level">{"Level "+skyConditions.seeingConditionsIndex}</h5>
                                <p className="reason">{skyConditions.seeingConditionsDescription}</p>
                            </div>
                        </div>                        
                    </div> 
                </div>                                   
            </div>   
        );
    }

}