import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Slider from 'react-slick';
import Spacer from './../../common/spacer';

import './community-perspectives.scss';
import './slick.min.css';
import './slick-theme.min.css';

class CommunityPerspectives extends Component {

  render() {
    const {
      showCallToAction,
      showSliderBorder,
      numberOfSlidesToDisplay,
      showArrows } = this.props;

    const sliderStyle = classnames({
      slide: true,
      'with-border': showSliderBorder,
    });

    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: numberOfSlidesToDisplay,
      slidesToScroll: 1,
      arrows: showArrows,
    };

    return(
      <div className="telescope-block community-perspectives">

        <div className="content">
          <div className="row">

            <ul className="col-xs-12 clearfix categories">
              <li className="col-xs-3 category">
                <a className="action active" href="#">
                  <p className="title" className="title">Science log</p>
                  <div className="icon">
                    <img height="45" src={'/assets/images/icons/icon-science-active.png'} />
                  </div>
                </a>
              </li>
              <li className="col-xs-3 category">
                <a className="action" href="#">
                  <p className="title">Art & culture</p>
                  <div className="icon">
                    <img height="45" src={'/assets/images/icons/icon-culture.png'} />
                  </div>
                </a>
              </li>
              <li className="col-xs-3 category">
                <a className="action" href="#">
                  <p className="title">Human spirit</p>
                  <div className="icon">
                    <img height="45" src={'/assets/images/icons/icon-human-spirit.png'} />
                  </div>
                </a>
              </li>
              <li className="col-xs-3 category">
                <a className="action" href="#">
                  <p className="title">diy</p>
                  <div className="icon">
                    <img height="45" src={'/assets/images/icons/icon-DIY.png'} />
                  </div>
                </a>
              </li>
            </ul>

            <div className="col-xs-12">
              <div className="col-xs-12 double-border" />
            </div>

            <div className="col-xs-12 slide-container">

              <Slider {...sliderSettings} className={sliderStyle}>

                <div className="item">
                  <div className="personal-info">
                    <div className="clearfix">
                      <p className="name pull-left">Dave Eberly</p>
                      <p className="job pull-left">ASTRONOMER</p>
                    </div>
                    <p className="address">Chicago, IL, USA. Member since 2011</p>
                    <img src={'/assets/images/graphics/dave-photo.png'} className="photo" />
                  </div>

                  <div className="description">
                    <h3 className="title">
                      Some cool stats on Andromeda Being
                    </h3>
                    <p className="desc">
                      Approximately 220,000 light years across, it is the largest galaxy of the Local Group, which also contains the Milky Way, the Triangulum Galaxy, and about 44 other smaller galaxies. The light you see has taken 2 million years to get to the earth!
                    </p>
                  </div>
                </div>

                <div className="item">
                  <div className="personal-info">
                    <div className="clearfix">
                      <p className="name pull-left">Dave Eberly</p>
                      <p className="job pull-left">ASTRONOMER</p>
                    </div>
                    <p className="address">Chicago, IL, USA. Member since 2011</p>
                    <img src={'/assets/images/graphics/dave-photo.png'} className="photo" />
                  </div>
                  <div className="description">
                    <h3 className="title">
                      Some cool stats on Andromeda Being
                    </h3>
                    <p className="desc">
                      Approximately 220,000 light years across, it is the largest galaxy of the Local Group, which also contains the Milky Way, the Triangulum Galaxy, and about 44 other smaller galaxies. The light you see has taken 2 million years to get to the earth!
                    </p>
                  </div>
                </div>

              </Slider>
            </div>

            {
              showCallToAction ?
                <div className="col-xs-12">
                  <Spacer height="20px" />
                  <button className="btn">Contribute Content</button>
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
