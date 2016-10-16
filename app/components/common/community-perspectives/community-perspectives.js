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
      showArrows } = this.props;

    const sliderStyle = classnames({
      slide: true,
      'with-border': showSliderBorder,
    });

    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: showArrows,
    };

    return(
      <div className="telescope-block community-perspectives">

        <div className="content">
          <div className="row">

            <ul className="col-xs-12 categories">
              <li className="col-xs-3 category">
                <a className="action" href="#">
                  <p className="title" className="title">Science log</p>
                  <img
                    className="icon" src={'/assets/images/icons/icon-science-active.png'} />
                </a>
              </li>
              <li className="col-xs-3 category">
                <a className="action" href="#">
                  <p className="title">Art & culture</p>
                  <img
                    className="icon" src={'/assets/images/icons/icon-culture.png'} />
                </a>
              </li>
              <li className="col-xs-3 category">
                <a className="action" href="#">
                  <p className="title">Human spirit</p>
                  <img
                    className="icon" src={'/assets/images/icons/icon-human-spirit.png'} />
                </a>
              </li>
              <li className="col-xs-3 category">
                <a className="action" href="#">
                  <p className="title">diy</p>
                  <img
                    className="icon" src={'/assets/images/icons/icon-DIY.png'} />
                </a>
              </li>
            </ul>

            <div className="col-xs-12">

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
};

CommunityPerspectives.propTypes = {
  showCallToAction: PropTypes.bool,
  showSliderBorder: PropTypes.bool,
  showArrows: PropTypes.bool,
};

export default CommunityPerspectives;
