import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import noop from 'lodash/noop';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import {
  SHOWS_UPCOMING_ENDPOINT_URL,
} from 'services/shows';
import SloohSlider from 'components/common/Slider';
import { getSliderProps } from './upcomingShowsConfig';
import style from './upcoming-shows.style';

const COUNT = 9;
const DEFAULT_PAGE = 1;

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
  }

  componentDidMount() {
    const {
      validateResponseAccess,
    } = this.props;

    axios.get(SHOWS_UPCOMING_ENDPOINT_URL).then((res) => {
      if (!res.data.apiError) {
        this.setState({
          upcomingShows: res.data.eventList,
        });
      }

      validateResponseAccess(res);
    });
  }


  render() {
    const {
    } = this.props;
    const {
      upcomingShows,
    } = this.state;
    const sliderProps = upcomingShows ? getSliderProps(upcomingShows) : {};
    return (<div>
      <SloohSlider {...sliderProps} />
      <style jsx>{style}</style>
    </div>)
  }
}




export default UpcomingShowsInHub;
