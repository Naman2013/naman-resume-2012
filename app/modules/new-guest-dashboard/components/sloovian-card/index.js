import React, { PureComponent } from "react";
import "./styles.scss";

export default class SloovianCard extends PureComponent{

    render(){
        const { card } = this.props;

        return(
            <div className="sloohvian-card-main">
                <img className="sloohvian-img" src={card.img}/>
                <h4 className="sloohvian-card-title">{card.title}</h4>
                <h5 className="sloohvian-card-desc">{card.desc}</h5>
            </div>
        )
    }
}