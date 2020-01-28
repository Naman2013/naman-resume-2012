import React, { Component } from 'react';
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
      <div className="upcoming-container">
        {!showInfo ? (
          <BigShowTile
            header={eventLabel}
            displayDate={displayDate}
            displayTime={displayTime}
            eventHostName={eventHostName}
            linkUrl={linkUrl}
            title={eventTitle}
            onMouseEnter={this.setActive}
          />
        ) : (
          <BigShowExcerptTile
            {...this.props}
            onMouseLeave={this.removeActive}
          />
        )}
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default UpcomingShowsSliderItem;
