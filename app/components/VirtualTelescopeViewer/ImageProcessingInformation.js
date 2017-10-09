import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  processing: PropTypes.string,
  schedulingMember: PropTypes.string,
};

const defaultProps = {
  processing: '',
  schedulingMember: '',
};

const ImageProcessingInformation = ({ processing, schedulingMember }) => (
  <div>
    <ul className="list">
      <li dangerouslySetInnerHTML={{ __html: processing }} />
      <li dangerouslySetInnerHTML={{ __html: schedulingMember }} />
    </ul>

    <style jsx>{`
      .list {
        list-style-type: none;
        text-align: right;
        margin: 0;
        padding: 0;
        font-size: 12px;
      }
    `}</style>
  </div>
);

ImageProcessingInformation.propTypes = propTypes;
ImageProcessingInformation.defaultProps = defaultProps;

export default ImageProcessingInformation;
