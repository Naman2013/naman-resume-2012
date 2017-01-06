import React, { Component, PropTypes, Children, cloneElement } from 'react';
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
    childPath: props.route.path !== 'all' ? props.children.props.route.path : false
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
  
  constructor(props) {
    super(props)
  }
  
  render() {
    const { route, location, actions: {fetchLatestPosts}, latestPosts, childPath, children } = this.props;
  
    const childrenWithProps = Children.map(children, child => {
        return cloneElement(child, {
          fetchLatestPosts: fetchLatestPosts,
          latestPosts: latestPosts,
          childPath: childPath
        });
    });
    
    return (
      <div className="clearfix pulse">
        <AnnouncementBanner />
        <PulseListHeader />
        
        <PulseNav route={route} location={location} list={list}/>
        
        {childrenWithProps}
      
      </div>
    )
  }
}

export default PulseList;

PulseList.propTypes = {
  children: PropTypes.element.isRequired
};