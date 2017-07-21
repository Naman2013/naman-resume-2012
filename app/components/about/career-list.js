import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

export default function CareerList({ value }) {
  return (
    <article className="card-wide padding-med" >
      <header className="margin-bottom-reg">
        <h1 className="name">{value.jobTitle}</h1>
        <h2 className="title location icon-small icon-location">{value.location}</h2>
      </header>
      <p className="notransform" dangerouslySetInnerHTML={{ __html: value.jobText }} />
      <footer>
        <Link to="/about/contact" className="btn-primary pull-left" >Apply</Link>
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
