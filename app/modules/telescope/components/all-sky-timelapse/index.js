import React, { Component } from 'react';

export class AllSkyTimelapse extends Component {
  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = () => {
    const { getAllSkyTimelapse, obsId, widgetUniqueId } = this.props;
    getAllSkyTimelapse(obsId, widgetUniqueId);
  };

  render() {
    const { allskyTimelapseURL } = this.props;

    return (
      <div className="all-sky-timelapse">
        {allskyTimelapseURL ? (
          <video controls src={allskyTimelapseURL} />
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}
