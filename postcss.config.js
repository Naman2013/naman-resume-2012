module.exports = {
  plugins: {
    // No manual vendor prefixes anymore
    autoprefixer: {
      grid: true,

      // TODO: set an actual strategy
      // https://github.com/browserslist/browserslist
      browsers: ['last 2 versions'],
    },

    // A modular CSS minifier
    cssnano: {},
  },
};
