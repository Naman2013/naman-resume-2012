import { Component } from 'react';
import React from "react";
import './style.scss';
import { TabHeaderWithStatus } from '../tab-header-with-status';
import { getWeatherActions, getSkyRating } from '../../dashboardApi';
import { getUserInfo } from 'app/modules/User';


export class Observatories extends Component{

    state = {
        selectedheader: "Chile",
        wxList: undefined,
        skyConditions: undefined,        
    }

    componentDidMount(){
        const { list, getWeatherDataAction, getObsStatus, getNewDashObs } = this.props;        
        if(list){
            const { obsId, SeeingConditionsWidgetId, DayNightBarWidgetId, MoonlightBarWidgetId, } = list[0];
            getWeatherDataAction({ obsId });
            getNewDashObs({obsId,                 
                dayNightBarWidgetUniqueId: DayNightBarWidgetId,
                moonlightBarWidgetUniqueId: MoonlightBarWidgetId,
                seeingConditionsWidgetUniqueId: SeeingConditionsWidgetId });                
            getObsStatus(obsId);
            // getSkyData({ obsId , widgetUniqueId: SeeingConditionsWidgetId });
        }
            
    }

    onTabChange=(selectedHeader)=>{
        const { getWeatherDataAction, getObsStatus, getNewDashObs } =this.props;
        const { obsId, obsShortName, SeeingConditionsWidgetId, DayNightBarWidgetId, MoonlightBarWidgetId, } = selectedHeader;        
        getWeatherDataAction({ obsId });
        getNewDashObs({obsId,                 
            dayNightBarWidgetUniqueId: DayNightBarWidgetId,
            moonlightBarWidgetUniqueId: MoonlightBarWidgetId,
            seeingConditionsWidgetUniqueId: SeeingConditionsWidgetId });                
        getObsStatus(obsId);
        // getSkyData({ obsId , widgetUniqueId });
        this.setState({selectedheader: obsShortName});
    };     

    render() {
        const heading = "Observatories";        
        const { list, wxList, obsWidgetData, obsStatus } = this.props;        
        const { selectedheader } = this.state;       
        
        return (
            <div className="observatory-main" >                
                <h2 className="observatory-heading">{heading}</h2>
                <TabHeaderWithStatus
                        // headings={[{heading: "Chile", status: false, statusText: "Offline(Non-Active Hours)"},
                        //            {heading: "Canary Islands", status: true, statusText: "Online"}]}
                        headings={list}
                        activeHeading={selectedheader}
                        spaceequally={false}
                        onTabChange={this.onTabChange}
                />
                {wxList && obsWidgetData && obsStatus && (
                    <div className="observatory-content">
                        <div className="observatory-row">
                            <div className="observatory-col-left">
                                <h5 className="observatory-col-txt">{obsStatus.clockList.obsCurrentTime.displayLabel}</h5>
                                <h5 className="observatory-col-value">{obsStatus.clockList.obsCurrentTime.displayTime} {obsStatus.clockList.obsCurrentTime.displayTimeZone}</h5>
                                <br/>
                                <h5 className="observatory-col-txt">Night Telescope Hours</h5>
                                <h5 className="observatory-col-value">{obsStatus.clockList.obsOpen.displayTime} - {obsStatus.clockList.obsClosed.displayTime} {obsStatus.clockList.obsClosed.displayTimeZone}</h5>
                                <br/>
                            </div>
                            <div className="observatory-col-right">
                            <h5 className="observatory-col-txt">{obsWidgetData.widgetsData.dayNightBar.dayNightRawData.sunriseLabel} - {obsWidgetData.widgetsData.dayNightBar.dayNightRawData.sunsetLabel}</h5>
                                <h5 className="observatory-col-value">{obsWidgetData.widgetsData.dayNightBar.dayNightRawData.sunriseTime} - {obsWidgetData.widgetsData.dayNightBar.dayNightRawData.sunsetTime} {obsWidgetData.widgetsData.dayNightBar.dayNightRawData.timeZone}</h5>
                                <br/>
                                <h5 className="observatory-col-txt">Moonrise - Moonset</h5>
                                <h5 className="observatory-col-value"> 03:10 - 17:00 UTC</h5>
                                <br/>
                                <h5 className="observatory-col-txt">{obsWidgetData.widgetsData.moonlightBar.subwidgets[0].elementTitle}</h5>
                                <h5 className="observatory-col-value">{obsWidgetData.widgetsData.moonlightBar.subwidgets[0].elementValue}</h5>
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
                                    <h5 className="level" dangerouslySetInnerHTML={{ __html: "Level "+ obsWidgetData.widgetsData.seeingConditions.seeingConditionsIndex}}/>
                                    <p className="reason" dangerouslySetInnerHTML={{ __html: obsWidgetData.widgetsData.seeingConditions.seeingConditionsDescription}}/>
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
                                    <h5 className="level" dangerouslySetInnerHTML={{ __html: "Level "+obsWidgetData.widgetsData.seeingConditions.seeingConditionsIndex}}/>
                                    <p className="reason" dangerouslySetInnerHTML={{ __html: obsWidgetData.widgetsData.seeingConditions.seeingConditionsDescription}}/>
                                </div>
                            </div>                        
                        </div> 
                    </div> 
                )}
                                                  
            </div>   
        );
    }

}