/***********************************
 * V4 Object Details : Shows
 *   Markdown support on elements????
 *   UTF-8 support....
 *   Multi-National Languages.....
 ***********************************/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import has from 'lodash/has';
import Request from 'app/components/common/network/Request';

import DeviceProvider from 'app/providers/DeviceProvider';
import ObjectDetailsSectionTitle from 'app/components/object-details/ObjectDetailsSectionTitle';
import CenterColumn from 'app/components/common/CenterColumn';
import ShowTile from 'app/components/common/tiles/ShowTile';
import { OBJECT_SHOWS } from 'app/services/objects';

import {
  fetchObjectDetailsAction,
  fetchObjectDataAction,
} from 'app/modules/object-details/actions';
import messages from './ObjectDetails.messages';

const { number } = PropTypes;

const mapStateToProps = ({
  objectDetails,
  videoViewerBrowser,
  appConfig,
  user,
}) => ({
  objectDetails: objectDetails.objectDetails,
  objectData: objectDetails.objectData,
  ...videoViewerBrowser,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchObjectDetailsAction,
      fetchObjectDataAction,
    },
    dispatch
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@withTranslation
class Shows extends Component {
  static defaultProps = {
    actions: {},
    eventList: [],
    resultsCount: 0,
    page: 0,
    pages: 0,
    count: number,
  };

  render() {
    const {
      params: { objectId },
      slugLookupId,
      actions,
      eventList,
      resultsCount,
      page,
      pages,
      count,
      objectDetails,
      t,
    } = this.props;

    return (
      <Fragment>
        <DeviceProvider>
          <ObjectDetailsSectionTitle
            title={objectDetails.objectTitle + "'s"}
            subTitle={t('.RelatedShows')}
          />
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
            render={({ fetchingContent, serviceResponse }) => (
              <div className="root">
                {serviceResponse.relatedShowsCount > 0 &&
                has(serviceResponse, 'relatedShowsList') ? (
                  serviceResponse.relatedShowsList.map(show => (
                    <ShowTile
                      header={show.eventLabel}
                      title={show.eventTitle}
                      time={show.linkLabel}
                      author={show.eventHostName}
                      linkUrl={show.linkUrl}
                    />
                  ))
                ) : (
                  <p>
                    {t('.NoShows', { objectTitle: objectDetails.objectTitle })}
                  </p>
                )}
              </div>
            )}
          />
        </CenterColumn>
        <style jsx>
          {`
            .root {
              display: flex;
              flex-wrap: wrap;
            }
          `}
        </style>
      </Fragment>
    );
  }
}

Shows.propTypes = {
  intl: intlShape.isRequired,
};

export default Shows;
