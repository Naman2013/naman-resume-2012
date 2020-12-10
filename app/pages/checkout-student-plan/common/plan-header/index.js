import React, { PureComponent } from "react";
import "./styles.scss";



export function PlanHeader(props) {
    const { heading, subHeading,  } = props;
    return (
        <div className="">
            <h2 className="title-heading">{heading}</h2>
            {subHeading && (
                <h4 className="title-subHeading">{subHeading}</h4>
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
                <b className="">{subHeading}</b>
            )}
            {description && (
                <p className="title-description">{description}</p>
            )}
        </>
    )
}


