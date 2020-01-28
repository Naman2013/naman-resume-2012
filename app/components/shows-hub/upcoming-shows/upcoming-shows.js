import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { API } from 'app/api';
import noop from 'lodash/noop';
import { SHOWS_UPCOMING_ENDPOINT_URL } from 'app/services/shows';
import SloohSlider from 'app/components/common/Slider';
import { withTranslation } from 'react-i18next';
import { getSliderProps } from './upcomingShowsConfig';
import style from './upcoming-shows.style';

const COUNT = 9;
const DEFAULT_PAGE = 1;

@withTranslation()
class UpcomingShowsInHub extends Component {
  static propTypes = {
    validateResponseAccess: PropTypes.func,
    params: PropTypes.shape({
      filterType: PropTypes.string,
    }),
  };

  static defaultProps = {
    validateResponseAccess: noop,
  };

  state = {
    upcomingShows: [],
  };

  componentDidMount() {
    const { validateResponseAccess } = this.props;

    API.get(SHOWS_UPCOMING_ENDPOINT_URL).then(res => {
      if (!res.data.apiError) {
        this.setState({
          upcomingShows: res.data.eventList,
        });
      }

      validateResponseAccess(res);
    });
  }

  render() {
    const { upcomingShows } = this.state;
    const { t } = this.props;

    const sliderProps = upcomingShows ? getSliderProps(upcomingShows, t) : {};
    return upcomingShows.length ? (
      <div className="i-root">
        <SloohSlider {...sliderProps} />
        <style jsx>{style}</style>
      </div>
    ) : null;
  }
}

export default UpcomingShowsInHub;
