import React, { PureComponent } from "react";
import "./styles.scss";
import SloovianList from "./components/sloovian-list";
import TitleHeader from "./components/title-header";
import { Button } from "../new-dashboard/components/button";
import SubTitleHeader from "./components/sub-title-header";
import TestimonialList from "./components/testimonial-list";
import PartnerList from "./components/partner-list";
import { Spinner } from 'app/components/spinner/index';
import { browserHistory } from 'react-router';

export class NewGuestDashboard extends PureComponent{

    constructor(props){
        super(props);
        props.fetchLandingPageAction();
    }

    render(){
        const { landingPageDetails } = this.props;
        return(
            <div className="new-guest-dash">
                {landingPageDetails && !landingPageDetails.isFetching ? (
                    <div>
                        <TitleHeader
                            heading={landingPageDetails.SloohMetaverseUniverse.Title}
                            subHeading={null}
                        />
                        <SloovianList
                            // cardList={[
                            //     {img: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/map-hemisphere.svg", title: "Control powerful robotic telescopes in both hemispheres", desc: "Featuring telescopes at the Institute of Astrophysics of the Canary Islands, the world’s best observatory"},
                            //     {img: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/slooh-explore-space.svg", title: "Learn to explore space like an experienced astronomer", desc: "Space is a wilderness. Slooh maps it out with curated paths and guides to show you the way"},
                            //     {img: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/three-astronaut-icon-blue.svg", title: "Lead + follow with community-driven exploration", desc: "Members are inspired to collaborate, share their expertise and mentor new explorers"},
                            // ]}
                            cardList={landingPageDetails.SloohMetaverseUniverse.List}
                        />
                        <Button
                            type={"button"}
                            onClickEvent={()=>browserHistory.push(landingPageDetails.Button.link)} 
                            text={landingPageDetails.Button.Text}
                            style={"free-trial-btn"}
                            icon={null}
                        />
                        <br/>
                        <br/>
                        <SubTitleHeader
                            heading={landingPageDetails.SloohExplorationDashboard.Title}
                            subHeading={landingPageDetails.SloohExplorationDashboard.SubTitle}
                        />
                        <center>
                            <img className="dashboard-screen" src={landingPageDetails.SloohExplorationDashboard.imageUrl}/>
                        </center>
                        <br/>
                        <br/>
                        <TitleHeader
                            heading={landingPageDetails.Partners.Title}
                            subHeading={landingPageDetails.Partners.SubTitle}
                        />
                        <PartnerList 
                            list={landingPageDetails.Partners.List}
                        />                
                        <br/>
                        <br/>
                        <TitleHeader
                            heading={landingPageDetails.Testimonial.Title}
                            subHeading={landingPageDetails.Testimonial.SubTitle}
                        />
                        <TestimonialList  
                            list={landingPageDetails.Testimonial.List}
                        />
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                ):(

                    <div>
                        {landingPageDetails && (
                            <Spinner loading={landingPageDetails.isFetching} />
                        )}                        
                    </div>
                )}
                
            </div>
        )
    }
}