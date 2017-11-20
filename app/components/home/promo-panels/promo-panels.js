import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import PromoPanel from './promo-panel';
import { white, darkBlueGray } from '../../../styles/variables/colors';

/********************************************************************
* Class: PromoPanels
* Description: Promotional and Informational Panels on the homepage
********************************************************************/
class PromoPanels extends Component {
  static defaultProps = {
    promoArray: []
  };

  state = {
    currentIndex: 0,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.promoArray.length !== nextProps.promoArray.length) {
      this.setState({
        currentIndex: nextProps.promoArray.length - 1,
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
      promoArray
    } = this.props;

    const { currentIndex } = this.state;

    function CustomNextArrow(props) {
      const {className, style, onClick} = props
      return (
        <div
          style={inlineStyle_promoSlider_nextArrow}
          onClick={onClick}
          >
          <img src="../../../assets/icons/arrow_right.png"/>
        </div>
      );
    }

    function CustomPrevArrow(props) {
      const {className, style, onClick} = props
      return (
        <div
          style={inlineStyle_promoSlider_prevArrow}
          onClick={onClick}
          >
          <img src="../../../assets/icons/arrow_left.png"/>
        </div>
      );
    }

    const inlineStyle_promoSlider_prevArrow = {
      position: 'absolute',
      top: '50%',
      marginLeft: '15%',
      zIndex: '9999',
      cursor: 'pointer',
    };

    const inlineStyle_promoSlider_nextArrow = {
      right: '0px',
      marginRight: '15%',
      textAlign: 'right',
      position: 'absolute',
      top: '50%',
      zIndex: '9999',
      cursor: 'pointer',
    };

    const mainPromosSliderSettings = {
      arrows: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoading: true,
      initialSlide: currentIndex,
      adaptiveHeight: false,
      beforeChange: this.beforeSlideChange,
      nextArrow: <CustomNextArrow />,
      prevArrow: <CustomPrevArrow />,
    };

    const promos = promoArray.map(
      promoInfo => <div key={promoInfo.promoId}>
        <PromoPanel
          {...promoInfo}
          isActive={promoInfo.promoIndex === currentIndex}
        />
      </div>
    );

    return (
      <div className="shared-container">
        {promoArray.length > 0 && <div className="shared-slider-container">
          <Slider
            {...mainPromosSliderSettings}
            ref={c => this.slider = c}
          >
            {promos}
          </Slider>
        </div>}

        <style jsx>{`
          .shared-container {
            background-color: #2d3949;
            color: ${white};
            margin-bottom: 0px;
            min-height: 630px;
          }
          @media(max-width:640px){

          .shared-container{padding:25px 30px}

          }

          .empty {
            text-align: center;
          }

          .shared-slider-container {

          }

          .header {
            margin-bottom: 25px;
            text-align: center;
            font-size: 0.8rem;
          }

          .heading {
            font-size: 2.5rem;
          }

          .subheading {
            text-transform: uppercase;
            font-weight: bold;
            font-size: 1.25rem;
          }

          .shared-container :global(.slick-slider) {
            height: 50%;
          }
        `}</style>

        <style global>
          {`

            .shared-container .slick-prev {
              z-index: 99999;
            }

            .shared-container .slick-next {
              z-index: 99999;
            }

            .shared-container .slick-prev,
            .shared-container .slick-next {
              color: ${white};
              font-size: 15px;
              width: 100px;
              height: 75px;
              padding-top: 100px;
              padding-bottom: 10px;
              text-align: middle;
            }

            .shared-container .slick-prev.slick-disabled,
            .shared-container .slick-next.slick-disabled {
              opacity: .25;
            }

            .shared-container .slick-prev:before {
              font-family: FontAwesome;
              font-style: normal;
              content: "\\f060";
              font-size: 40px;
              position: absolute;
              left: 25px;
              top: 40px;
            }

            .shared-container .slick-next:before {
              font-family: FontAwesome;
              font-style: normal;
              content: "\\f061";
              font-size: 40px;
              right: 30px;
              position: absolute;
              top: 40px;
            }
            @media(max-width:736px){
                      .shared-container .slick-prev,  .shared-container .slick-next{padding:0px; height:auto; text-indent:-9999999px}
                      .shared-container .slick-prev {left:-45px}
                      .shared-container .slick-next {right:-51px}
                      .shared-container .slick-prev:before,
                      .shared-container .slick-next:before {text-indent:0px; font-size:20px !important}
            }
          `}
        </style>
      </div>
    );
  }
}

PromoPanels.propTypes = {
  promoHeading: PropTypes.string,
  promoArray: PropTypes.array.isRequired,
};

export default PromoPanels;
