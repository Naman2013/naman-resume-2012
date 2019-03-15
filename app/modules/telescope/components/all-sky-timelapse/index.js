import { Spinner } from 'app/components/spinner/index';
import React, { Component } from 'react';
import './styles.scss';

export class AllSkyTimelapse extends Component {
  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = () => {
    const { getAllSkyTimelapse, obsId, widgetUniqueId } = this.props;
    getAllSkyTimelapse(obsId, widgetUniqueId);
  };

  render() {
    const { allskyTimelapseURL, isFetching } = this.props;
    return (
      <div className="all-sky-timelapse">
        {isFetching && (
          <div className="spinner-wrapper">
            <Spinner loading={isFetching} />
          </div>
        )}
        {allskyTimelapseURL ? (
          <video controls src={allskyTimelapseURL} />
        ) : null}
      </div>
    );
  }
}
