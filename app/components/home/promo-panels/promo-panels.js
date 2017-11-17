import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import PromoPanel from './promo-panel';
import promoPanelStyles from './promo-panels.style';

/********************************************************************
* Class: PromoPanels
* Description: Promotional and Informational Panels on the homepage
********************************************************************/
class PromoPanels extends Component {
  static defaultProps = {
    promosList: []
  };

  state = {
    currentIndex: this.props.promosList.length - 1,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.promosList.length !== nextProps.promosList.length) {
      this.setState({
        currentIndex: nextProps.promosList.length - 1,
      });
    }
  }

  beforeSlideChange = (prevIndex, currentIndex) => {
    this.setState({
      currentIndex,
    });
  }

  changeSlide = (promo) => {
    this.slider.slickGoTo(promo.promoIndex);
    this.setState({
      currentIndex: promo.promoIndex,
    });
  }

  render() {
    const {
      promosList
    } = this.props;

    const { currentIndex } = this.state;

    const mainPromosSliderSettings = {
      arrows: true,
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoading: true,
      initialSlide: currentIndex,
      adaptiveHeight: false,
      beforeChange: this.beforeSlideChange,
    };

    const promos = promosList.map(
      promoInfo => <div key={promoInfo.promoId}>
        <PromoPanel
          {...promoInfo}
          isActive={promoInfo.promoIndex === currentIndex}
        />
      </div>
    );

    return (
      <div className="shared-container promo-panels-container">
        {promosList.length > 0 && <div className="shared-slider-container">
          <Slider
            {...mainPromosSliderSettings}
            ref={c => this.slider = c}
          >
            {promos}
          </Slider>
        </div>}
      </div>
    );
  }
}

PromoPanels.propTypes = {
  promoHeading: PropTypes.string,
  promosList: PropTypes.array.isRequired,
};

export default PromoPanels;
