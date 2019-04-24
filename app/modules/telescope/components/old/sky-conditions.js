import StaticCell from 'app/components/common/grid/StaticCell';
import { fetchSeeingConditionsWidget } from 'app/modules/Telescope-Overview';
import { hawkesBlue } from 'app/styles/variables/colors_tiles_v4';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ModuleContainer } from './index';
import style from './sky-conditions.style';

const cellTheme = {
  borderBottom: `1px solid ${hawkesBlue}`,
  minHeight: 'auto',
};

const mapStateToProps = ({ telescopeOverview }) => ({
  title: telescopeOverview.seeingConditionsWidgetResult.title,
  seeingConditionsIndex:
    telescopeOverview.seeingConditionsWidgetResult.seeingConditionsIndex,
  seeingConditionsDescription:
    telescopeOverview.seeingConditionsWidgetResult.seeingConditionsDescription,
});

const mapDispatchToProps = {
  fetchSeeingConditionsWidget,
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export class SkyConditions extends Component {
  componentDidMount = () => {
    const { fetchSeeingConditionsWidget, obsId, widgetID } = this.props;
    fetchSeeingConditionsWidget({
      obsId,
      widgetUniqueId: widgetID,
    });
  };

  render() {
    const {
      seeingConditionsIndex,
      seeingConditionsDescription,
      title,
    } = this.props;
    return (
      <ModuleContainer title="Sky conditions">
        <StaticCell theme={cellTheme} title={title}>
          <h3 className="level">Level {seeingConditionsIndex}</h3>
          <p className="content-description">{seeingConditionsDescription}</p>
        </StaticCell>

        <style jsx>{style}</style>
      </ModuleContainer>
    );
  }
}
