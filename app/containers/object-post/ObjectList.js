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

function generateList({ SlugLookupId }) {
  return [
    {
      label: 'LATEST ENTRIES',
      route: `latest-entries/${SlugLookupId}`,
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
}

class ObjectList extends Component {

  componentDidMount() {
    this.updateList();
  }

  // TODO: refactor
  componentWillReceiveProps(nextProps) {
    const { children } = this.props;
    // destructure this.props.children.props.route.path
    const { props: { route: { path } } } = children;
    // destructure this.props.children.props.children.props.route.path
    const { props: { children: { props: { route: { path: type } } } } } = children;
    const { children: nextChildren } = nextProps;
    const { props: { route: { path: nextPath } } } = nextChildren;
    const { props: { children: { props: { route: { path: nextType } } } } } = nextChildren;

    if (type !== nextType || path !== nextPath) {
      this.updateList();
    }
  }

  updateList() {
    const {
      fetchObjectPosts,
      children,
      entryType,
      SlugLookupId,
    } = this.props;

    // TODO: refactor
    // destructure this.props.children.props.children.props.route.path
    const { props: { children: { props: { route: { path: type } } } } } = children;

    fetchObjectPosts({
      type: [type],
      entryType,
      SlugLookupId,
    });
  }

  render() {
    const { route, location, SlugLookupId, children } = this.props;
    return (
      <div className="clearfix pulse">
        <AnnouncementBanner />
        <CommunityPostHeader {...list2} />

        <CategoriesNav
          route={route}
          location={location}
          list={generateList({ SlugLookupId })}
          className="grey"
        />

        {children}
      </div>
    );
  }
}

ObjectList.propTypes = {
  children: PropTypes.element.isRequired,
  fetchObjectPosts: PropTypes.func.isRequired,
  entryType: PropTypes.string.isRequired,
  SlugLookupId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  entryType: ownProps.params.entryType,
  SlugLookupId: ownProps.params.SlugLookupId,
});

const mapDispatchToProps = dispatch => (bindActionCreators(objectPostActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(ObjectList);
