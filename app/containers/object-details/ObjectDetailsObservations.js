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
import Request from 'components/common/network/Request';
import DropDown from 'components/common/DropDown';
import { fetchObjectDetailsAction } from '../../modules/object-details/actions';
import DeviceProvider from '../../../app/providers/DeviceProvider';
import ObjectDetailsSectionTitle from '../../components/object-details/ObjectDetailsSectionTitle';
import CenterColumn from '../../../app/components/common/CenterColumn';
import CardObservations from '../../../app/components/common/CardObservations';
import { SHARED_MEMBER_PHOTOS } from 'services/shared-photos';

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
  constructor(props) {
    super(props);
  }

  state = {
    selectedIndex: 0,
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

  render() {
    const descriptionContent = 'Nam dapibus nisl vitae elit fringilla rutrum. Aenean lene lorem sollicitudin, erat a elementum toirutrum neeque sem pretium metuis, quis mollis nisl nunc it tristique de ullam ecorpere pretium…';
    const tempProps = {
      title: 'The Moon!',
      author: 'JESSICA ANDERSON',
      descContent: descriptionContent,
      imageSrcUrl: 'https://vega.slooh.com/assets/v4/placeholder/moon_sample.jpg',
      likesCount: '1000',
      commentsCount: '007',
      detailsLinkUrl: 'https://www.slooh.com/',
      capturedDate: 'Jan 22, 2018',
    };

    const {
      params: {
        objectId,
      },
      objectDetails,
    } = this.props;
    const { selectedIndex } = this.state;

    return (
      <Fragment>
        <DeviceProvider>
          <ObjectDetailsSectionTitle
            title={objectDetails.objectTitle + "'s"}
            subTitle="Observations"
            renderNav={() => (<div className="nav-actions">
              <DropDown
                options={this.dropdownOptions}
                selectedIndex={selectedIndex}
                handleSelect={this.handleSelect}
              />
            </div>)}
          />
          <CenterColumn widths={['645px', '965px', '965px']}>
            <Request
              authorizationRedirect
              serviceURL={SHARED_MEMBER_PHOTOS}
              method="POST"
              serviceExpiresFieldName="expires"
              requestBody={{
                objectId,
                v4Filter: this.selectedFilter,
              }}
              render={({
                fetchingContent,
                serviceResponse,
              }) => (
                <div className="root">
                  {serviceResponse.imageCount > 0 && has(serviceResponse, 'imageList') ? serviceResponse.imageList.map(image => (
                    <CardObservations
                      title={''}
                      subTitle={''}
                      description={''}
                      imageUrl={''}
                      hasLink={''}
                      linkLabel={''}
                      linkUrl={''}
                    />
                  )) : <p>Sorry, there are no images available for {objectDetails.objectTitle} at this time.</p>}
                </div>
              )}
            />
          </CenterColumn>
        </DeviceProvider>
        <style jsx>{styles}</style>
      </Fragment>
    )
  }
}
export default Observations;
