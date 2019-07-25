import React, { Component } from 'react';
import Triangle from 'atoms/icons/Triangle';
import { astronaut } from 'app/styles/variables/colors_tiles_v4';
import { ModuleContainer } from './module-container';
import style from './weekly-forecast.style';

export class WeeklyForecast extends Component {
  state = {
    slicedForecastList: [],
    currentIndex: 0,
    startSpliceIndex: 0,
    showPrevButton: false,
    showNextButton: false,
  };

  componentDidMount() {
    this.refreshData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.refreshData(nextProps);
  }

  refreshData(props) {
    const { startSpliceIndex, currentIndex } = this.state;
    const { forecastList } = props;
    this.sliceForecastList(forecastList, startSpliceIndex);
    this.updateNavButtonsState(forecastList, currentIndex);
  }

  updateNavButtonsState(forecastList, currentIndex) {
    if (forecastList) {
      this.setState({
        showPrevButton: currentIndex !== 0,
        showNextButton: currentIndex + 1 !== forecastList.length,
      });
    }
  }

  sliceForecastList(forecastList, startIndex) {
    this.setState({
      slicedForecastList: forecastList.slice(startIndex, startIndex + 3),
      startSpliceIndex: startIndex,
    });
  }

  handleNextItemClick = () => {
    const { currentIndex, startSpliceIndex } = this.state;
    const { forecastList } = this.props;
    if (currentIndex === startSpliceIndex + 2) {
      this.sliceForecastList(forecastList, startSpliceIndex + 3);
    }
    this.setState({
      currentIndex: currentIndex + 1,
    });
    this.updateNavButtonsState(forecastList, currentIndex + 1);
  };

  handlePrevItemClick = () => {
    const { currentIndex, startSpliceIndex } = this.state;
    const { forecastList } = this.props;
    if (currentIndex === startSpliceIndex) {
      this.sliceForecastList(forecastList, startSpliceIndex - 3);
    }
    this.setState({
      currentIndex: currentIndex - 1,
    });
    this.updateNavButtonsState(forecastList, currentIndex - 1);
  };

  render() {
    const {
      slicedForecastList,
      startSpliceIndex,
      currentIndex,
      showPrevButton,
      showNextButton,
    } = this.state;
    const { forecastList, hideHeader } = this.props;

    return forecastList?.length > 0 ? (
      <ModuleContainer title="Weekly forecast" hideHeader={hideHeader}>
        <div className="carousel-container">
          <ul className="week-carousel">
            {slicedForecastList.map((elem, index) => (
              <li key={index} className="day-forecast">
                <h5 className="forecast-name">{elem.DisplayTitle}</h5>
                <div className="forecast-coin">
                  <img alt="" width="24" src={elem.ForecastIconURL} />
                </div>
                {startSpliceIndex + index === currentIndex && (
                  <Triangle theme={{ color: astronaut }} />
                )}
              </li>
            ))}
          </ul>

          <div className="actions-list">
            {showPrevButton && (
              <button
                onClick={this.handlePrevItemClick}
                type="button"
                className="forecast-action forecast-action-prev"
              >
                &#60;
              </button>
            )}
            {showNextButton && (
              <button
                onClick={this.handleNextItemClick}
                type="button"
                className="forecast-action forecast-action-next"
              >
                &#62;
              </button>
            )}
          </div>
        </div>

        <div className="active-weather-condition-summary">
          <h4 className="title">{forecastList[currentIndex].DisplayTitle}</h4>
          <ul className="weather-stats">
            <li className="weather-stat">
              {forecastList[currentIndex].TemperatureTitle}
              {forecastList[currentIndex].TemperatureValue}
            </li>
            <li className="weather-stat">
              {forecastList[currentIndex].WindTitle}
              {forecastList[currentIndex].WindValue}
            </li>
            <li className="weather-stat">
              {forecastList[currentIndex].HumidTitle}
              {forecastList[currentIndex].HumidValue}
            </li>
            <li className="weather-stat">
              {forecastList[currentIndex].PrecipTitle}
              {forecastList[currentIndex].PrecipChanc}
            </li>
          </ul>
        </div>

        <div className="condition-summary">
          <h4 className="title">
            {forecastList[currentIndex].SeeingCondsTitle}
          </h4>
          <h5 className="secondary-title">Level 3</h5>
          <p className="condition-summary-content">
            {forecastList[currentIndex].SeeingCond}
          </p>
        </div>
        <style jsx>{style}</style>
      </ModuleContainer>
    ) : null;
  }
}
