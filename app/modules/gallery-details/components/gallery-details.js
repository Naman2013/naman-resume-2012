/* ********************************
 * V4 MissionDetails
 ********************************* */

// @flow
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import cn from 'classnames';
import { Button } from 'react-bootstrap';
import BackButton from 'app/atoms/BackButton';
import { DeviceContext } from 'app/providers/DeviceProvider';
import PaginateWithNetwork from 'app/components/common/paginate-with-network';
import ShowMoreWithNetwork from 'app/components/common/show-more-with-network';
import PhotoRollCard from 'app/modules/profile-photos/components/PhotoRoll/PhotoRollCard';
import { Modal } from 'app/components/modal';
import GalleryDetailsHeader from './gallery-details-header';

import './gallery-details.scss';

type TGalleryDetails = {
  isFetching: boolean,
  galleryTitle: string,
  galleryDateCreated: string,
  imageCount: number,
  imageList: Array<Record<string, any>>,
  getGalleryDetails: Function,
  renameGallery: Function,
  canEditFlag: number | boolean,
  apiURL: string,
};

class GalleryDetails extends Component<TGalleryDetails> {
  state = {
    activePage: 1,
    isConfirmModalVisible: false,
  };

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

  deleteGallery = () => {
    const { params, deleteGallery } = this.props;
    const { galleryId } = params;

    deleteGallery({ galleryId }).then(() =>
      browserHistory.push('/profile/private/photos/galleries')
    );
  };

  render() {
    const {
      isFetching,
      galleryTitle,
      galleryDateCreated,
      imageCount,
      imageList = [{}],
      canEditFlag,
      apiURL,
      params,
      renameGallery,
      newDash
    } = this.props;
    const { activePage, isConfirmModalVisible } = this.state;
    if (isFetching) {
      return <div>Loading...</div>;
    }
    return (
      <DeviceContext.Consumer>
        {({ isMobile, isTablet, isDesktop }) => (
          <section className="gallery-details root-wrapper">
            {!newDash ? (
              <BackButton />
            ):
            <br />}  
            {/* <BackButton /> */}
            <GalleryDetailsHeader
              image={imageList}
              isMobile={isMobile}
              galleryTitle={galleryTitle}
              galleryDateCreated={galleryDateCreated}
              imageCount={imageCount}
              canEditFlag={canEditFlag}
              galleryId={params.galleryId}
              deleteGallery={() =>
                this.setState({ isConfirmModalVisible: true })
              }
              renameGallery={renameGallery}
            />

            <Modal
              show={isConfirmModalVisible}
              onHide={() => this.setState({ isConfirmModalVisible: false })}
              customClass="delete-gallery-confirmation-modal"
            >
              <h1 className="modal-h">
                Are you sure you want to delete your gallery
                <br />
                This cannot be undone.
              </h1>

              <Button
                onClick={() => this.setState({ isConfirmModalVisible: false })}
                className="modal-btn"
              >
                No
              </Button>
              <Button onClick={this.deleteGallery} className="modal-btn">
                Yes
              </Button>
            </Modal>

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
