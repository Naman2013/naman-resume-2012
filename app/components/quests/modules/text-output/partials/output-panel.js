import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Request from 'app/components/common/network/Request';
import SectionHeader from 'app/components/common/form-sections/section-header';

const { arrayOf, bool, number, shape, string } = PropTypes;

const OutputPanel = ({
  panelId,
  content, // HTML
  activityPrompt,
}) => (
  <Fragment>
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </Fragment>
);

OutputPanel.propTypes = {
  panelId: number.isRequired,
  content: string.isRequired, // HTML
  activityPrompt: string.isRequired,
};

OutputPanel.defaultProps = {};

export default OutputPanel;
