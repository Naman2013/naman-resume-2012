/***********************************
* V4
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import IntroText from 'components/common/form-sections/intro-text';
import SectionHeader from 'components/common/form-sections/section-header';
import QAMulti from './partials/output-panel';

import styles from './qa-multi.style';

const {
  arrayOf,
  bool,
  number,
  shape,
  string,
} = PropTypes;

class TextOutput extends Component {
  static propTypes = {
    panel: shape({
      panelId: number.isRequired,
      content: string.isRequired, // HTML
      isActivity: bool,
      activityTitle: string,
      activityInstructions: string,
      activityPrompt: string,
    }),
  }

  static defaultProps = {
    panel: {},

  };

  state = {
  };



  render() {
    const {
      panel,
    } = this.props;
    return (<div className="root">
      <SectionHeader title={panel.activityTitle} />
      <IntroText desc={panel.activityInstructions} />
      <QAMulti {...panel} />
      <style jsx>{styles}</style>
    </div>);
  }
}

export default TextOutput;
