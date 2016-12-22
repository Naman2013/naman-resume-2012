import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import CommunityPost from './community-post';
import CallToAction from './call-to-action';
import Heart from '../heart/heart';
import Slider from 'react-slick';
import Spacer from './../../common/spacer';
import GET_OBJECT_CONTENT_RESPONSE_CODES from '../../../constants/get-object-content-response-codes';
import './community-perspectives.scss';
import './slick.min.css';
import './slick-theme.min.css';

import exampleCommunityContent from '../../../content/example-community-content';

const SCIENCE_LOG = 'SCIENCE_LOG';
const ART_CULTURE = 'ART_CULTURE';
const HUMAN_SPIRIT = 'HUMAN_SPIRIT';
const DIY = 'DIY';

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

const mapStateToProps = ({ communityObjectContent }) => ({
  communityObjectContent,
});

@connect(mapStateToProps)
class CommunityPerspectives extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCatagory: SCIENCE_LOG,
    };

    this.handleNavigationClick = this.handleNavigationClick.bind(this);
  }

  handleNavigationClick(event, activeCatagory) {
    event.preventDefault();
    this.setState({
      activeCatagory,
    });
  }

  filterPosts(posts = []) {
    const { activeCatagory } = this.state;
    const matchContentKey = perspectiveCatagories.find(profile => profile.catagory === activeCatagory).contentKey;
    return posts.filter(post => post.type === matchContentKey);
  }

  hasRelevantPosts() {
    const { posts } = this.props.communityObjectContent.communityContent;
    // const { posts } = exampleCommunityContent;
    const filteredPosts = this.filterPosts(posts);
    return filteredPosts.length > 0;
  }

  generatePosts() {
    const { posts } = this.props.communityObjectContent.communityContent;
    // console.warn('RENDERING STATIC COMMUNITY CONTENT FROM COMMUNITY PERSPERTIVES COMPONENT');
    // const { posts } = exampleCommunityContent;
    const filteredPosts = this.filterPosts(posts);
    const hasPosts = filteredPosts.length > 0;

    // if there ARE posts, show them
    if(hasPosts) {
      return filteredPosts.map(post => (
        <div key={post.postId}>
          <CommunityPost
            {...post}
          />
        </div>
      ));
    }

    // if there are no posts, ask the user to create one
    if(!hasPosts) {
      return(
        <div>
          <CallToAction />
        </div>
      );
    }
  }

  render() {
    const {
      showCallToAction,
      showSliderBorder,
      showArrows,
      numberOfSlidesToDisplay } = this.props;

    const sliderStyle = classnames('slide', {
      'with-border': showSliderBorder,
    });

    const hasRelevantPosts = this.hasRelevantPosts();

    const sliderSettings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: hasRelevantPosts ? numberOfSlidesToDisplay : 1,
      slidesToScroll: 1,
      arrows: hasRelevantPosts ? showArrows : false,
    };

    console.log(this.props.communityObjectContent);

    return(
      <div className="telescope-block community-perspectives">

        <div className="content">
          <div className="row">

            <ul className="col-xs-12 clearfix categories">
              {
                perspectiveCatagories.map((perspective, index) => {
                  const navigationClasses = classnames('action', {
                    active: this.state.activeCatagory === perspective.catagory,
                  });
                  return(
                    <li key={index} className="col-xs-3 category">
                      <a
                        onClick={(event) => this.handleNavigationClick(event, perspective.catagory)}
                        className={navigationClasses}
                        href="#"
                      >
                        <p className="title">{perspective.title}</p>
                        <div className="icon">
                          <img height="45" src={perspective.icon} />
                        </div>
                      </a>
                    </li>
                  )
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
                {this.generatePosts()}
              </Slider>
            </div>

            {
              showCallToAction ?
                <div className="col-xs-12">
                  <Spacer height="20px" />
                  <button className="btn-primary">Contribute Content</button>
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
};

CommunityPerspectives.propTypes = {
  showCallToAction: PropTypes.bool,
  showSliderBorder: PropTypes.bool,
  showArrows: PropTypes.bool,
  numberOfSlidesToDisplay: PropTypes.number,
};

export default CommunityPerspectives;
