import React, { PureComponent } from "react";
import "./styles.scss";

export default class SubTitleHeader extends PureComponent{

    render(){
        const { heading, subHeading } = this.props;

        return(
            <div className="sub-title-main">
                <h2 className="sub-title-heading">{heading}</h2>
                {subHeading && (
                    <h4 className="sub-title-subHeading">{subHeading}</h4> 
                )}                
            </div>
        )
    }
}