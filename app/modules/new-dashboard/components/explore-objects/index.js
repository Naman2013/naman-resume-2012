import { Component } from 'react';
import React from "react";
import './style.scss';
import { TabHeader } from '../tab-header';
import { QuestMap } from '../quest-map';
import { ObjectMap } from '../object-map-new';

export class ExploreObject extends Component{

    state={
        activeHeading: "Explore Quests"
    }

    onTabChange = (title) =>{
        const { getObjectMapControl, getQuestMapControl } = this.props;
        switch(title){
            case "Explore Quests":
                getQuestMapControl();
                break;
            case "Explore Objects":
                getObjectMapControl();
                break;
        }

        this.setState({activeHeading: title});
    }


    render() {
        const { questMapControls, objectMapControls } = this.props;
        const { activeHeading } = this.state;

        return (
            <div className="title-main">
                 <TabHeader
                    headings={["Explore Quests"]}
                    activeHeading={activeHeading}
                    spaceequally={false}
                    theme={"dark"}
                    onTabChange={this.onTabChange}
                />

                {activeHeading === "Explore Quests" && questMapControls && (
                    <QuestMap
                        questMapControls={questMapControls.mapControls}
                    /> 
                )}

                {activeHeading === "Explore Objects" && objectMapControls && (
                    <ObjectMap
                        objectMapControls={objectMapControls.mapControls}
                    /> 
                )}
            </div>   
        );
    }

}