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
import Request from 'components/common/network/Request';
import DropDown from 'components/common/DropDown';
import { fetchObjectDetailsAction } from '../../modules/object-details/actions';
import DeviceProvider from '../../../app/providers/DeviceProvider';
import ObjectDetailsSectionTitle from '../../components/object-details/ObjectDetailsSectionTitle';
import CenterColumn from '../../../app/components/common/CenterColumn';
import PaginateWithNetwork from 'components/common/paginate-with-network';
import CardObservations from '../../../app/components/common/CardObservations';
import { SHARED_MEMBER_PHOTOS } from 'services/shared-photos';
import { IMAGE_DETAILS } from 'services/image-details';

import messages from './ObjectDetails.messages';
import styles from './ObjectDetailsObservations.style';                                                                                                                    

const mapStateToProps = ({ objectDetails, appConfig, user }) => ({
  objectData: objectDetails.objectData,
  objectDetails: objectDetails.objectDetails,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchObjectDetailsAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)

class Observations extends Component {
  state = {
    selectedIndex: 0,
    page: 1,
  };

  get dropdownOptions() {

    return has(this.props.objectData, 'observationsV4Filters.options') ? this.props.objectData.observationsV4Filters.options : [];
  }

  get selectedFilter() {
    const currentFilterObj = has(this.props.objectData, 'observationsV4Filters.options') ? this.props.objectData.observationsV4Filters.options[this.state.selectedIndex] : {};
    return currentFilterObj.value;
  }

  handleSelect = (e, selectedItem) => {
    this.setState(() => ({
      selectedIndex: findIndex(this.dropdownOptions, filter => filter.value === selectedItem.value),
    }));
  }

  handlePaginationResponse = (resp) => {
  }

  handlePaginationChange = ({ activePage }) => {
    this.setState((state) => {
      // TODO: preserve page in query params
      // const query = Object.assign({}, state, { page: activePage });
      // this.setQueryParams(pick(query, QUERY_TYPES));
      return ({
        page: activePage,
      });
    });
  }

  render() {
    const {
      params: {
        objectId,
      },
      objectDetails,
      intl,
    } = this.props;
    const { selectedIndex, page } = this.state;

    return (
      <Fragment>
        <DeviceProvider>
          <ObjectDetailsSectionTitle
            title={objectDetails.objectTitle + "'s"}
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
            <Request
              authorizationRedirect
              serviceURL={SHARED_MEMBER_PHOTOS}
              method="POST"
              serviceExpiresFieldName="expires"
              requestBody={{
                objectId,
                pagingMode: 'content',
                count: 9,
                page,
                v4Filter: this.selectedFilter,
              }}
              render={({
                fetchingContent,
                serviceResponse,
              }) => (
                <div className="root">
                  {serviceResponse.imageCount > 0 && has(serviceResponse, 'imageList') ? serviceResponse.imageList.map(image => (
                    <Request
                      authorizationRedirect
                      serviceURL={IMAGE_DETAILS}
                      method="POST"
                      serviceExpiresFieldName="expires"
                      requestBody={{
                        customerImageId: image.customerImageId,
                        useShareToken: 'n',
                        callSource: 'sharedPictures',
                      }}
                      render={({
                        fetchingContent,
                        serviceResponse: imageDetails,
                      }) => {
                        const photoBy = imageDetails.linkableFileData ? `${imageDetails.linkableFileData['Photo by'].label} ${imageDetails.linkableFileData['Photo by'].text}` : 'Photo by'
                        return (
                          <CardObservations
                            title={imageDetails.imageTitle}
                            subTitle={photoBy}
                            description={imageDetails.observationLog}
                            imageUrl={imageDetails.imageURL}
                            hasLink={''}
                            linkLabel={''}
                            linkUrl={imageDetails.linkUrl}
                          />
                        );
                      }}
                    />
                  )) : (
                    <p>
                      <FormattedMessage
                        {...messages.NoObservations}
                        values={{ objectTitle: objectDetails.objectTitle }}
                      />
                    </p>
                  )}
                  {serviceResponse.imageCount > 0 ? (
                    <PaginateWithNetwork
                      apiURL={SHARED_MEMBER_PHOTOS}
                      activePageNumber={Number(page)}
                      onServiceResponse={this.handlePaginationResponse}
                      onPaginationChange={this.handlePaginationChange}
                      filterOptions={{
                        objectId,
                        pagingMode: 'content',
                        count: 9,
                        page,
                        v4Filter: this.selectedFilter,
                      }}
                    />
                  ) : null}
                </div>
              )}
            />
          </CenterColumn>
        </DeviceProvider>
        <style jsx>{styles}</style>
      </Fragment>
    );
  }
}

Observations.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Observations);
