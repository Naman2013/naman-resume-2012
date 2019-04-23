import { fetchWeatherConditions } from 'app/modules/Telescope-Overview';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ModuleContainer, SimpleList } from './index';

const mapStateToProps = ({
  telescopeOverview: { weatherConditionsWidgetResult },
}) => ({
  weatherConditionsWidgetResult,
});

const mapDispatchToProps = {
  fetchWeatherConditions,
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export class WeatherConditions extends PureComponent {
  componentDidMount() {
    const { obsId, fetchWeatherConditions } = this.props;
    fetchWeatherConditions({ obsId });
  }

  parseData = (l = {}) => {
    const result = [];
    if (l.dewpointShow) {
      result.push({
        title: l.dewpointPrompt,
        field: `${l.dewpoint}${l.dewpointUnits}`,
      });
    }
    if (l.humidityShow) {
      result.push({
        title: l.humidityPrompt,
        field: `${l.humidity}${l.humidityUnits}`,
      });
    }
    if (l.temperatureShow) {
      result.push({
        title: l.temperaturePrompt,
        field: `${l.temperature}${l.temperatureUnits}`,
      });
    }
    if (l.windgustShow) {
      result.push({
        title: l.windgustPrompt,
        field: `${l.windgust}${l.windgustUnits}`,
      });
    }
    if (l.windspeedShow) {
      result.push({
        title: l.windspeedPrompt,
        field: `${l.windspeed}${l.windspeedUnits}`,
      });
    }
    return result;
  };

  render() {
    const { weatherConditionsWidgetResult = {} } = this.props;
    const { wxList } = weatherConditionsWidgetResult;
    const data = wxList ? this.parseData(wxList) : [];
    return (
      <ModuleContainer title="Weather conditions">
        <SimpleList data={data} />
      </ModuleContainer>
    );
  }
}
