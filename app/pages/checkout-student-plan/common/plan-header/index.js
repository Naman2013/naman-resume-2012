import React, { PureComponent } from "react";
import "./styles.scss";



export function PlanHeader(props) {
    const {cardHeading ,heading, subHeading,description } = props;
    return (
        <div className="">
            {cardHeading && (
                <b className="card-heading">{cardHeading}</b>
            )}
            <h2 className="title-heading">{heading}</h2>
            {subHeading && (
                <b className="head-subHeading">{subHeading}</b>
            )}
            {description && (
                <b className="head-description">{description}</b>
            )}

        </div>
    )
}



export function PlanCard(props) {
    const { heading, subHeading, description } = props;
    return (
        <>
            {heading && (
                <h2 className="plan-title-heading">{heading}</h2>
            )}
            {subHeading && (
                <b className="plan-title-subHeading">{subHeading}</b>
            )}
            {description && (
                <p className="title-description">{description}</p>
            )}
        </>
    )
}


