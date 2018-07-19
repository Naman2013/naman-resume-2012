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
        <div className="contain">        
          <h4>Shows about {objectDetails.objectTitle}</h4>
          {/*
          {objectQuests && objectQuests.questsCount > 0 ? (
            <div className="card-container__quests">
              {Object.keys(objectQuests.questsList).map(function(key) {
                return(
                  <div className="quest-card" key={'card_' + key}>
                    {objectQuests.questsList[key].label}
                    <h4>{objectQuests.questsList[key].title}</h4>
                    <div className="quest-icon"><img src={objectQuests.questsList[key].iconURL}/></div>               
                    <div className="quest-btn">{objectQuests.questsList[key].linkLabel}</div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="card-container__quests">
              <p>Sorry, there are no quests available for {objectDetails.objectTitle} at this time.</p>
            </div>
          )}
          */}

          <style jsx>{`
            h4 {
              font-weight: 600;
            }
            .contain {
              margin: 5%;
              padding: 25px;
              background-color: #f2f2f2;
              text-transform: uppercase;
            }
            .card-container__quests {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
            }
            .quest-card {
              font-size: 1em;
              background-color: #3E4B5C;
              padding: 25px;
              margin: 25px 0;
              min-width: 28%;
              text-align: center;
              color: white;
            }
            .quest-icon {
              background-color: #1E2631;
              width: 90px;
              height: 90px;
              border-radius: 50%;
              padding: 10px;
              margin: 50px auto 60px;
            }
            .quest-btn {
              cursor: pointer;
              margin: 10px auto;
            }
          `}</style>

        </div>
      </Fragment>
    )
  }
}
export default Shows;

