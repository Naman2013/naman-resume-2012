import PropTypes from 'prop-types';

const minProps = {
  selectedIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      thumbnailURL: PropTypes.string.isRequired,
    })
  ),
};

const enhancedProps = Object.assign(
  {
    title: PropTypes.string.isRequired,
  },
  minProps
);

export { minProps, enhancedProps };
