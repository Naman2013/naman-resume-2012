/* ********************************
 * V4 MissionDetails
 ********************************* */

// @flow
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Btn from 'app/atoms/Btn';
import BackButton from 'app/atoms/BackButton';
import ShowMore from 'app/components/common/ShowMore';
import { DeviceContext } from 'app/providers/DeviceProvider';
import Pagination from 'app/components/common/pagination/v4-pagination/pagination';
import PhotoRollCard from 'app/modules/profile-photos/components/PhotoRoll/PhotoRollCard';

import noop from 'lodash/fp/noop';
import './mission-details.scss';

type TMissionDetails = {
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
      missionTitle,
      missionIconURL,
      missionDateCreated,
      imageCount,
      imageList,
    } = this.props;
    if (!imageList && imageList.length) return null;
    const { telescopeName, instrumentName } = imageList[0];
    const { activePage } = this.state;

    return (
      <DeviceContext.Consumer>
        {({ isMobile, isDesktop }) => (
          <section className="mission-details root-wrapper">
            <BackButton />
            <header className="header-wrapper shadow i-box-white">
              <Row>
                <Col md={12}>
                  <h1 className="h-1 h-1-low">
                    <img src={missionIconURL} alt={missionTitle} />{' '}
                    <span>{missionTitle}</span>
                  </h1>
                </Col>
              </Row>
              <hr className="hr" />
              <Row noGutters className="mission-details-box">
                <Col md={2}>
                  <h5 className="h-5 h-5-normal">{missionDateCreated}</h5>
                </Col>
                <Col md={3}>
                  <h5 className="h-5 h-5-normal mission-details-ceil">
                    {telescopeName ? (
                      <span>{telescopeName}</span>
                    ) : (
                      <span>Telescope name unknown</span>
                    )}{' '}
                    {instrumentName && <span>{instrumentName}</span>}
                  </h5>
                </Col>
                <Col md={3}>
                  <h5 className="h-5 h-5-normal mission-details-ceil">
                    {imageCount} photos
                  </h5>
                </Col>
                <Col md={4}>
                  <div className="btn-group justify-content-end">
                    <Btn onClick={noop} mod="circle">
                      <i className="fa fa-tag" />
                    </Btn>
                    <Btn onClick={noop} mod="circle">
                      <i className="icon icon-download nightfall" />
                    </Btn>
                  </div>
                </Col>
              </Row>
            </header>

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
