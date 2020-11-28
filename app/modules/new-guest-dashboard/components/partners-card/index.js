import React, { PureComponent } from "react";
import "./styles.scss";

export default class PartnerCard extends PureComponent{

    render(){
        const { card } = this.props;

        return(
            <div className="partner-card-main">
                <div className="partner-div">
                    <img className="partner-img" src={card.partnerImage}/>
                    <div className="partner-details">
                        <h4 className="partner-name">{card.partnerName}</h4>
                        <h5 className="partner-place">{card.partnerPlace}</h5>
                        <h6 className="partner-joined">{card.partnerJoined}</h6>
                    </div>
                </div>
                <h4 className="partner-card-title">{card.title}</h4>
                <h5 className="partner-card-desc">{card.desc}</h5> 
                <br/>
                <br/>    
                <h4 className="partner-type">{card.partnerType}</h4>           
            </div>
        )
    }
}