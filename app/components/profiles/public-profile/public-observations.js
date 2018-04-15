import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { bindActionCreators } from 'redux';
import { getSharedMemberPhotos } from '../../../modules/get-shared-member-photos/actions';
import PublicObservationItem from './public-observation-item';
import '../../common/community-perspectives/slick.min.css';
import '../../common/community-perspectives/slick-theme.min.css';
import { black } from '../../../styles/variables/colors';
// import { secondaryFont } from '../../styles/variables/fonts';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const mapStateToProps = ({
  sharedMemberPhotos,
}) => ({
  sharedMemberPhotos,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getSharedMemberPhotos,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class PublicObservations extends Component {
  static defaultProps = {
    sharedMemberPhotos: {
      imageList: [],
    },
  }

  static propTypes = {
    actions: shape({
      getSharedMemberPhotos: func.isRequired,
    }),
    sharedMemberPhotos: shape({}),
    cid: string.isRequired,
  }

  state = {
    currentIndex: this.props.sharedMemberPhotos.imageList.length - 1,
  }

  constructor(props) {
    super(props)

    props.actions.getSharedMemberPhotos({
      customerId: props.cid,
      orderByLikes: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sharedMemberPhotos.imageList.length !== nextProps.sharedMemberPhotos.imageList.length) {
      this.setState({
        currentIndex: nextProps.sharedMemberPhotos.imageList.length - 1,
      });
    }
  }

  beforeSlideChange = (prevIndex, currentIndex) => {
    this.setState({
      currentIndex,
    });
  }

  changeSlide = (image) => {
    this.slider.slickGoTo(image.imageIndex);
    this.setState({
      currentIndex: image.imageIndex,
    });

  }

  render() {
    const {
      sharedMemberPhotos: {
        imageList,
      },
    } = this.props;

    const { currentIndex } = this.state;

    const mainPicturesSliderSettings = {
      arrows: true,
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoading: true,
      initialSlide: currentIndex,
      adaptiveHeight: false,
      beforeChange: this.beforeSlideChange,
      // nextArrow: <div>Next<i className="fa fa-arrow-right" /></div>,
      // prevArrow: <div><i className="fa fa-arrow-left" /><div>Previous</div></div>,
    };

    const images = imageList.map(imageInfo =>
      (<div key={imageInfo.customerImageId}>
        <PublicObservationItem
          customerImageId={imageInfo.customerImageId}
          isActive={imageInfo.imageIndex === currentIndex}
        />
      </div>));

    return (
      <div className="observation-container">
        <h4 className="title">Recent Observations</h4>
        {imageList.length === 0 && <div className="empty">There are no shared images.</div>}
        {imageList.length > 0 && <div className="observation-slider-container">
          <Slider
            {...mainPicturesSliderSettings}
            ref={c => this.slider = c}
          >
            {images}
          </Slider>
        </div>}

        <style jsx>{`
          .observation-container {
            padding: 25px 50px;
            color: ${black};
            margin-bottom: 0px;
            background: #e2e1e0;
          }

          :not(:global(.pulse-post-extras)) .observation-container {
            min-height: 500px;
          }
            @media(max-width:640px){

            .observation-container{padding:25px 30px}

            }

          .empty {
            padding: 50px;
            text-align: center;
          }

          .observation-slider-container {
            position: relative;
            z-index: 999;
            min-height: 400px;
            padding-bottom: 20px;
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

          .observation-container :global(.slick-slider) {
            height: 50%;
          }

          .title {
            padding-bottom: 15px;
          }

        `}
        </style>

        <style jsx global>
          {`


            .observation-container .slick-prev {
              z-index: 99999;
            }

            .observation-container .slick-prev,
            .observation-container .slick-next {
              color: ${black};
              font-size: 15px;
              width: 100px;
              height: 75px;
              padding-top: 100px;
              padding-bottom: 10px;
              text-align: center;
            }

            .observation-container .slick-prev.slick-disabled,
            .observation-container .slick-next.slick-disabled {
              opacity: .25;
            }

            .observation-container .slick-prev:before {
              font-family: FontAwesome;
              font-style: normal;
              content: "\\f060";
              font-size: 40px;
              position: absolute;
              left: 25px;
              top: 40px;
            }

            .observation-container .slick-next:before {
              font-family: FontAwesome;
              font-style: normal;
              content: "\\f061";
              font-size: 40px;
              right: 30px;
              position: absolute;
              top: 40px;
            }
            @media(max-width:850px){
              .observation-container .slick-prev,  .observation-container .slick-next{padding:0px; height:auto; text-indent:-9999999px}
              .observation-container .slick-prev {left:-45px}
              .observation-container .slick-next {right:-51px}
              .observation-container .slick-prev:before,
              .observation-container .slick-next:before {text-indent:0px; font-size:20px !important}

            }

          `}
        </style>
      </div>);
  }
}

export default PublicObservations;
