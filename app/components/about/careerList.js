import React, { Component, PropTypes } from 'react';

export const CareerList = ({value}) => {
    return (
        <article className="card-wide" >
            <header className="margin-bottom-reg">
                <h1 className="name">{value.jobTitle}</h1>
                <h2 className="title location">{value.location}</h2>
            </header>
            <p>{value.jobText}</p>
            <footer>
                <a href={`${value.applyLink}?subject=${value.jobTitle}`} className="btn-primary pull-left" >Apply</a>
            </footer>
        </article>
    )
};
