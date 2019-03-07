module.exports = {
  plugins: {
    // No manual vendor prefixes anymore
    autoprefixer: {
      grid: true,

      // TODO: set an actual strategy
      // https://github.com/browserslist/browserslist
      browsers: ['last 2 versions', '> 1%', 'ie 6-8'],
    },

    // A modular CSS minifier
    cssnano: {},

    //---- CSS superpowers -----//
    // https://github.com/seaneking/rucksack
    'rucksack-css': {},

    // Allows you to use future CSS features today
    'postcss-preset-env': {},
  },
};
