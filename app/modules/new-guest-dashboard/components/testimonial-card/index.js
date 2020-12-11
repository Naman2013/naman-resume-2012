import React, { PureComponent } from "react";
import "./styles.scss";

export default class TestimonialCard extends PureComponent{

    render(){
        const { card } = this.props;
        return(
            <div className="testimonial-card-main">                
                <h4 className="testimonial-card-title">{card.SubTitleText}</h4>
                <h5 className="testimonial-card-desc">{card.Content}</h5>
                <div className="testimonial-member-div">
                    <img className="testimonial-member-img" src={card.imageTextData.imageUrl}/>
                    <div className="testimonial-member-details">
                        <h4 className="testimonial-member-name">{card.imageTextData.userName}</h4>
                        <h5 className="testimonial-member-place">{card.imageTextData.location}</h5>
                        <h6 className="testimonial-member-joined">{card.imageTextData.memberSince}</h6>
                    </div>
                </div>
                <div className="testimonial-level-div">
                    <img className="testimonial-member-level-img" src={card.imageTextData1.imageUrl} />
                    <div className="testimonial-level-details">
                        <h6 className="testimonial-level-label">{card.imageTextData1.imageLevel}</h6>
                        <h5 className="testimonial-level">{card.imageTextData1.imageTitle}</h5>
                    </div>
                </div>
                <h6 className="testimonial-achievement-label">{card.imageTextData2.AchivedBadges}</h6>
                <div className="testimonial-badges-list">
                    {card.imageTextData2.imageUrliconList.slice(0,11).map((badge)=>(
                        <img className="testinomial-badge-icon" src={badge.icon}/>
                    ))}
                    {card.totalImageCount && (
                        <div className="testimonial-add-badges-div">
                            <h6 className="testimonial-add-badges-text">+{card.totalImageCount.totalImage}</h6>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}