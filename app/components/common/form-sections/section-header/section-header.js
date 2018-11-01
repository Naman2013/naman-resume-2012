import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Button from 'components/common/style/buttons/Button';
import styles from './section-header.style';

const SectionHeader = (props) => {
  const {
    title,
    desc,
  } = props
  return (
    <div className="root">
      <div className="title-container">
        <span className="title-text" dangerouslySetInnerHTML={{ __html: title }} />
      </div>
      <span className="desc-text" dangerouslySetInnerHTML={{ __html: desc }} />
      <style jsx>{styles}</style>
    </div>
  )
}
SectionHeader.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
}



export default SectionHeader;
