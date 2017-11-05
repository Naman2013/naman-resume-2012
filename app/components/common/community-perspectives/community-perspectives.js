import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classnames from 'classnames';
import Slider from 'react-slick';
import find from 'lodash/find';
import orderBy from 'lodash/orderBy';
import shuffle from 'lodash/shuffle';
import CommunityPost from './community-post';
import CallToAction from './call-to-action';
import Spacer from './../../common/spacer';
import perspectiveCatagories, { SCIENCE_LOG } from './perspective-catagories';
import './community-perspectives.scss';
import './slick.min.css';
import './slick-theme.min.css';

const SORTED = 'sorted';
const RANDOMIZED = 'randomized';

const getIconStyleInline = svgUrl => ({
  maskImage: `url(${svgUrl})`,
  WebkitMaskImage: `url(${svgUrl})`,
});

class CommunityPerspectives extends Component {
  static propTypes = {
    sortOrder: PropTypes.arrayOf(PropTypes.string.isRequired),
    sortType: PropTypes.oneOf([RANDOMIZED, SORTED]),
    showCallToAction: PropTypes.bool,
    showSliderBorder: PropTypes.bool,
    showArrows: PropTypes.bool,
    numberOfSlidesToDisplay: PropTypes.number,
    communityContent: PropTypes.arrayOf(
      PropTypes.shape({
        posts: PropTypes.arrayOf(
          PropTypes.shape({
            postId: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
            objectId: PropTypes.number.isRequired,
            slugLookupId: PropTypes.number.isRequired,
            slugDesc: PropTypes.string.isRequired,
            customerId: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            membershipType: PropTypes.string.isRequired,
            displayName: PropTypes.string.isRequired,
            userId: PropTypes.string.isRequired,
            memberSince: PropTypes.string.isRequired,
            avatarType: PropTypes.string.isRequired,
            avatarURL: PropTypes.string.isRequired,
            likesCount: PropTypes.number.isRequired,
            canLikeFlag: PropTypes.number.isRequired,
          }),
        ),
      }),
    ),
  };

  static defaultProps = {
    sortOrder: ['likesCount', 'creationDate'],
    sortType: SORTED,
    showCallToAction: true,
    showSliderBorder: true,
    showArrows: true,
    numberOfSlidesToDisplay: 2,
    communityContent: [],
  };

  constructor(props) {
    super(props);
    this.generateCommunityPostsMap();

    const perspectiveCategory = find(
      perspectiveCatagories,
      c => this.filterPosts(this.props.communityContent, c.catagory).length > 0,
    );

    if (perspectiveCategory) {
      this.setState({
        activeCatagory: perspectiveCategory.catagory,
      });
    }
  }

  state = {
    activeCatagory: SCIENCE_LOG,
    hoverCategory: null,
  };

  componentWillReceiveProps(nextProps) {
    const perspectiveCategory = find(
      perspectiveCatagories,
      c => this.filterPosts(nextProps.communityContent, c.catagory).length > 0,
    );

    if (perspectiveCategory) {
      this.setState({
        activeCatagory: perspectiveCategory.catagory,
      });
    }
  }

  getPosts(postType) {
    const { communityContent, sortOrder, sortType } = this.props;
    const filteredPosts = communityContent.filter(post => post.type === postType);
    return sortType === SORTED
      ? orderBy(filteredPosts, sortOrder, ['desc', 'desc'])
      : shuffle(filteredPosts);
  }

  hasRelevantPosts() {
    const posts = this.props.communityContent;

    const filteredPosts = this.filterPosts(posts);
    return filteredPosts.length > 0;
  }

  communityPostsByType: null;

  generateCommunityPostsMap() {
    const postMap = new Map();
    perspectiveCatagories.forEach((postType) => {
      postMap.set(postType.catagory, this.getPosts(postType.contentKey));
    });

    this.communityPostsByType = postMap;
  }

  changeHoverCategory = (e, hoverCategory) => {
    this.setState({
      hoverCategory,
    });
  };

  filterPosts(posts = [], category) {
    const { activeCatagory } = this.state;
    const active = category || activeCatagory;
    const matchContentKey = perspectiveCatagories.find(profile => profile.catagory === active)
      .contentKey;
    return posts.filter(post => post.type === matchContentKey);
  }

  handleNavigationClick = (event, activeCatagory) => {
    event.preventDefault();
    this.setState({
      activeCatagory,
    });
  };

  initializeContentMap() {
    this.generatePosts();
  }

  generatePosts() {
    const { activeCatagory } = this.state;
    const posts = this.communityPostsByType.get(activeCatagory);
    const hasPosts = posts.length > 0;

    // if there ARE posts, show them
    if (hasPosts) {
      return posts.map(post => (
        <div key={post.postId}>
          <CommunityPost {...post} />
        </div>
      ));
    }

    return (
      <div>
        <CallToAction />
      </div>
    );
  }

  render() {
    const { showCallToAction, showSliderBorder, showArrows, numberOfSlidesToDisplay } = this.props;

    const sliderStyle = classnames('slide', {
      'with-border': showSliderBorder,
    });

    const hasRelevantPosts = this.hasRelevantPosts();
    const posts = this.generatePosts();

    const sliderSettings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: hasRelevantPosts ? numberOfSlidesToDisplay : 1,
      slidesToScroll: 1,
      arrows: hasRelevantPosts && posts.length > 1 ? showArrows : false,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: hasRelevantPosts ? 2 : 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <div className="telescope-block community-perspectives">
        <div className="content">
          <div className="row">
            <ul className="col-xs-12 clearfix categories">
              {perspectiveCatagories.map((perspective, index) => {
                const isActiveNonHoveredCategory =
                  !this.state.hoverCategory && this.state.activeCatagory === perspective.catagory;
                const isHoverCategory = this.state.hoverCategory === perspective.catagory;
                const navigationClasses = classnames('action', {
                  active: isActiveNonHoveredCategory || isHoverCategory,
                });
                return (
                  <li
                    key={index}
                    className="col-xs-3 category"
                    onMouseOver={(e) => {
                      this.changeHoverCategory(e, perspective.catagory);
                    }}
                    onMouseOut={(e) => {
                      this.changeHoverCategory(e, this.state.activeCatagory);
                    }}
                  >
                    <button
                      onClick={event => this.handleNavigationClick(event, perspective.catagory)}
                      className={navigationClasses}
                      id={perspective.catagory}
                    >
                      <p className="title">{perspective.title}</p>
                      <div
                        className={`icon ${navigationClasses}`}
                        style={getIconStyleInline(perspective.icon)}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="col-xs-12">
              <div className="col-xs-12 double-border" />
            </div>

            <div className="col-xs-12 slide-container">
              {/*
               WARNING: each slider element requires a parent div
               */}
              <Slider {...sliderSettings} className={sliderStyle}>
                {posts}
              </Slider>
            </div>

            {showCallToAction ? (
              <div className="col-xs-12">
                <Spacer height="20px" />
                <Link to="/publish-post" className="btn-primary">
                  Contribute Content
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default CommunityPerspectives;
