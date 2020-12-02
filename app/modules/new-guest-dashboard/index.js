import React, { PureComponent } from "react";
import "./styles.scss";
import SloovianList from "./components/sloovian-list";
import TitleHeader from "./components/title-header";
import { Button } from "../new-dashboard/components/button";
import SubTitleHeader from "./components/sub-title-header";
import TestimonialList from "./components/testimonial-list";
import PartnerList from "./components/partner-list";

export class NewGuestDashboard extends PureComponent{

    constructor(props){
        super(props);
        props.fetchLandingPageAction();
    }

    render(){
        const { landingPageDetails } = this.props;
        return(
            <div className="new-guest-dash">
                <TitleHeader
                    heading={"Slooh’s Metaverse of the Universe"}
                    subHeading={null}
                />
                <SloovianList
                    cardList={[
                        {img: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/map-hemisphere.svg", title: "Control powerful robotic telescopes in both hemispheres", desc: "Featuring telescopes at the Institute of Astrophysics of the Canary Islands, the world’s best observatory"},
                        {img: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/slooh-explore-space.svg", title: "Learn to explore space like an experienced astronomer", desc: "Space is a wilderness. Slooh maps it out with curated paths and guides to show you the way"},
                        {img: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/three-astronaut-icon-blue.svg", title: "Lead + follow with community-driven exploration", desc: "Members are inspired to collaborate, share their expertise and mentor new explorers"},
                    ]}
                />
                <Button
                    type={"button"}
                    onClickEvent={null} 
                    text={"Start 7-Day Free Trial"}
                    style={"free-trial-btn"}
                    icon={null}
                />
                <br/>
                <br/>
                <SubTitleHeader
                    heading={"Preview Slooh’s Exploration Dashboard"}
                    subHeading={"Scroll down to see how members track their exploration activities and highlights from the global community"}
                />
                <center>
                    <img className="dashboard-screen" src="https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/new-dashboard-screen.svg"/>
                </center>
                <br/>
                <br/>
                <TitleHeader
                    heading={"School & Planetarium Partners"}
                    subHeading={"Learn how students are benefitting from Slooh"}
                />
                <PartnerList />                
                <br/>
                <br/>
                <TitleHeader
                    heading={"Testimonials"}
                    subHeading={"What Sloohvians say About Us"}
                />
                <TestimonialList  />
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}