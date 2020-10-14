import { Component } from 'react';
import React from "react";
import './style.scss';
import { TabHeader } from "../tab-header";
import { Link } from 'react-router';
import { Spinner } from '../../common/spinner';

export class ObjectList extends Component{

    state={}

    constructor(props){
        super(props);
        if(props.showTab){
            const tabHeaders=props.tabOptions.map(item => item.label);
            this.state={tabHeaders: tabHeaders, activeHeading: tabHeaders[0]};
        }
        
    }

    onTabChange = (title) =>{
        const { tabOptions, getTopCommunityObjects } = this.props;
        const { tabHeaders } = this.state;
        const index = tabHeaders.indexOf(title);
        getTopCommunityObjects({viewType: tabOptions[index].viewType})
        this.setState({activeHeading: tabHeaders[index]});
    }
    
    render() {
        const {heading, showTab, headerspaceequally, objectList, loading } = this.props;
        // const objectList = [{objectPoints: "44 GP", text: "Jupiter", icon: "https://vega.slooh.com/assets/v4/dashboard-new/jupiter.svg"},
        //                     {objectPoints: "41 GP", text: "Saturn", icon: "https://vega.slooh.com/assets/v4/dashboard-new/saturn.svg"},
        //                     {objectPoints: "28 GP", text: "Moon", icon: "https://vega.slooh.com/assets/v4/dashboard-new/moon.svg"},
        //                     {objectPoints: "24 GP", text: "Pluto", icon: "https://vega.slooh.com/assets/v4/dashboard-new/pluto.svg"}];
        const { tabHeaders, activeHeading} = this.state;

        return (
            <div className="object-main">
                <h2 className="object-heading">
                    {heading}
                    <Spinner
                        loading={loading}
                        text="Loading..."
                        style="right-align"
                    /> 
                </h2>     
                    {showTab &&(
                        <TabHeader
                        headings={tabHeaders}
                        activeHeading={activeHeading}
                        spaceequally={headerspaceequally}
                        theme={"light"}
                        onTabChange={this.onTabChange}
                        />
                    )}
                    <div className="object-list">
                        {objectList.map(object=>(
                            <Link
                                to={object.linkUrl}
                            >
                                <div className="object-item">
                                    <div className="objecticonContainer">
                                        <img className="object-icon" src={object.iconUrl}/>
                                    </div>
                                    <h2 className="object-name">{object.title}</h2>
                                    <h4 className="object-gp">{object.gravityPoints}</h4>
                                </div> 
                            </Link>
                        ))}                            
                    </div>
                                                               
            </div>   
        );
    }

}