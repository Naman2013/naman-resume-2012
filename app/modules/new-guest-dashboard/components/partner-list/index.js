import { Button } from "app/modules/new-dashboard/components/button";
import React, { PureComponent } from "react";
import PartnerCard from "../partners-card";
import "./styles.scss";

export default class PartnerList extends PureComponent{

    render(){
        // const { cardList } = this.props;
        const cardList=[
            {title: "“Slooh and I will never depart”", desc: "It's like the sky; it will never leave your side. When it's a Slooh night, it's a good night. The moments spent with Slooh never get old.", partnerImage: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/partner-icon.svg", partnerName: "Professor Vanessa Holden", partnerPlace: "University of New Hampshire", partnerJoined: "Member Since: 2019", partnerType: "University" },
            {title: "“Slooh and I will never depart”", desc: "It's like the sky; it will never leave your side. When it's a Slooh night, it's a good night. The moments spent with Slooh never get old.", partnerImage: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/partner-icon.svg", partnerName: "Kristin Watson, Principal", partnerPlace: "West Shore Middle School", partnerJoined: "Member Since: 2019", partnerType: "Middle School" },
            {title: "“Slooh and I will never depart”", desc: "It's like the sky; it will never leave your side. When it's a Slooh night, it's a good night. The moments spent with Slooh never get old.", partnerImage: "https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/partner-icon.svg", partnerName: "Devon Lane, Director", partnerPlace: "Jordan Planetarium", partnerJoined: "Member Since: 2019", partnerType: "Planetarium" }
        ];
        return(
            <div>
                <div className="partner-list-main">
                    {cardList && cardList.map(card=>(
                        <PartnerCard
                            card={card}
                        />
                    ))}
                </div>
                {/* <div className="partner-nav-div">
                <Button
                    disabled={true}
                    type={"button"}
                    onClickEvent={null} 
                    text={""}
                    style={"partner-left-button"}
                    icon={"https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/testimonial-left-arrow.svg"}
                />
                <Button
                    type={"button"}
                    onClickEvent={null} 
                    text={""}
                    style={"partner-right-button"}
                    icon={"https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/testimonial-right-arrow.svg"}
                />
                </div> */}
            </div>
        )
    }
}