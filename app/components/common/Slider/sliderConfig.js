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
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        initialSlide: 0,
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: false,
        centerPadding: '50px',
      },
    },
    {
      breakpoint: 600,
      settings: {
        initialSlide: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        centerPadding: '50px',
      },
    },
  ],
};

const getDefaultConfig = () => JSON.parse(JSON.stringify(DEFAULT_CONFIG)); // deepclone

export default getDefaultConfig;
