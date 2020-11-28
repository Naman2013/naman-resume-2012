import React, { PureComponent } from "react";
import "./styles.scss";

export default class TitleHeader extends PureComponent{

    render(){
        const { heading, subHeading } = this.props;

        return(
            <div className="title-main">
                <h2 className="title-heading">{heading}</h2>
                {subHeading && (
                    <h4 className="title-subHeading">{subHeading}</h4> 
                )}                
            </div>
        )
    }
}