/* ********************************
 * V4 MissionDetails
 ********************************* */

// @flow
import React, { Component } from 'react';
import BackButton from 'app/atoms/BackButton';
import ShowMore from 'app/components/common/ShowMore';
import { DeviceContext } from 'app/providers/DeviceProvider';
import Pagination from 'app/components/common/pagination/v4-pagination/pagination';
import PhotoRollCard from 'app/modules/profile-photos/components/PhotoRoll/PhotoRollCard';
import MissionDetailsHeader from './mission-details-header';

import './mission-details.scss';

type TMissionDetails = {
  isFetching: boolean,
  missionTitle: string,
  missionIconURL: string,
  missionDateCreated: string,
  firstImageNumber: number,
  imageCount: number,
  maxImageCount: number,
  imageList: Array<Object>,
  getMissionDetails: Function,
};

class MissionDetails extends Component<TMissionDetails> {
  state = { activePage: 1 };

  componentDidMount() {
    const { getMissionDetails } = this.props;
    getMissionDetails();
  }

  // TODO: pagination logic
  handlePageChange = () => {};

  handleLoadMore = () => {};

  render() {
    const {
      isFetching,
      missionTitle,
      missionIconURL,
      missionDateCreated,
      imageCount,
      imageList,
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
                  currentItem={item}
                  isMobile={isMobile}
                  isDesktop={isDesktop}
                />
              ))}
            </section>

            <section className="pagination-wrapper">
              {imageCount && !isMobile
                ? imageCount > 9 && (
                    <Pagination
                      pagesPerPage={4}
                      activePage={activePage}
                      onPageChange={this.handlePageChange}
                      totalPageCount={Math.ceil(imageCount / 9)}
                    />
                  )
                : imageCount > 10 && (
                    <ShowMore
                      totalCount={imageList.length}
                      currentCount={imageCount}
                      handleShowMore={this.handleLoadMore}
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
