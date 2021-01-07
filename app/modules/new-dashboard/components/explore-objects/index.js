import { Component } from 'react';
import React from "react";
import './style.scss';
import { TabHeader } from '../tab-header';
import { QuestMap } from '../quest-map';
import { ObjectMap } from '../object-map-new';
import { TabHeaderWithNewLabel } from '../tab-header/header-with-new-label';

export class ExploreObject extends Component{

    state={
        activeHeading: "Quest Map"
    }

    onTabChange = (title) =>{
        const { getObjectMapControl, getQuestMapControl } = this.props;
        switch(title){
            case "Quest Map":
                getQuestMapControl();
                break;
            // case "Object Map":
            //     getObjectMapControl();
            //     break;
        }

        this.setState({activeHeading: title});
    }


    render() {
        const { questMapControls, objectMapControls, scrollToRef, refreshPhotoHub } = this.props;
        const { activeHeading } = this.state;

        return (
            <div className="title-main">
                 <TabHeaderWithNewLabel
                    headings={[{ label: "Quest Map", showNewLabel: false}, {label: "Object Map", showNewLabel: true}]}
                    activeHeading={activeHeading}
                    spaceequally={false}
                    theme={"dark"}
                    onTabChange={this.onTabChange}                    
                />

                {activeHeading === "Quest Map" && questMapControls && (
                    <QuestMap
                        questMapControls={questMapControls.mapControls}
                    /> 
                )}

                {/* {activeHeading === "Object Map" && objectMapControls && ( */}
                {activeHeading === "Object Map" && (
                    <ObjectMap
                        scrollToRef={scrollToRef}
                        refreshPhotoHub={refreshPhotoHub}
                        // objectMapControls={objectMapControls.mapControls}
                    /> 
                    // <h2 className="comming-soon">Coming Soon...</h2>
                )}
            </div>   
        );
    }

}