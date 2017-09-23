import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner';
import CategoriesNav from '../../components/community/categories-nav';
import CommunityPostHeader from '../../components/community/community-post-header';
import {
  fetchPageMeta,
  fetchObjectAllTimeBest,
  fetchObjectLatestContent,
  fetchObjectPosts,
} from '../../modules/object-post-list/actions';

function generateList({ SlugLookupId }) {
  return [
    {
      label: 'LATEST',
      route: `latest-entries/${SlugLookupId}`,
      linkRoute: 'slooh-pulse/latest-posts',
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
      label: 'HOTTEST',
      linkRoute: 'slooh-pulse/hottest-posts',
      children: [],
    },
    {
      label: 'ALL',
      linkRoute: 'slooh-pulse/all-posts',
      children: [],
    }
  ];
}

const mapStateToProps = ({ objectPostList }, ownProps) => ({
  pageMeta: objectPostList.pageMeta,
  entryType: ownProps.params.entryType,
  SlugLookupId: ownProps.params.SlugLookupId,
  filterType: ownProps.params.filterType,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchObjectAllTimeBest,
    fetchObjectLatestContent,
    fetchPageMeta,
    fetchObjectPosts,
  }, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
class ObjectList extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    actions: PropTypes.shape({
      fetchObjectPosts: PropTypes.func.isRequired,
    }),
    entryType: PropTypes.string.isRequired,
    filterType: PropTypes.string.isRequired,
    SlugLookupId: PropTypes.string.isRequired,
    pageMeta: PropTypes.shape({
      headerObjectTitle: PropTypes.string.isRequired,
      headerIconURL: PropTypes.string.isRequired,
      showRecommends: PropTypes.bool.isRequired,
      showAdUnit: PropTypes.bool.isRequired,
      showLatestEntriesMenu: PropTypes.bool.isRequired,
      showPostTypesSubmenu: PropTypes.bool.isRequired,
      showGuardian: PropTypes.bool.isRequired,
      showFeaturedObjects: PropTypes.bool.isRequired,
      showFollowObjectButton: PropTypes.bool.isRequired,
      showCreateNewPostButton: PropTypes.bool.isRequired,
      objectId: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.updateList(props);
  }

  componentWillReceiveProps(nextProps) {
    const { SlugLookupId, filterType, entryType } = nextProps.params;
    if (
      (SlugLookupId !== this.props.SlugLookupId) ||
      (filterType !== this.props.filterType) ||
      (entryType !== this.props.entryType)) {
      this.updateList(nextProps);
    }
  }

  updateList(requestProps) {
    const { actions } = this.props;
    const {
      entryType,
      SlugLookupId,
      filterType,
    } = requestProps;

    actions.fetchPageMeta({ slugLookupId: SlugLookupId });

    actions.fetchObjectPosts({
      type: [filterType],
      entryType,
      SlugLookupId,
    });
  }

  render() {
    const {
      route,
      location,
      SlugLookupId,
      children,
      pageMeta: {
        headerObjectTitle,
        headerIconURL,
        showCreateNewPostButton,
        showRecommends,
        showAdUnit,
        showLatestEntriesMenu,
        showPostTypesSubmenu,
        showGuardian,
        showFeaturedObjects,
        showFollowObjectButton,
        objectId,
      },
      actions: {
        fetchObjectLatestContent
      }
    } = this.props;

    const recommendations = [Number(objectId)];
    return (
      <div className="clearfix pulse">
        <AnnouncementBanner />
        <CommunityPostHeader
          titleText={headerObjectTitle}
          objectIconURL={headerIconURL}
          showCreateNewPostButton={showCreateNewPostButton}
        />

        <CategoriesNav
          route={route}
          location={location}
          list={generateList({ SlugLookupId })}
          className="grey"
          isObjects={true}
        />

        {
          objectId ?
            cloneElement(children, {
              fetchObjectLatestContent,
              headerObjectTitle,
              SlugLookupId,
              showRecommends,
              showAdUnit,
              showLatestEntriesMenu,
              showPostTypesSubmenu,
              showGuardian,
              showFeaturedObjects,
              showFollowObjectButton,
              showCreateNewPostButton,
              recommendationCards: recommendations,
            }) : null
        }
      </div>
    );
  }
}

export default ObjectList;
