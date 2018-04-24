/***********************************
* V4 Object Details : Stories
*   Markdown support on elements????
*   UTF-8 support....
*   Multi-National Languages.....
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ObjectStoryList from '../../components/object-post/object-story-list';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import classnames from 'classnames';
import has from 'lodash/has';
import {
  fetchObjectDetailsAction,
  fetchObjectDataAction,
} from '../../modules/object-details/actions';
import {
  fetchObjectLatestContent,
  fetchObjectPosts,
} from '../../modules/object-post-list/actions';


/* Declare these locally since previous versions relied on url routing */
const objectProps = {
  entryType: 'latest-entries',
  filterType: 'all',
}

const mapStateToProps = ({ objectDetails, objectPostList, appConfig, user }) => ({
  objectDetails: objectDetails.objectDetails,
  objectData: objectDetails.objectData,
  entryType: objectProps.entryType,
  filterType: objectProps.filterType,
  SlugLookupId: objectDetails.objectData.slugLookupId,
  fetchingPosts: objectPostList.fetching,
  objectPosts: objectPostList.objectPosts,
  pages: objectPostList.pages,
  count: objectPostList.count,
  page: objectPostList.page,
  postsCount: objectPostList.postsCount,
  firstPostIndex: objectPostList.firstPostIndex,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchObjectDetailsAction,
    fetchObjectDataAction,
    fetchObjectLatestContent,
    fetchObjectPosts,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Stories extends Component {
  constructor(props) {
    super(props);
    this.updateList(props);
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUpdate(nextProps) {

  }

  componentWillMount() {
    //console.log(this.props)
  }

  updateList(requestProps) {
    const { actions } = this.props;
    const {
      entryType,
      slugLookupId,
      filterType,
    } = requestProps;

    actions.fetchObjectPosts({
      type: [filterType],
      entryType,
      SlugLookupId,
    });
  }


  static defaultProps = {
    fetchingPosts: true,
  }

  render() {
    const {
      params: {
        objectId,
      },
      objectDetails,
      SlugLookupId,
      fetchingPosts,
      fetchObjectLatestContent,
      firstPostIndex,
      objectPosts,
      pages,
      count,
      page,
      postsCount,
    } = this.props;

    const sId = SlugLookupId;
    const slugId = toString(sId);

    console.log (this.props);

    return (
      <div className="contain">

        <h4>Stories about {objectDetails.objectTitle}</h4>
        
        {
          fetchingPosts ?
            <GenericLoadingBox />
          :
            <ObjectStoryList
              objectPosts={objectPosts}
              pages={pages}
              page={page}
              count={count}
              /*path={path}*/
              postsCount={postsCount}
              fetchObjectLatestContent={fetchObjectLatestContent}
              SlugLookupId={slugId}
              firstPostIndex={firstPostIndex}
              className={'card-container__stories'}
            />
        }

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
        `}</style>

      </div>
    )
  }
}
export default Stories;

