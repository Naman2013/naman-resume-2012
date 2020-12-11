import React, { PureComponent } from "react";
import SloovianCard from "../sloovian-card";
import "./styles.scss";

export default class SloovianList extends PureComponent{

    render(){
        const { cardList } = this.props;
        return(
            <div className="sloovian-list-main">
                {cardList && cardList.map(card=>(
                    <SloovianCard
                        card={card}
                    />
                ))}
            </div>
        )
    }
}