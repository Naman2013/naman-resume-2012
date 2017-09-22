import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner'
import PulseListHeader from '../../components/pulse/pulse-list-header';
import CategoriesNav from '../../components/community/categories-nav';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchLatestPosts, fetchHottestPosts, fetchPageMeta } from '../../modules/pulse/get-latest-posts-action';
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
  }
];

function mapStateToProps({ latestPosts }, ownProps) {
  const { children: { props } } = ownProps;
  return {
    ...latestPosts,
    childPath: props.children.props.route.path !== 'all' ? props.children.props.route.path : false
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchLatestPosts,
      fetchHottestPosts,
      fetchPageMeta,
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
      route,
      location,
      actions: { fetchLatestPosts, fetchHottestPosts },
      latestPosts,
      fetching,
      childPath,
      children,
      pageMeta: {
        headerTitle,
        headerSubtitle,
        showCreateNewPostButton,
        objectIdList,
        showRecommends,
      },
    } = this.props;

    const formattedObjectIdList =
      (objectIdList && objectIdList.map(objectId => Number(objectId))) || [];
    return (
      <div className="clearfix pulse">
        <AnnouncementBanner />
        <PulseListHeader
          title={headerTitle}
          showCreateNewPostButton={showCreateNewPostButton}
        />

        <CategoriesNav route={route} location={location} list={navigationList} />

        {
          cloneElement(children, {
            fetchLatestPosts,
            fetchHottestPosts,
            childPath,
            latestPosts,
            fetching,
            formattedObjectIdList,
            showRecommends,
          })
        }

      </div>
    );
  }
}

export default PulseList;
