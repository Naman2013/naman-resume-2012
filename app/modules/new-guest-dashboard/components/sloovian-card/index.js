import React, { PureComponent } from "react";
import "./styles.scss";

export default class SloovianCard extends PureComponent {

    render() {
        const { card } = this.props;

        return (
            <div className="sloohvian-card-main">
                <img className="sloohvian-img" src={card.imageUrl} />
                {<h4 className="sloohvian-card-title" dangerouslySetInnerHTML={{ __html: card.SubTitleText }}></h4>}
                {<h5 className="sloohvian-card-desc" dangerouslySetInnerHTML={{ __html: card.Content }}></h5>}
            </div>
        )
    }
}


