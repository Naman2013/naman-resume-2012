import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner';
import CategoriesNav from '../../components/community/categories-nav';
import CommunityPostHeader from '../../components/community/community-post-header';
import * as objectPostActions from '../../modules/object-post-list/actions';

const list2 = {
  name: 'The Moon',
  icon: 'moon',
};

const list = [
  {
    label: 'ALL-TIME BEST',
    route: 'all-time-best',
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
    ],
  },
  {
    label: 'LATEST ENTRIES',
    route: 'latest-entries',
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
    ],
  },
];

class ObjectList extends Component {

  componentDidMount() {
    const { fetchObjectPosts, children } = this.props;
    // destructure this.props.children.props.route.path
    const { props: { route: { path } } } = children;
    // destructure this.props.children.props.children.props.route.path
    const { props: { children: { props: { route: { path: type } } } } } = children;

    fetchObjectPosts({
      type: [type],
      path,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { fetchObjectPosts, children } = this.props;
    // destructure this.props.children.props.route.path
    const { props: { route: { path } } } = children;
    // destructure this.props.children.props.children.props.route.path
    const { props: { children: { props: { route: { path: type } } } } } = children;
    const { children: nextChildren } = nextProps;
    const { props: { route: { path: nextPath } } } = nextChildren;
    const { props: { children: { props: { route: { path: nextType } } } } } = nextChildren;

    if (type !== nextType || path !== nextPath) {
      fetchObjectPosts({
        type: [nextType],
        path: nextPath,
      });
    }
  }
  render() {
    const { route, location, children } = this.props;

    return (
      <div className="clearfix pulse">
        <AnnouncementBanner />
        <CommunityPostHeader {...list2} />

        <CategoriesNav route={route} location={location} list={list} className="grey" />
        {children}
      </div>
    );
  }
}

ObjectList.propTypes = {
  children: PropTypes.element.isRequired,
  fetchObjectPosts: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => (bindActionCreators(objectPostActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(ObjectList);
