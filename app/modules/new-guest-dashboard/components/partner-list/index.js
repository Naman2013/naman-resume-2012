import { Button } from "app/modules/new-dashboard/components/button";
import React, { PureComponent } from "react";
import PartnerCard from "../partners-card";
import "./styles.scss";
import { PartnerSlider } from "../partner-slider";

export default class PartnerList extends PureComponent{

    render(){
        const { list } = this.props;
        
        return(
            <div>
                <PartnerSlider
                    cardList={list}
                />
                {/* <div className="partner-list-main">
                    {cardList && cardList.map(card=>(
                        <PartnerCard
                            card={card}
                        />
                    ))}
                </div> */}
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