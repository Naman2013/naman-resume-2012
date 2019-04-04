/* ********************************
 * V4 MissionDetails
 ********************************* */

// @flow
import React, { Component } from 'react';
import BackButton from 'app/atoms/BackButton';
import { DeviceContext } from 'app/providers/DeviceProvider';
import { browserHistory } from 'react-router';
import pick from 'lodash/pick';
import queryString from 'query-string';
import PaginateWithNetwork from 'app/components/common/paginate-with-network';
import ShowMoreWithNetwork from 'app/components/common/show-more-with-network';
import PhotoRollCard from 'app/modules/profile-photos/components/PhotoRoll/PhotoRollCard';
import MissionDetailsHeader from './mission-details-header';

import './mission-details.scss';

const QUERY_TYPES = ['sort', 'page'];

type TMissionDetails = {
  isFetching: boolean,
  missionTitle: string,
  missionIconURL: string,
  missionDateCreated: string,
  imageCount: number,
  imageList: Array<Object>,
  getMissionDetails: Function,
  apiURL: string,
};

class MissionDetails extends Component<TMissionDetails> {
  state = { activePage: 1 };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { getMissionDetails } = this.props;
    getMissionDetails();
  };

  handlePageChange = ({ activePage }) => {
    this.fetchData();
    this.setState({ activePage });
  };

  render() {
    const {
      isFetching,
      missionTitle,
      missionIconURL,
      missionDateCreated,
      imageCount,
      imageList,
      apiURL,
    } = this.props;
    const { activePage } = this.state;
    if (isFetching) return <div>Loading...</div>;
    return (
      <DeviceContext.Consumer>
        {({ isMobile, isDesktop }) => (
          <section className="mission-details root-wrapper">
            <BackButton />
            <MissionDetailsHeader
              image={imageList[0]}
              isMobile={isMobile}
              missionTitle={missionTitle}
              missionIconURL={missionIconURL}
              missionDateCreated={missionDateCreated}
              imageCount={imageCount}
            />

            <section className="body-wrapper">
              {imageList.map((item, i) => (
                <PhotoRollCard
                  key={i}
                  index={i}
                  isShareToken
                  currentItem={item}
                  isMobile={isMobile}
                  isDesktop={isDesktop}
                />
              ))}
            </section>

            <section className="pagination-wrapper">
              {imageCount && !isMobile
                ? imageCount > 9 && (
                    <PaginateWithNetwork
                      apiURL={apiURL}
                      activePageNumber={activePage}
                      onPaginationChange={this.handlePageChange}
                      totalPageCount={Math.ceil(imageCount / 9)}
                    />
                  )
                : imageCount > 10 && (
                    <ShowMoreWithNetwork
                      apiURL={apiURL}
                      activePageNumber={activePage}
                      onPaginationChange={this.handlePageChange}
                    />
                  )}
            </section>
          </section>
        )}
      </DeviceContext.Consumer>
    );
  }
}

export default MissionDetails;
