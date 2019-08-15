/* ********************************
 * V4 MissionDetails
 ********************************* */

// @flow
import React, { Component } from 'react';
import cn from 'classnames';
import BackButton from 'app/atoms/BackButton';
import { DeviceContext } from 'app/providers/DeviceProvider';
import PaginateWithNetwork from 'app/components/common/paginate-with-network';
import ShowMoreWithNetwork from 'app/components/common/show-more-with-network';
import PhotoRollCard from 'app/modules/profile-photos/components/PhotoRoll/PhotoRollCard';
import GalleryDetailsHeader from './gallery-details-header';

import './gallery-details.scss';

type TGalleryDetails = {
  isFetching: boolean,
  galleryTitle: string,
  galleryDateCreated: string,
  imageCount: number,
  imageList: Array<Object>,
  getGalleryDetails: Function,
  canEditFlag: number | boolean,
  apiURL: string,
};

class GalleryDetails extends Component<TGalleryDetails> {
  state = { activePage: 1 };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { getGalleryDetails, params } = this.props;
    getGalleryDetails(params.galleryId);
  };

  handlePageChange = ({ activePage }) => {
    this.fetchData();
    this.setState({ activePage });
  };

  render() {
    const {
      isFetching,
      galleryTitle,
      galleryDateCreated,
      imageCount,
      imageList,
      canEditFlag,
      apiURL,
      params,
    } = this.props;
    const { activePage } = this.state;
    if (isFetching) return <div>Loading...</div>;
    return (
      <DeviceContext.Consumer>
        {({ isMobile, isTablet, isDesktop }) => (
          <section className="gallery-details root-wrapper">
            <BackButton />
            <GalleryDetailsHeader
              image={imageList[0]}
              isMobile={isMobile}
              galleryTitle={galleryTitle}
              galleryDateCreated={galleryDateCreated}
              imageCount={imageCount}
              canEditFlag={canEditFlag}
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
                  galleryId={params.galleryId}
                  typeGallery
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

export default GalleryDetails;
