import React from 'react';
import PropTypes from 'prop-types';
import styles from './section-header.style';

const SectionHeader = (props) => {
  const {
    title,
    desc,
  } = props;
  return (
    <div className="root">
      <div className="title-container">
        <span className="title-text" dangerouslySetInnerHTML={{ __html: title }} />
      </div>
      <span className="desc-text" dangerouslySetInnerHTML={{ __html: desc }} />
      <style jsx>{styles}</style>
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
};

SectionHeader.defaultProps = {
  desc: '',
};

export default SectionHeader;
