import React from 'react';
import PropTypes from 'prop-types';
import styles from './intro-text.style';

const SectionHeader = props => {
  const { title, desc } = props;
  return (
    <div className="root">
      <span
        className="title-text"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <span className="desc-text" dangerouslySetInnerHTML={{ __html: desc }} />
      <style jsx>{styles}</style>
    </div>
  );
};
SectionHeader.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
};

SectionHeader.defaultProps = {
  title: '',
  desc: '',
};

export default SectionHeader;
