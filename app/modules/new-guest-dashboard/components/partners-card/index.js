import React, { PureComponent } from "react";
import "./styles.scss";

export default class PartnerCard extends PureComponent{

    render(){
        const { card } = this.props;

        return(
            <div className="partner-card-main">
                <div className="partner-div">
                    <img className="partner-img" src={card.imageUrl}/>
                    <div className="partner-details">
                        <h4 className="partner-name">{card.imageTextData.imageTitle}</h4>
                        <h5 className="partner-place">{card.imageTextData.imageSubTitle}</h5>
                        <h6 className="partner-joined">{card.imageTextData.imageContent}</h6>
                    </div>
                </div>
                <h4 className="partner-card-title">{card.SubTitleText}</h4>
                <h5 className="partner-card-desc">{card.Content}</h5> 
                <br/>
                <br/>    
                <h4 className="partner-type">{card.partnerType}</h4>           
            </div>
        )
    }
}