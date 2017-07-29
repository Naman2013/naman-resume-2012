import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import useAbsoluteURL from '../../utils/useAbsoluteURL';
import purgeHashURL from '../../utils/purgeHashURL';
import './slooh-features.scss';

function generateLink(URL = '', content = '') {
  if (useAbsoluteURL(URL)) {
    return (
      <a className="action" href={URL}>{content}</a>
    );
  }

  return (
    <Link className="action" to={purgeHashURL(URL)}>{content}</Link>
  );
}

const SloohFeatures = ({
  tierIconURL,
  tierTitle,
  tierDescription,
  tierButtonURL,
  tierButtonText,
}) => (
  <div className="col-md-4">
    <div className="slooh-features-container col-md-12">
      <img alt="Slooh account type tier" src={tierIconURL} width="50" />
      <h5 className="title" dangerouslySetInnerHTML={{ __html: tierTitle }} />
      <p className="content" dangerouslySetInnerHTML={{ __html: tierDescription }} />
      {generateLink(tierButtonURL, tierButtonText)}
    </div>
  </div>
);

SloohFeatures.propTypes = {
  tierIconURL: PropTypes.string.isRequired,
  tierTitle: PropTypes.string.isRequired,
  tierDescription: PropTypes.string.isRequired,
  tierButtonURL: PropTypes.string.isRequired,
  tierButtonText: PropTypes.string.isRequired,
};

export default SloohFeatures;
