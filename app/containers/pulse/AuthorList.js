import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner'
import PulseListHeader from '../../components/pulse/pulse-list-header';
import CategoriesNav from '../../components/community/categories-nav';
import { fetchPageMeta } from '../../modules/author-posts-page-layout/actions';
import { fetchAuthorContent } from '../../modules/author-content/actions';

const {
  number,
  string,
  func,
  shape,
} = PropTypes;


function mapStateToProps({ authorPostsLayout }) {
  return {
    pageMeta: authorPostsLayout,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchPageMeta,
      fetchAuthorContent,
    }, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class AuthorList extends Component {
  static propTypes = {
    actions: shape({
      fetchPageMeta: func.isRequired,
      fetchAuthorContent: func.isRequired,
    }).isRequired,
    params: shape({
      authorId: string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
  }

  state = {
    navigationList: [
      {
        label: 'LATEST',
        route: 'latest',
        linkRoute: `authors/${this.props.params.authorId}/latest`,
        children: []
      }
    ]
  };

  componentDidMount() {
    const { actions, params } = this.props;
    const { navigationList } = this.state;
    const authorId = params.authorId;

    actions.fetchPageMeta(authorId).then((res) => {
      if (res.payload.showPostTypesSubmenu) {
        const newNavList = navigationList;
        newNavList[0].children = newNavList[0].children.concat([
          {
            label: 'All Categories',
            route: 'all',
            linkRoute: `authors/${this.props.params.authorId}/latest/all`
          }, {
            label: 'Science Log',
            route: 'scienceLog',
            linkRoute: `authors/${this.props.params.authorId}/latest/scienceLog`
          }, {
            label: 'Art & Culture',
            route: 'artCulture',
            linkRoute: `authors/${this.props.params.authorId}/latest/artCulture`
          }, {
            label: 'Human Spirit',
            route: 'humanSpirit',
            linkRoute: `authors/${this.props.params.authorId}/latest/humanSpirit`
          }, {
            label: 'DIY',
            route: 'diy',
            linkRoute: `authors/${this.props.params.authorId}/latest/diy`
          },
        ]);

        this.setState(() => ({
          navigationList: newNavList
        }));
      }
    });

    actions.fetchAuthorContent({
      authorId,
    });
  }

  render() {
    const {
      route,
      location,
      actions: { fetchAuthorContent },
      children,
      pageMeta: {
        headerTitle,
        headerSubtitle,
        showCreateNewPostButton,
        showFeaturedObjects,
        showAdUnit,
        showPopularPosts,
      },
    } = this.props;
    const { navigationList } = this.state;

    return (
      <div className="clearfix pulse">
        <AnnouncementBanner />
        <PulseListHeader
          title={headerTitle}
          subtitle={headerSubtitle}
          showCreateNewPostButton={showCreateNewPostButton}
        />

        <CategoriesNav
          route={route}
          location={location}
          list={navigationList}
          className="grey"
        />

        {
          cloneElement(children, {
            fetchAuthorContent,
            showFeaturedObjects,
            showAdUnit,
            showPopularPosts,
          })
        }
        
      </div>
    );
  }
}

export default AuthorList;
