import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classnames from 'classnames';
import Slider from 'react-slick';
import find from 'lodash/find';
import orderBy from 'lodash/orderBy';
import CommunityPost from './community-post';
import CallToAction from './call-to-action';
import Spacer from './../../common/spacer';
import './community-perspectives.scss';
import './slick.min.css';
import './slick-theme.min.css';

const SCIENCE_LOG = 'SCIENCE_LOG';
const ART_CULTURE = 'ART_CULTURE';
const HUMAN_SPIRIT = 'HUMAN_SPIRIT';
const DIY = 'DIY';
const getIconStyleInline = svgUrl => ({
  maskImage: `url(${svgUrl})`,
  WebkitMaskImage: `url(${svgUrl})`
});
const perspectiveCatagories = [
  {
    title: 'Science log',
    icon: 'https://vega.slooh.com/icons/community/science_log.svg',
    catagory: SCIENCE_LOG,
    contentKey: 'scienceLog',
  },
  {
    title: 'Art & culture',
    icon: 'https://vega.slooh.com/icons/community/art_culture.svg',
    catagory: ART_CULTURE,
    contentKey: 'artCulture',
  },
  {
    title: 'Human spirit',
    icon: 'https://vega.slooh.com/icons/community/human_spirit.svg',
    catagory: HUMAN_SPIRIT,
    contentKey: 'humanSpirit',
  },
  {
    title: 'diy',
    icon: 'https://vega.slooh.com/icons/community/DIY.svg',
    catagory: DIY,
    contentKey: 'diy',
  },
];

class CommunityPerspectives extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCatagory: SCIENCE_LOG,
      hoverCategory: null,
    };
  }

  componentWillMount() {
    const perspectiveCategory = find(
      perspectiveCatagories,
      c => (this.filterPosts(this.props.communityContent, c.catagory).length > 0)
    );

    if (perspectiveCategory) {
      this.setState({
        activeCatagory: perspectiveCategory.catagory,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const perspectiveCategory = find(
      perspectiveCatagories,
      c => (this.filterPosts(nextProps.communityContent, c.catagory).length > 0)
    );

    if (perspectiveCategory) {
      this.setState({
        activeCatagory: perspectiveCategory.catagory,
      });
    }
  }

  handleNavigationClick = (event, activeCatagory) => {
    event.preventDefault();
    this.setState({
      activeCatagory,
    });
  }

  filterPosts(posts = [], category) {
    const { activeCatagory } = this.state;
    const active = category || activeCatagory;
    const matchContentKey =
      perspectiveCatagories.find(profile => profile.catagory === active).contentKey;
    return posts.filter(post => post.type === matchContentKey);
  }

  changeHoverCategory = (e, hoverCategory) => {
    this.setState({
      hoverCategory,
    });
  }

  hasRelevantPosts() {
    const posts = this.props.communityContent;

    const filteredPosts = this.filterPosts(posts);
    return filteredPosts.length > 0;
  }

  generatePosts() {
    const posts = this.props.communityContent;
    const filteredPosts = this.filterPosts(posts);
    const hasPosts = filteredPosts.length > 0;
    const sortedPosts = orderBy(filteredPosts, ['likesCount', 'creationDate'], ['desc', 'desc']);

    // if there ARE posts, show them
    if (hasPosts) {
      return sortedPosts.map(post => (
        <div key={post.postId}>
          <CommunityPost
            {...post}
          />
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
    const {
      showCallToAction,
      showSliderBorder,
      showArrows,
      numberOfSlidesToDisplay,
    } = this.props;

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
    };

    return (
      <div className="telescope-block community-perspectives">

        <div className="content">
          <div className="row">

            <ul className="col-xs-12 clearfix categories">
              {
                perspectiveCatagories.map((perspective, index) => {
                  const isActiveNonHoveredCategory = !this.state.hoverCategory && (this.state.activeCatagory === perspective.catagory);
                  const isHoverCategory = this.state.hoverCategory === perspective.catagory;
                  const navigationClasses = classnames('action', {
                    active: isActiveNonHoveredCategory || isHoverCategory,
                  });
                  return (
                    <li
                      key={index}
                      className="col-xs-3 category"
                      onMouseOver={(e) => { this.changeHoverCategory(e, perspective.catagory); }}
                      onMouseOut={(e) => { this.changeHoverCategory(e, this.state.activeCatagory); }}
                    >
                      <button
                        onClick={event => this.handleNavigationClick(event, perspective.catagory)}
                        className={navigationClasses}
                        id={perspective.catagory}
                      >
                        <p className="title">{perspective.title}</p>
                        <div className={`icon ${navigationClasses}`} style={getIconStyleInline(perspective.icon)} />
                      </button>
                    </li>
                  );
                })
              }
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

            {
              showCallToAction ?
                <div className="col-xs-12">
                  <Spacer height="20px" />
                  <Link to="/publish-post" className="btn-primary">Contribute Content</Link>
                </div> : null
            }

          </div>
        </div>
      </div>
    );
  }
}

CommunityPerspectives.defaultProps = {
  showCallToAction: true,
  showSliderBorder: true,
  showArrows: true,
  numberOfSlidesToDisplay: 2,
  communityContent: [],
};

CommunityPerspectives.propTypes = {
  showCallToAction: PropTypes.bool,
  showSliderBorder: PropTypes.bool,
  showArrows: PropTypes.bool,
  numberOfSlidesToDisplay: PropTypes.number,
  communityContent: PropTypes.arrayOf(PropTypes.shape({
    posts: PropTypes.arrayOf(PropTypes.shape({
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
    })),
  })),
  actions: PropTypes.object,
};

export default CommunityPerspectives;
