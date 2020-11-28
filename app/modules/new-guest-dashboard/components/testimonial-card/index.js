import React, { PureComponent } from "react";
import "./styles.scss";

export default class TestimonialCard extends PureComponent{

    render(){
        const { card } = this.props;

        return(
            <div className="testimonial-card-main">                
                <h4 className="testimonial-card-title">{card.title}</h4>
                <h5 className="testimonial-card-desc">{card.desc}</h5>
                <div className="testimonial-member-div">
                    <img className="testimonial-member-img" src={card.memberImage}/>
                    <div className="testimonial-member-details">
                        <h4 className="testimonial-member-name">{card.memberName}</h4>
                        <h5 className="testimonial-member-place">{card.memberPlace}</h5>
                        <h6 className="testimonial-member-joined">{card.memberJoined}</h6>
                    </div>
                </div>
                <div className="testimonial-level-div">
                    <img className="testimonial-member-level-img" src={card.memberLevelImg} />
                    <div className="testimonial-level-details">
                        <h6 className="testimonial-level-label">{card.memberLevelLabel}</h6>
                        <h5 className="testimonial-level">{card.memberLevel}</h5>
                    </div>
                </div>
                <h6 className="testimonial-achievement-label">Achived Badges</h6>
                <div className="testimonial-badges-list">
                    {card.badgeList.slice(0,11).map((badge)=>(
                        <img className="testinomial-badge-icon" src={"https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/testimonial-badge-icon.svg"}/>
                    ))}
                    {card.badgeList.length > 11 ? (
                        <div className="testimonial-add-badges-div">
                            <h6 className="testimonial-add-badges-text">+{card.badgeList.length-11}</h6>
                        </div>
                    ):null}
                </div>
            </div>
        )
    }
}