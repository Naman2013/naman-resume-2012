import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import noop from 'lodash/noop';
import uniqueId from 'lodash/uniqueId';
import BigShowExcerptTile from 'app/components/common/tiles/big-show-excerpt-tile';
import BigShowTile from 'app/components/common/tiles/BigShowTile';
import style from './upcoming-shows.style';

class UpcomingShowsSliderItem extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    showInfo: false,
  };
  setActive = () => {
    if (!this.state.showInfo) {
      this.setState(() => ({
        showInfo: true,
      }));
    }
  };

  removeActive = () => {
    this.setState(() => ({
      showInfo: false,
    }));
  };

  render() {
    const {
      eventLabel,
      displayDate,
      displayTime,
      eventHostName,
      linkUrl,
      eventTitle,
    } = this.props;
    const { showInfo } = this.state;
    return (
      <div
        className="upcoming-container"
        onMouseOver={this.setActive}
        onMouseLeave={this.removeActive}
      >
        {!showInfo ? (
          <BigShowTile
            header={eventLabel}
            displayDate={displayDate}
            displayTime={displayTime}
            eventHostName={eventHostName}
            key={uniqueId()}
            linkUrl={linkUrl}
            title={eventTitle}
          />
        ) : (
          <BigShowExcerptTile {...this.props} />
        )}
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default UpcomingShowsSliderItem;
