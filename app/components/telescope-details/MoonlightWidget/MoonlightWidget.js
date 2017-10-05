import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SectionHeader from '../../common/headers/SectionHeader';

const TITLE = 'Moonlight';
const SUBTITLE = 'Moonlight impacts image quality';

const propTypes = {
  widgetID: PropTypes.string.isRequired,
};

class MoonlightWidget extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <SectionHeader title={TITLE} subtitle={SUBTITLE} />
      </div>
    );
  }
}

MoonlightWidget.propTypes = propTypes;

export default MoonlightWidget;
