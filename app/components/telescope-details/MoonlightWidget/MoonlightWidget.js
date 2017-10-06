import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMoonlightWidget } from '../../../modules/Telescope-Overview';
import SectionHeader from '../../common/headers/SectionHeader';

import { lightTurqoise } from '../../../styles/variables/colors';

const mapStateToProps = ({ telescopeOverview }) => ({
  title: telescopeOverview.moonlightWidgetResult.title,
  subtitle: telescopeOverview.moonlightWidgetResult.subtitle,
  refreshInteral: telescopeOverview.moonlightWidgetResult.refreshInterval,
  subwidgets: telescopeOverview.moonlightWidgetResult.subwidgets,
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
  subwidgets: PropTypes.arrayOf(PropTypes.shape({
    elementTitle: PropTypes.string.isRequired,
    elementValue: PropTypes.string.isRequired,
    elementImageURL: PropTypes.string.isRequired,
    elementImageWidth: PropTypes.number.isRequired,
    elementImageHeight: PropTypes.number.isRequired,
  })),
};

const defaultProps = {
  subwidgets: [],
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
    const { title, subtitle, subwidgets } = this.props;

    return (
      <div className="root">
        <SectionHeader title={title} subtitle={subtitle} />
        <ul className="moon-widget-root">
          {
            subwidgets.map(widget => (
              <li key={uniqueId()} className="moon-widget-item">
                <img
                  alt={`${widget.elementTitle} ${widget.elementValue}`}
                  src={widget.elementImageURL}
                  width={widget.elementImageWidth}
                  height={widget.elementImageHeight}
                />
                <h4 className="title">{widget.elementTitle}</h4>
                <h5 className="subtitle">{widget.elementValue}</h5>
              </li>
            ))
          }
        </ul>

        <style jsx>{`
          .root {
            margin-bottom: 20px;
          }

          .moon-widget-root {
            margin: 0;
            padding: 20px 0;
            display: flex;
            color: ${lightTurqoise};
            list-style-type: none;
            background: rgba(0, 0, 0, 0.75);
            align-items: flex-end;
            justify-content: space-evenly;
          }

          .moon-widget-item {
            text-align: center;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </div>
    );
  }
}

MoonlightWidget.propTypes = propTypes;
MoonlightWidget.defaultProps = defaultProps;

export default MoonlightWidget;
