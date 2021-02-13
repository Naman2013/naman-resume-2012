import { Component } from 'react';
import React from "react";
import './style.scss';
import { TabHeaderWithStatus } from '../tab-header-with-status';
import { getWeatherActions, getSkyRating, getNewDahObs, getObsStatus } from '../../dashboardApi';
import { getUserInfo } from 'app/modules/User';
import { Spinner } from '../../common/spinner';
import { Link } from 'react-router';
import { Button } from '../button';
import { browserHistory } from 'react-router';
import { TitleHeaderNew } from '../title-header-new';

export class Observatories extends Component{

    constructor(props){
        super(props);
        this.state={
            selectedheader: "Chile",
            wxList: undefined,
            skyConditions: undefined, 
            obsStatus: undefined,
            loading: true,
        }
    }

    statusTimerId= null;
    wxTimerId= null;
    newDashTimerId= null;

    componentWillReceiveProps(newProps)
    {           
        newProps.list.map((item, index)=>{
            const { SeeingConditionsWidgetId: sc, DayNightBarWidgetId: dn, MoonlightBarWidgetId: ml, } = item;
            const { SeeingConditionsWidgetId, DayNightBarWidgetId, MoonlightBarWidgetId, } = this.props.list[index];
            const { selectedHeader } = this.state;
            if(sc != SeeingConditionsWidgetId || dn != DayNightBarWidgetId || ml != MoonlightBarWidgetId && item.observatoryName === selectedHeader){
                this.fetchAllApi(item);
                return;
            }
        });
        
    }

    getObsStatusAction = (obsId) => {
        getObsStatus(obsId).then(response=>{
            const res=response.data;
                if(!res.apiError){
                    const duration = (res.statusExpires-res.statusTimestamp) * 1000;
                    if(this.statusTimerId !== null)
                        clearTimeout(this.statusTimerId);
                    if(duration > 1000)
                        this.statusTimerId=setTimeout(()=>this.getObsStatusAction(obsId), duration);
                    this.setState({obsStatus: res, loading: false});                        
                }
                else
                    this.props.validateResponseAccess(res);
        });
    }

    getNewDahObsAction = (token, at, cid, obsId, DayNightBarWidgetId, MoonlightBarWidgetId, SeeingConditionsWidgetId ) => {
        getNewDahObs({token, at, cid, obsId,                 
            dayNightBarWidgetUniqueId: DayNightBarWidgetId,
            moonlightBarWidgetUniqueId: MoonlightBarWidgetId,
            seeingConditionsWidgetUniqueId: SeeingConditionsWidgetId }).then(response=>{
                const res=response.data;
                if(!res.apiError){
                    const duration = (res.expires-res.timestamp) * 1000;
                    if(this.newDashTimerId !== null)
                        clearTimeout(this.newDashTimerId);
                    if(duration > 1000)
                        this.newDashTimerId=setTimeout(()=>this.getNewDahObsAction(token, at, cid, obsId, DayNightBarWidgetId, MoonlightBarWidgetId, SeeingConditionsWidgetId), duration);
                    this.setState({obsWidgetData: res, loading: false});                       
                }
                else
                    this.props.validateResponseAccess(res);
        })
    }

    getWxDataAction = (token, at, cid, obsId) =>{
        getWeatherActions({token, at, cid, obsId }).then(response=>{
            const res=response.data;
            if(!res.apiError){                
                const duration = (res.expires-res.timestamp) * 1000;
                    if(this.wxTimerId !== null)
                        clearTimeout(this.wxTimerId);
                    if(duration > 1000)
                        this.wxTimerId=setTimeout(()=>this.getWxDataAction(token, at, cid, obsId), duration);
                this.setState({wxList: res.wxList, loading: false});                    
            }
            else
                this.props.validateResponseAccess(res);
        });
    }

    componentDidMount(){
        const { list } = this.props;         
        if(list){
            this.fetchAllApi(list[0]);                     
        }            
    }

    componentWillUnmount(){
        if(this.statusTimerId !== null)
            clearTimeout(this.statusTimerId);
        if(this.newDashTimerId !== null)
            clearTimeout(this.newDashTimerId);
        if(this.wxTimerId !== null)
            clearTimeout(this.wxTimerId);
    }

    onTabChange=(selectedHeader)=>{        
       this.fetchAllApi(selectedHeader);
    };     

    fetchAllApi = (list) =>{
        const { obsId, observatoryName, SeeingConditionsWidgetId, DayNightBarWidgetId, MoonlightBarWidgetId, } = list;        
        const { token, at, cid } = getUserInfo();    
        this.setState({loading: true});
        this.getWxDataAction(token, at, cid, obsId);
        // getWeatherActions({token, at, cid, obsId }).then(response=>{
        //     const res=response.data;
        //     if(!res.apiError){
        //         this.setState({wxList: res.wxList, loading: false});                    
        //     }
        // });
        this.getNewDahObsAction(token, at, cid, obsId, DayNightBarWidgetId, MoonlightBarWidgetId, SeeingConditionsWidgetId);
        // getNewDahObs({token, at, cid, obsId,                 
        //     dayNightBarWidgetUniqueId: DayNightBarWidgetId,
        //     moonlightBarWidgetUniqueId: MoonlightBarWidgetId,
        //     seeingConditionsWidgetUniqueId: SeeingConditionsWidgetId }).then(response=>{
        //         const res=response.data;
        //         if(!res.apiError){
        //             this.setState({obsWidgetData: res, loading: false});                       
        //         }
        //     })
        this.getObsStatusAction(obsId);       
        this.setState({selectedheader: observatoryName});
    }

    render() {
        const heading = "Observatories";        
        const { list } = this.props;        
        const { selectedheader, wxList, obsWidgetData, obsStatus, loading } = this.state;       
        
        return (
            <div className="observatory-main" >
                {/* <Spinner
                    loading={loading}
                    text="Please wait...loading"
                />                 */}
                {/* <h2 className="observatory-heading">{heading}</h2> */}
                <TitleHeaderNew                                    
                    heading = {heading}                    
                />
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
                        <Spinner
                            loading={loading}
                            text="Loading..."
                        /> 
                        <div className="observatory-row">
                            <div className="observatory-col-left">
                                <h5 className="observatory-col-txt">{obsStatus.clockList.obsCurrentTime.displayLabel}</h5>
                                <h5 className="observatory-col-value">{obsStatus.clockList.obsCurrentTime.displayTime} {obsStatus.clockList.obsCurrentTime.displayTimeZone}</h5>
                                <br/>
                                <h5 className="observatory-col-txt">Night Telescope Hours</h5>
                                <h5 className="observatory-col-value">{obsStatus.clockList.obsOpen.displayTime} - {obsStatus.clockList.obsClosed.displayTime} {obsStatus.clockList.obsClosed.displayTimeZone}</h5>
                                <br/>
                                <Button
                                    type={"button"}
                                    onClickEvent={()=>browserHistory.push(obsStatus.dashboardTeleLinkURL)} 
                                    text={obsStatus.dashboardTeleLinkLabel}
                                    style={"button-border"}
                                    icon={null}
                                />
                                {/* <Link to={obsStatus.dashboardTeleLinkURL }><h5 className="observatory-col-value">{obsStatus.dashboardTeleLinkLabel}</h5></Link> */}
                            </div>
                            <div className="observatory-col-right">
                            <h5 className="observatory-col-txt">{obsWidgetData.widgetsData.dayNightBar.dayNightRawData.sunriseLabel} - {obsWidgetData.widgetsData.dayNightBar.dayNightRawData.sunsetLabel}</h5>
                                <h5 className="observatory-col-value">{obsWidgetData.widgetsData.dayNightBar.dayNightRawData.sunriseTime} - {obsWidgetData.widgetsData.dayNightBar.dayNightRawData.sunsetTime} {obsWidgetData.widgetsData.dayNightBar.dayNightRawData.timeZone}</h5>
                                <br/>
                                <h5 className="observatory-col-txt">{obsWidgetData.widgetsData.moonlightBar.subwidgets[1].elementTitle} - {obsWidgetData.widgetsData.moonlightBar.subwidgets[2].elementTitle}</h5>
                                <h5 className="observatory-col-value">{obsWidgetData.widgetsData.moonlightBar.subwidgets[1].elementValue} - {obsWidgetData.widgetsData.moonlightBar.subwidgets[2].elementValue}</h5>
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