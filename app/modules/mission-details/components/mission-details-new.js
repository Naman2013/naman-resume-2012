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
import Pagination from 'app/components/common/pagination';
// import Pagination from 'app/modules/new-dashboard/common/v4-pagination';

type TMissionDetails = {
  isFetching: boolean,
  missionTitle: string,
  missionIconURL: string,
  missionDateCreated: string,
  imageCount: number,
  imageList: Array<Object>,
  getMissionDetails: Function,
  apiURL: string,
  totalCount: number,
};

class MissionDetailsNew extends Component<TMissionDetails> {
  state = { activePage: 1 };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { getMissionDetails, params } = this.props;
    const { activePage } = this.state;
    getMissionDetails({ scheduledMissionId: params.missionId,
    maxImageCount: 9,
    firstImageNumber: activePage,
    sharedOnly: false, });
  };

  handlePageChange = ({ activePage }) => {
    this.fetchData();
    this.setState({ activePage });
  };

  closeModal = () => {
    this.setState(() => ({
      showPrompt: false,
    }));
  };

  showModal = () => {
    this.setState(() => ({
      showPrompt: true,
    }));
  };

  

  render() {
    const {
      isFetching,
      missionTitle,
      missionIconURL,
      missionDateCreated,
      totalCount,
      imageCount,
      imageList,
      apiURL,
      params: { missionId: scheduledMissionId, fitsIsAvailable, showFitDataPopup },
      newDash
    } = this.props;
    const { activePage } = this.state;
    if (isFetching) return <div>Loading...</div>;
    
    return (
      <DeviceContext.Consumer>
        {({ isMobile, isTablet, isDesktop }) => (
          <section className="mission-details root-wrapper">
            {!newDash ? (
              <BackButton />
            ):
            <br />}     
            {/* <BackButton />        */}
            <MissionDetailsHeader
              {...this.props}
              scheduledMissionId={scheduledMissionId}
              image={imageList[0]}
              isMobile={isMobile}
              missionTitle={missionTitle}
              missionIconURL={missionIconURL}
              missionDateCreated={missionDateCreated}
              imageCount={totalCount}
              fitsIsAvailable={fitsIsAvailable}
              showFitDataPopup={showFitDataPopup}              
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
              {/* {totalCount && !isMobile
                ? totalCount > 9 && (
                    <PaginateWithNetwork
                      apiURL={apiURL}
                      activePageNumber={activePage}
                      onPaginationChange={this.handlePageChange}
                      imgperpage={9}
                      totalPageCount={Math.ceil(totalCount / 9)}
                    />
                  )
                : totalCount > 10 && (
                    <ShowMoreWithNetwork
                      apiURL={apiURL}
                      activePageNumber={activePage}
                      onPaginationChange={this.handlePageChange}
                    />
                  )} */}

                      <Pagination
                        pagesPerPage={9}
                        activePage={activePage}
                        onPageChange={this.handlePageChange}
                        totalPageCount={Math.ceil(totalCount / 9)}
                    />
            </section>
          </section>
        )}       
      </DeviceContext.Consumer>
    );
  }
}

export default MissionDetailsNew;
