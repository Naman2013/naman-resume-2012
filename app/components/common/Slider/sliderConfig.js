
const DEFAULT_CONFIG = {
  arrows: true,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  draggable: false,
  lazyLoading: true,
  initialSlide: 1,
  adaptiveHeight: false,
  // nextArrow: <div>Next<i className="fa fa-arrow-right" /></div>,
  // prevArrow: <div><i className="fa fa-arrow-left" /><div>Previous</div></div>,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ],
};

export default DEFAULT_CONFIG;
