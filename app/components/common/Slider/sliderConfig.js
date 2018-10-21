
const DEFAULT_CONFIG = {
  arrows: true,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: false,
  draggable: false,
  lazyLoading: true,
  initialSlide: 0,
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

const getDefaultConfig = () => JSON.parse(JSON.stringify(DEFAULT_CONFIG)); // deepclone

export default getDefaultConfig;
