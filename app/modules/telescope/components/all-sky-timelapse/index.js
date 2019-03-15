import React, { Component } from 'react';

export class AllSkyTimelapse extends Component {
  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = () => {
    const { getAllSkyTimelapse } = this.props;
    getAllSkyTimelapse();
  };

  render() {
    const { allskyTimelapseURL } = this.props;
    console.log(allskyTimelapseURL);
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
