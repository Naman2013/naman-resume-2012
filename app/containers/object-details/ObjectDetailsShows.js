/***********************************
* V4 Object Details : Shows
*   Markdown support on elements????
*   UTF-8 support....
*   Multi-National Languages.....
***********************************/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import noop from 'lodash/noop';
import has from 'lodash/has';
import Request from 'components/common/network/Request';

import DeviceProvider from 'providers/DeviceProvider';
import ObjectDetailsSectionTitle from 'components/object-details/ObjectDetailsSectionTitle';
import CenterColumn from 'components/common/CenterColumn';
import ShowTile from 'components/common/tiles/ShowTile';
import { OBJECT_SHOWS } from 'services/objects';

import {
  fetchObjectDetailsAction,
  fetchObjectDataAction,
} from 'modules/object-details/actions';

const {
  bool,
  number,
  string,
  shape,
  func,
  arrayOf,
} = PropTypes;

const mapStateToProps = ({ objectDetails, videoViewerBrowser, appConfig, user }) => ({
  objectDetails: objectDetails.objectDetails,
  objectData: objectDetails.objectData,
  ...videoViewerBrowser,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchObjectDetailsAction,
    fetchObjectDataAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Shows extends Component {

  static defaultProps = {
    actions: {
    },
    eventList: [],
    resultsCount: 0,
    page: 0,
    pages: 0,
    count: number,
  }

  constructor(props) {
    super(props);
    const { actions } = props;
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUpdate(nextProps) {

  }

  componentWillMount() {
    //console.log(this.props)
  }

  render() {
    const {
      params: {
        objectId,
      },
      slugLookupId,
      actions,
      eventList,
      resultsCount,
      page,
      pages,
      count,
      objectDetails,
    } = this.props;

    return (
      <Fragment>
        <DeviceProvider>
          <ObjectDetailsSectionTitle title={objectDetails.objectTitle + "'s"} subTitle="Related Shows" />
        </DeviceProvider>
        <CenterColumn widths={['645px', '965px', '965px']}>
          <Request
            authorizationRedirect
            serviceURL={OBJECT_SHOWS}
            method="POST"
            serviceExpiresFieldName="expires"
            requestBody={{
              objectId,
            }}
            render={({
              fetchingContent,
              serviceResponse,
            }) => (
              <div className="root">
                {serviceResponse.relatedShowsCount > 0 && has(serviceResponse, 'relatedShowsList') ? serviceResponse.relatedShowsList.map(show => (
                  <ShowTile
                    header="Upcoming Show"
                    title={show.eventTitle}
                    time={show.linkLabel}
                    author={show.eventHostName}
                    linkUrl={show.linkUrl}
                  />
                )) : <p>Sorry, there are no shows available for {objectDetails.objectTitle} at this time.</p>}
              </div>
            )}
          />

        </CenterColumn>
        <style jsx>{`
            .root {
              display: flex;
              flex-wrap: wrap;
            }
          `}</style>
      </Fragment>
    )
  }
}
export default Shows;
