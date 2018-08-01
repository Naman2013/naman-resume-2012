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
import DeviceProvider from '../../../app/providers/DeviceProvider';
import ObjectDetailsSectionTitle from '../../components/object-details/ObjectDetailsSectionTitle';
import CenterColumn from '../../../app/components/common/CenterColumn';
import ShowTile from 'components/common/tiles/ShowTile';

import noop from 'lodash/noop';
import {
  fetchObjectDetailsAction,
  fetchObjectDataAction,
} from '../../modules/object-details/actions';
import { fetchPreviousShows } from '../../modules/browse-video-viewer/previous-shows-actions';

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
    fetchPreviousShows,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Shows extends Component {
  
  static defaultProps = {
    actions: {
      fetchPreviousShows: noop,
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

    actions.fetchPreviousShows({
      page: 1,
    });
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

    console.log (this.props);

    return (
      <Fragment>
        <DeviceProvider>
          <ObjectDetailsSectionTitle title={objectDetails.objectTitle + "'s"} subTitle="Related Shows" />
        </DeviceProvider>
        <CenterColumn>
          <ShowTile
            header="Upcoming Show"
            title="Countdown to the Slooh Messier Marathon"
            time="30 mins"
            author="Helen Avery"
            linkUrl="#"
          />
        </CenterColumn>
      </Fragment>
    )
  }
}
export default Shows;

