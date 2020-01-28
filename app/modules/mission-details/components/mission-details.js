/* ********************************
 * V4 MissionDetails
 ********************************* */

// @flow
import React, { Component } from 'react';
import BackButton from 'app/atoms/BackButton';
import { DeviceContext } from 'app/providers/DeviceProvider';
import PaginateWithNetwork from 'app/components/common/paginate-with-network';
import ShowMoreWithNetwork from 'app/components/common/show-more-with-network';
import PhotoRollCard from 'app/modules/profile-photos/components/PhotoRoll/PhotoRollCard';
import MissionDetailsHeader from './mission-details-header';

import './mission-details.scss';
import cn from 'classnames';

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
    const { getMissionDetails, params } = this.props;
    getMissionDetails(params.missionId);
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
      params: { missionId: scheduledMissionId },
    } = this.props;
    const { activePage } = this.state;
    if (isFetching) return <div>Loading...</div>;
    return (
      <DeviceContext.Consumer>
        {({ isMobile, isTablet, isDesktop }) => (
          <section className="mission-details root-wrapper">
            <BackButton />
            <MissionDetailsHeader
              {...this.props}
              scheduledMissionId={scheduledMissionId}
              image={imageList[0]}
              isMobile={isMobile}
              missionTitle={missionTitle}
              missionIconURL={missionIconURL}
              missionDateCreated={missionDateCreated}
              imageCount={imageCount}
            />

            <section
              className={cn('body-wrapper', {
                'justify-content-between': isTablet || isMobile,
                'justify-content-normal': isDesktop,
              })}
            >
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
