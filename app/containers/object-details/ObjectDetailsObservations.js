/***********************************
 * V4 Object Details : Observations
 *   Markdown support on elements????
 *   UTF-8 support....
 *   Multi-National Languages.....
 ***********************************/

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import findIndex from 'lodash/findIndex';
import has from 'lodash/has';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Request from 'app/components/common/network/Request';
import DropDown from 'app/components/common/DropDown';
import {
  fetchObjectDetailsAction,
  fetchLikeAction,
  fetchSharedMemberPhotosAction,
} from 'app/modules/object-details/actions';
import ObjectDetailsSectionTitle from 'app/components/object-details/ObjectDetailsSectionTitle';
import CenterColumn from 'app/components/common/CenterColumn';
import CardObservations from 'app/components/common/CardObservations';
import { IMAGE_DETAILS } from 'app/services/image-details';

import messages from './ObjectDetails.messages';
import styles from './ObjectDetailsObservations.style';

const mapStateToProps = ({ objectDetails, appConfig, user }) => ({
  objectData: objectDetails.objectData,
  objectDetails: objectDetails.objectDetails,
  imageDetails: objectDetails.imageDetails,
  sharedMemberPhotos: objectDetails.sharedMemberPhotos,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchObjectDetailsAction,
      fetchLikeAction,
      fetchSharedMemberPhotosAction,
    },
    dispatch
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Observations extends Component {
  state = {
    selectedIndex: 0,
    page: 1,
  };

  componentDidMount() {
    const {
      actions: { fetchSharedMemberPhotosAction },
      params: { objectId },
    } = this.props;
    const { page } = this.state;
    const requestBody = {
      objectId,
      pagingMode: 'content',
      count: 9,
      page,
      v4Filter: this.selectedFilter,
    };
    fetchSharedMemberPhotosAction(requestBody);
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

  handleSelect = (e, selectedItem) => {
    this.setState(() => ({
      selectedIndex: findIndex(
        this.dropdownOptions,
        filter => filter.value === selectedItem.value
      ),
    }));
  };

  render() {
    const {
      objectDetails,
      sharedMemberPhotos,
      intl,
      actions: { fetchLikeAction },
      user,
    } = this.props;

    if (!sharedMemberPhotos.imageCount) {
      return (
        <p>
          <FormattedMessage
            {...messages.NoObservations}
            values={{ objectTitle: objectDetails.objectTitle }}
          />
        </p>
      );
    }

    const { selectedIndex } = this.state;

    return (
      <Fragment>
        <ObjectDetailsSectionTitle
          title={`${objectDetails.objectTitle}'s`}
          subTitle={intl.formatMessage(messages.Observations)}
          renderNav={() => (
            <div className="nav-actions">
              <DropDown
                options={this.dropdownOptions}
                selectedIndex={selectedIndex}
                handleSelect={this.handleSelect}
              />
            </div>
          )}
        />
        <CenterColumn widths={['645px', '965px', '965px']}>
          <div className="root">
            {sharedMemberPhotos.imageList.map(image => (
              <Request
                method="POST"
                authorizationRedirect
                serviceURL={IMAGE_DETAILS}
                serviceExpiresFieldName="expires"
                requestBody={{
                  customerImageId: image.customerImageId,
                  useShareToken: 'n',
                  callSource: 'sharedPictures',
                }}
                render={({ serviceResponse: imageDetails }) => {
                  const photoBy = imageDetails.linkableFileData
                    ? `${imageDetails.linkableFileData['Photo by'].label} ${
                        imageDetails.linkableFileData['Photo by'].text
                      }`
                    : 'Photo by';
                  return (
                    <CardObservations
                      user={user}
                      subTitle={photoBy}
                      title={imageDetails.imageTitle}
                      description={imageDetails.observationLog}
                      imageUrl={imageDetails.imageURL}
                      linkUrl={imageDetails.linkUrl}
                      likesCount={imageDetails.likesCount}
                      likePrompt={imageDetails.likePrompt}
                      showLikePrompt={imageDetails.showLikePrompt}
                      customerImageId={image.customerImageId}
                      handleLike={fetchLikeAction}
                      observationTimeDisplay={
                        imageDetails.observationTimeDisplay
                      }
                    />
                  );
                }}
              />
            ))}
          </div>
        </CenterColumn>
        <style jsx>{styles}</style>
      </Fragment>
    );
  }
}

Observations.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Observations);
