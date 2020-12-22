/***********************************
 * V4 Object Details : Observations
 *   Markdown support on elements????
 *   UTF-8 support....
 *   Multi-National Languages.....
 ***********************************/

import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import findIndex from 'lodash/findIndex';
import has from 'lodash/has';
import { Button } from 'react-bootstrap';
import { createStructuredSelector } from 'reselect';
import GenericButton from 'app/components/common/style/buttons/Button';
import { plus } from 'app/styles/variables/iconURLs';
import Request from 'app/components/common/network/Request';
import DropDown from 'app/components/common/DropDown';
import {
  fetchObjectDetailsAction,
  fetchLikeAction,
  fetchSharedMemberPhotosAction,
} from 'app/modules/object-details/actions';
import ObjectDetailsSectionTitle from 'app/components/object-details/ObjectDetailsSectionTitle';
import CenterColumn from 'app/components/common/CenterColumn';
import { ObservationCard } from 'app/modules/observations/components/observation-card';
import { IMAGE_DETAILS } from 'app/services/image-details';
import { ObjectObservationModal } from 'app/modules/object-details/components/object-observation-modal';
import Pagination from 'app/components/common/pagination/v4-pagination/pagination';
import isEmpty from 'lodash/isEmpty';
import { Spinner } from 'app/components/spinner/index';
import {
  makeObjectDetailsFetchingSelector,
  makeObjectDetailsDataSelector,
  makeObjectDataSelector,
  makeObjectSharedMemberPhotosSelector,
  makeObjectImageDetailsSelector,
} from '../../modules/object-details/selectors';
import { makeUserSelector } from '../../modules/user/selectors';

import styles from './ObjectDetailsObservations.style';

const mapStateToProps = createStructuredSelector({
  isFetching: makeObjectDetailsFetchingSelector(),
  objectData: makeObjectDataSelector(),
  imageDetails: makeObjectImageDetailsSelector(),
  sharedMemberPhotos: makeObjectSharedMemberPhotosSelector(),
  user: makeUserSelector(),
  objectDetails: makeObjectDetailsDataSelector(),
});

const mapDispatchToProps = {
  fetchObjectDetailsAction,
  fetchLikeAction,
  fetchSharedMemberPhotosAction,
};

const DEFAULT_PAGE = 1;

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@withTranslation()
class Observations extends Component {
  state = {
    selectedIndex: 1,
    page: DEFAULT_PAGE,
    writeObservationModalShow: false,
  };

  componentDidMount() {
    const { page } = this.state;
    this.getObservations(page);
  }

  get dropdownOptions() {
    return has(this.props.objectData, 'observationsV4Filters.options')
      ? this.props.objectData.observationsV4Filters.options
      : [];
  }

  get selectedFilter() {
    const currentFilterObj = has(
      this.props.objectData,
      'observationsV4Filters.options'
    )
      ? this.props.objectData.observationsV4Filters.options[
          this.state.selectedIndex
        ]
      : {};
    return currentFilterObj.value;
  }

  getObservations = page => {
    const {
      fetchSharedMemberPhotosAction,
      params: { objectId, groupId },
    } = this.props;

    const discussionGroupId = groupId;

    const requestBody = {
      objectId,
      discussionGroupId,
      pagingMode: 'content',
      count: 9,
      page,
      v4Filter: this.selectedFilter,
    };
    this.setState({ page });
    fetchSharedMemberPhotosAction(requestBody);
  };

  handleSelect = (e, selectedItem) => {
    this.setState(
      {
        selectedIndex: findIndex(
          this.dropdownOptions,
          filter => filter.value === selectedItem.value
        ),
      },
      () => this.getObservations(DEFAULT_PAGE)
    );
  };

  showWriteObservationModal = () => {
    this.setState({ writeObservationModalShow: true });
  };

  closeWriteObservationModal = () => {
    this.setState({ writeObservationModalShow: false });
  };

  handlePageChange = ({ activePage }) => {
    this.getObservations(activePage);
    //this.observationContainer.scrollIntoView();
  };

  render() {
    const {
      objectDetails,
      sharedMemberPhotos,
      t,
      fetchLikeAction,
      getMyPictures,
      user,
      isFetching,
      hideTitleSection,
      customClass,
      params: { groupId },
    } = this.props;
    const { writeObservationModalShow, page, selectedIndex } = this.state;
    const { pages, imageCount, imageList } = sharedMemberPhotos; 
    return (
      <Fragment>
        <Spinner loading={isFetching} />

        {!hideTitleSection && (
          <ObjectDetailsSectionTitle
            title={`${objectDetails.objectTitle}'s`}
            subTitle={t('Objects.Observations')}
            renderNav={() => (
              <div
                className="nav-actions"
                ref={node => {
                  this.observationContainer = node;
                }}
              >
                <GenericButton
                  disabled={!this.props.objectData.canShareObservations}
                  onClickEvent={this.showWriteObservationModal}
                  text="Add observation"
                  icon={plus}
                  theme={{ marginRight: '10px' }}
                />
                <DropDown
                  options={this.dropdownOptions}
                  selectedIndex={selectedIndex}
                  handleSelect={this.handleSelect}
                />
              </div>
            )}
          />
        )}

        {imageCount && !isFetching ? (
          <CenterColumn
            widths={['645px', '965px', '965px']}
            customClass={customClass}
          >
            <div className="root">
              {imageList.map(image => (
                <Request
                  method="POST"
                  authorizationRedirect
                  serviceURL={IMAGE_DETAILS}
                  serviceExpiresFieldName="expires"
                  requestBody={{
                    customerImageId: image.customerImageId,
                    useShareToken: 'n',
                    callSource: 'sharedPictures',
                    discussionGroupId: groupId,
                  }}
                  render={({ serviceResponse: imageDetails }) =>
                    !isEmpty(imageDetails) && (
                      <ObservationCard
                        observationData={imageDetails}
                        handleLike={fetchLikeAction}
                      />
                    )
                  }
                />
              ))}

              {pages > 1 ? (
                <div className="observations-pagination">
                  <Pagination
                    pagesPerPage={4}
                    activePage={page}
                    onPageChange={this.handlePageChange}
                    totalPageCount={pages}
                  />
                </div>
              ) : null}
            </div>
          </CenterColumn>
        ) : null}

        {!imageCount && !isFetching && (
          <p>
            {t('Objects.NoObservations', {
              objectTitle: objectDetails.objectTitle,
            })}
          </p>
        )}

        {writeObservationModalShow && (
          <ObjectObservationModal
            show
            onHide={this.closeWriteObservationModal}
          />
        )}

        <style jsx>{styles}</style>
      </Fragment>
    );
  }
}

Observations.propTypes = {};

export default Observations;
