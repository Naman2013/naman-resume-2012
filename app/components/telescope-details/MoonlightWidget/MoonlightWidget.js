import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMoonlightWidget } from '../../../modules/Telescope-Overview';
import SectionHeader from '../../common/headers/SectionHeader';

const mapStateToProps = ({ telescopeOverview }) => ({
  title: telescopeOverview.moonlightWidgetResult.title,
  subtitle: telescopeOverview.moonlightWidgetResult.subtitle,
  refreshInteral: telescopeOverview.moonlightWidgetResult.refreshInterval,
  subWidgets: telescopeOverview.moonlightWidgetResult.subWidgets,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchMoonlightWidget,
  }, dispatch),
});

const propTypes = {
  widgetID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  refreshInteral: PropTypes.number.isRequired,
};

@connect(mapStateToProps, mapDispatchToProps)
class MoonlightWidget extends Component {
  constructor(props) {
    super(props);

    const { widgetID, obsId } = this.props;
    this.props.actions.fetchMoonlightWidget({
      obsId,
      widgetUniqueId: widgetID,
    });
  }

  render() {
    const { title, subtitle } = this.props;

    return (
      <div>
        <SectionHeader title={title} subtitle={subtitle} />
      </div>
    );
  }
}

MoonlightWidget.propTypes = propTypes;

export default MoonlightWidget;
