import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Slider from 'react-slick';
import './gallery-widget.scss';


class TelescopeGalleryWidget extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {

    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return(
      <div className="gallery-widget telescope-details-widget">
        <div className="top">
          <div className="row">
          <div className="col-xs-12 ">
            <h3>Taken With This Telescope</h3>
            <p>Slooh Members Capture the Night Sky</p>
          </div>
          </div>
        </div>
        <div className="content">
          <div className="row">
            <div className="col-xs-12">
              <Slider {...settings} className="slide">
                <div className="item">
                  <img src={'assets/images/graphics/telescope-image1.jpg'} />
                  <div className="gallery-item-info">
                    <div className="personal-info">
                      <div className="clearfix">
                        <p className="name pull-left">Dave Eberly</p>
                        <p className="job pull-left">ASTRONOMER</p>
                      </div>
                      <p className="address">Chicago, IL, USA. Member since 2011</p>
                      <img src="assets/images/graphics/dave-photo.png" className="photo" />
                    </div>
                  </div>
                </div>
                <div className="item">
                  <img src={'assets/images/graphics/telescope-image2.jpg'} />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TelescopeGalleryWidget;
