import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './community-perspectives.scss';
import Slider from 'react-slick';
import Spacer from './../../common/spacer';

import './slick.min.css';
import './slick-theme.min.css';


class CommunityPerspectives extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  };


  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1
    };

    return(
      <div className="telescope-block community-perspectives">
        <div className="top">
          <div className="row">
          <div className="col-xs-12 ">
            <h3>Community Perspectives</h3>
            <p>Learn more about this object through the various lenses of science, culture, and spirituality.</p>
          </div>
          </div>
        </div>
        <div className="content">
          <div className="row">
            <div className="col-xs-12 category">
              <div className="col-xs-3">
                <p>SCIENCE LOG</p>
                <img src={'/assets/images/icons/icon-science-active.png'} />
              </div>
              <div className="col-xs-3">
                <p>ART & CULTURE</p>
                <img src={'/assets/images/icons/icon-culture.png'} />
              </div>
              <div className="col-xs-3">
                <p>HUMAN SPIRIT</p>
                <img src={'/assets/images/icons/icon-human-spirit.png'} />
              </div>
              <div className="col-xs-3">
                <p>DIY</p>
                <img src={'/assets/images/icons/icon-DIY.png'} />
              </div>
            </div>
            <div className="col-xs-12">
              <Slider {...settings} className="slide">
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
                    <p className="desc">approximately 220,000 light years across, it is the largest galaxy of the Local Group, which also contains the Milky Way, the Triangulum Galaxy, and about 44 other smaller galaxies.
  The light you see has taken 2 million years to get to the earth!</p>
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
                    <p className="desc">approximately 220,000 light years across, it is the largest galaxy of the Local Group, which also contains the Milky Way, the Triangulum Galaxy, and about 44 other smaller galaxies.
  The light you see has taken 2 million years to get to the earth!</p>
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
                    <p className="desc">approximately 220,000 light years across, it is the largest galaxy of the Local Group, which also contains the Milky Way, the Triangulum Galaxy, and about 44 other smaller galaxies.
  The light you see has taken 2 million years to get to the earth!</p>
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
                    <p className="desc">approximately 220,000 light years across, it is the largest galaxy of the Local Group, which also contains the Milky Way, the Triangulum Galaxy, and about 44 other smaller galaxies.
  The light you see has taken 2 million years to get to the earth!</p>
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
                    <p className="desc">approximately 220,000 light years across, it is the largest galaxy of the Local Group, which also contains the Milky Way, the Triangulum Galaxy, and about 44 other smaller galaxies.
  The light you see has taken 2 million years to get to the earth!</p>
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
                    <p className="desc">approximately 220,000 light years across, it is the largest galaxy of the Local Group, which also contains the Milky Way, the Triangulum Galaxy, and about 44 other smaller galaxies.
  The light you see has taken 2 million years to get to the earth!</p>
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
                    <p className="desc">approximately 220,000 light years across, it is the largest galaxy of the Local Group, which also contains the Milky Way, the Triangulum Galaxy, and about 44 other smaller galaxies.
  The light you see has taken 2 million years to get to the earth!</p>
                  </div>
                </div>

              </Slider>
            </div>
            <div className="col-xs-12">
              <Spacer height="20px" />
              <button className="btn">Contribute Content</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommunityPerspectives;
