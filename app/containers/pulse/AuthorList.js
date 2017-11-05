import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner'
import PulseListHeader from '../../components/pulse/pulse-list-header';
import CategoriesNav from '../../components/community/categories-nav';
import { fetchPageMeta } from '../../modules/author-posts-page-layout/actions';
import { fetchAuthorContent } from '../../modules/author-content/actions';
import { fetchPopularPosts } from '../../modules/pulse/get-latest-posts-action';

const {
  func,
  shape,
  string,
} = PropTypes;


const mapStateToProps = ({ authorPostsLayout }, ownProps) => {
  const { children: { props }, params } = ownProps;
  return {
    pageMeta: authorPostsLayout,
    childPath: props.children.props.route.path,
    authorId: String(params.authorId),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchPageMeta,
    fetchAuthorContent,
    fetchPopularPosts,
  }, dispatch)
});

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
    childPath: string,
    authorId: string.isRequired,
  };

  static defaultProps = {
    childPath: 'all',
  }

  state = {
    navigationList: [
      {
        label: 'LATEST',
        route: 'latest',
        linkRoute: `authors/${this.props.params.authorId}/latest`,
        children: [],
      },
    ],
  };

  componentDidMount() {
    const { actions, childPath, authorId } = this.props;
    const { navigationList } = this.state;
    actions.fetchPageMeta(authorId).then((res) => {
      if (res.payload.showPostTypesSubmenu) {
        const newNavList = navigationList;
        newNavList[0].children = newNavList[0].children.concat([
          {
            label: 'All Categories',
            route: 'all',
            linkRoute: `authors/${this.props.params.authorId}/latest/all`,
          }, {
            label: 'Science Log',
            route: 'scienceLog',
            linkRoute: `authors/${this.props.params.authorId}/latest/scienceLog`,
          }, {
            label: 'Art & Culture',
            route: 'artCulture',
            linkRoute: `authors/${this.props.params.authorId}/latest/artCulture`,
          }, {
            label: 'Human Spirit',
            route: 'humanSpirit',
            linkRoute: `authors/${this.props.params.authorId}/latest/humanSpirit`,
          }, {
            label: 'DIY',
            route: 'diy',
            linkRoute: `authors/${this.props.params.authorId}/latest/diy`,
          },
        ]);

        this.setState(() => ({
          navigationList: newNavList,
        }));
      }
    });

    actions.fetchAuthorContent({
      authorId,
      type: childPath,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { actions, authorId, childPath } = nextProps;
    if (childPath !== this.props.childPath) {
      actions.fetchAuthorContent({
        authorId,
        type: childPath,
      });
    }
  }

  render() {
    const {
      actions: {
        fetchAuthorContent,
        fetchPopularPosts
      },
      childPath,
      children,
      location,
      route,
      pageMeta: {
        headerTitle,
        headerSubtitle,
        showCreateNewPostButton,
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
            fetchPopularPosts,
            fetchAuthorContent,
            childPath,
          })
        }

      </div>
    );
  }
}

export default AuthorList;
