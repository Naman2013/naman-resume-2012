import React, { Component, PropTypes, cloneElement } from 'react';
import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner'
import PulseListHeader from '../../components/pulse/pulse-list-header';
import CategoriesNav from '../../components/community/categories-nav';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchLatestPosts } from '../../modules/pulse/get-latest-posts-action';


const navigationList = [
  {
    label: "THE LATEST POSTS",
    route: "latest-posts",
    children: [
      {
        label: "All Categories",
        route: "all",
      }, {
        label: "Science Log",
        route: "scienceLog",
      }, {
        label: "Art & Culture",
        route: "artCulture",
      }, {
        label: "Human Spirit",
        route: "humanSpirit",
      }, {
        label: "DIY",
        route: "diy",
      },
    ]
  }
];

function mapStateToProps({latestPosts}, ownProps) {
  const {children: {props}} = ownProps;
  return {
    ...latestPosts,
    childPath: props.children.props.route.path !== 'all' ? props.children.props.route.path : false
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchLatestPosts,
    }, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class PulseList extends Component {

  render() {
    const {
      route,
      location,
      actions: { fetchLatestPosts },
      latestPosts,
      fetching,
      childPath,
      children } = this.props;
    return (
      <div className="clearfix pulse">
        <AnnouncementBanner />
        <PulseListHeader />

        <CategoriesNav route={route} location={location} list={navigationList} />

        {
          cloneElement(children, {
            fetchLatestPosts,
            childPath,
            latestPosts,
            fetching,
          })
        }

      </div>
    );
  }
}

export default PulseList;

PulseList.propTypes = {
  children: PropTypes.element.isRequired
};
