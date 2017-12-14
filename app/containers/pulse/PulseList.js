import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner'
import PulseListHeader from '../../components/pulse/pulse-list-header';
import CategoriesNav from '../../components/community/categories-nav';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  fetchPosts,
  fetchPageMeta,
  resetIlluminationsPosts,
  searchPosts,
} from '../../modules/pulse/get-latest-posts-action';
import './Pulse.scss';


const navigationList = [
  {
    label: 'LATEST',
    route: 'latest-posts',
    children: [
      {
        label: 'All Categories',
        route: 'all',
      }, {
        label: 'Science Log',
        route: 'scienceLog',
      }, {
        label: 'Art & Culture',
        route: 'artCulture',
      }, {
        label: 'Human Spirit',
        route: 'humanSpirit',
      }, {
        label: 'DIY',
        route: 'diy',
      },
    ]
  },
  {
    label: 'HOTTEST',
    route: 'hottest-posts',
    children: [
      {
        label: 'All Categories',
        route: 'all',
      }, {
        label: 'Science Log',
        route: 'scienceLog',
      }, {
        label: 'Art & Culture',
        route: 'artCulture',
      }, {
        label: 'Human Spirit',
        route: 'humanSpirit',
      }, {
        label: 'DIY',
        route: 'diy',
      },
    ]
  },
  {
    label: 'ALL',
    route: 'all-posts',
    children: [
      {}
      // {
      //   label: 'Find By Object',
      //   route: 'by-object',
      // }
    ]
  },
  {
    label: 'SEARCH',
    route: 'search',
    children: [
      {}
    ]
  }
];

function mapStateToProps({ illuminationsPosts }, ownProps) {
  const { children: { props } } = ownProps;
  return {
    ...illuminationsPosts,
    childPath: props.children.props.route.path !== 'all' ? props.children.props.route.path : false
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchPosts,
      fetchPageMeta,
      resetIlluminationsPosts,
      searchPosts,
    }, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class PulseList extends Component {

  static defaultProps = {
    pageMeta: {
      objectIdList: [],
    },
  }

  constructor(props) {
    super()

    props.actions.fetchPageMeta();
  }

  render() {
    const {
      actions: { fetchPosts, resetIlluminationsPosts, searchPosts },
      childPath,
      children,
      fetching,
      illuminations,
      location,
      route,
      searchTriggered,
      fetchingPopularPosts,
      page,
      pageMeta: {
        headerTitle,
        headerSubtitle,
        showCreateNewPostButton,
        objectIdList,
        showRecommends,
      },
      popularPosts,
      postsPerPage,
    } = this.props;

    const formattedObjectIdList =
      (objectIdList && objectIdList.map(objectId => Number(objectId))) || [];
    return (
      <div className="clearfix pulse">
        <AnnouncementBanner />
        <PulseListHeader
          title={headerTitle}
          subtitle={headerSubtitle}
          showCreateNewPostButton={showCreateNewPostButton}
        />

        <CategoriesNav route={route} location={location} list={navigationList} />

        {
          cloneElement(children, {
            childPath,
            fetching,
            fetchingPopularPosts,
            fetchPosts,
            formattedObjectIdList,
            illuminations,
            page,
            popularPosts,
            postsPerPage,
            resetIlluminationsPosts,
            searchPosts,
            searchTriggered,
            showRecommends,
          })
        }

      </div>
    );
  }
}

export default PulseList;
