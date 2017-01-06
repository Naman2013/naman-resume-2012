import React, { Component, PropTypes, cloneElement } from 'react';
import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner'
import PulseListHeader from '../../components/pulse/pulse-list-header';
import PulseNav from '../../components/pulse/pulse-nav';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchLatestPosts } from '../../modules/pulse/get-latest-posts-action';


const list = [
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

function mapStateToProps(state, ownProps) {
  const {children: {props}} = ownProps;
  return {
    latestPosts: state.latestPosts,
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
    const { route, location, actions: {fetchLatestPosts}, latestPosts, childPath, children } = this.props;
    
    return (
      <div className="clearfix pulse">
        <AnnouncementBanner />
        <PulseListHeader />
        
        <PulseNav route={route} location={location} list={list}/>
    
          {cloneElement(children, {
              fetchLatestPosts: fetchLatestPosts,
              latestPosts: latestPosts,
              childPath: childPath
          })}
      
      </div>
    )
  }
}

export default PulseList;

PulseList.propTypes = {
  children: PropTypes.element.isRequired
};