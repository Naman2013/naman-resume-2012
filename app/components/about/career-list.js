import React, { PropTypes } from 'react';

export default function CareerList({ value }) {
  return (
    <article className="card-wide padding-med" >
      <header className="margin-bottom-reg">
        <h1 className="name">{value.jobTitle}</h1>
        <h2 className="title location icon-small icon-location">{value.location}</h2>
      </header>
      <p>{value.jobText}</p>
      <footer>
        <a href={`${value.applyLink}?subject=${value.jobTitle}`} className="btn-primary pull-left" >Apply</a>
      </footer>
    </article>
  );
}

CareerList.defaultProps = {
  value: {
    jobTitle: '',
    location: '',
    jobText: '',
    applyLink: '',
  },
};

CareerList.propTypes = {
  value: PropTypes.shape({
    jobTitle: PropTypes.string,
    location: PropTypes.string,
    jobText: PropTypes.string,
    applyLink: PropTypes.string,
  }),
};
