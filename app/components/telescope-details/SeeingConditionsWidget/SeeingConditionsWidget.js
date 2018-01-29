import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSeeingConditionsWidget } from '../../../modules/Telescope-Overview';
import SectionHeader from '../../common/headers/SectionHeader';

import { lightTurqoise } from '../../../styles/variables/colors';

const mapStateToProps = ({ telescopeOverview }) => ({
  title: telescopeOverview.seeingConditionsWidgetResult.title,
  subtitle: telescopeOverview.seeingConditionsWidgetResult.subtitle,
  refreshIntervalSec: telescopeOverview.seeingConditionsWidgetResult.refreshIntervalSec,
  seeingConditionsIndex: telescopeOverview.seeingConditionsWidgetResult.seeingConditionsIndex,
  seeingConditionsDescription: telescopeOverview.seeingConditionsWidgetResult.seeingConditionsDescription,
  seeingConditionsColor: telescopeOverview.seeingConditionsWidgetResult.seeingConditionsColor,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchSeeingConditionsWidget,
  }, dispatch),
});

const propTypes = {
  widgetID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  refreshIntervalSec: PropTypes.number.isRequired,
  seeingConditionsIndex: PropTypes.string.isRequired,
  seeingConditionsDescription: PropTypes.string.isRequired,
  seeingConditionsColor: PropTypes.string.isRequired,
};

const defaultProps = {

};

@connect(mapStateToProps, mapDispatchToProps)
class SeeingConditionsWidget extends Component {
  constructor(props) {
    super(props);

    const { widgetID, obsId } = this.props;
    this.props.actions.fetchSeeingConditionsWidget({
      obsId,
      widgetUniqueId: widgetID,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.obsId !== this.props.obsId) {
      this.props.actions.fetchSeeingConditionsWidget({
        obsId: nextProps.obsId,
        widgetUniqueId: nextProps.widgetID,
      });
    }
  }

  render() {
    const {
      title,
      subtitle,
      refreshIntervalSec,
      seeingConditionsIndex,
      seeingConditionsDescription,
      seeingConditionsColor
    } = this.props;

    const inlineDescStyle = {
      backgroundColor: seeingConditionsColor,
    }

    return (
      <div className="root">
        <SectionHeader title={title} subtitle={subtitle} />
        <span style={inlineDescStyle} className="seeing-conditions-root">
          {seeingConditionsIndex}. {seeingConditionsDescription}
        </span>

        <style jsx>{`
          .root {
            margin-top: 20px;
            margin-bottom: 20px;
          }

          .seeing-conditions-root {
            margin: 0;
            padding: 20px 0;
            display: block;
            background: rgba(0, 0, 0, 0.75);
            text-align: center;
            min-width: 100%;
          }
        `}</style>
      </div>
    );
  }
}

SeeingConditionsWidget.propTypes = propTypes;
SeeingConditionsWidget.defaultProps = defaultProps;

export default SeeingConditionsWidget;
