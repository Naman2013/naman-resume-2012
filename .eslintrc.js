const path = require('path');

module.exports = {
  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
    'prettier/react',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 0,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'linebreak-style': 0,
    curly: ['error'],
    'prefer-const': 0,
    'react/require-default-props': 0,
    'spaced-comment': 0,
    'padded-blocks': 0,
    'import/imports-first': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'comma-dangle': 0,
    'no-shadow': 0,
    'arrow-body-style': 0,
    'quote-props': 0,
    'no-unused-vars': 1,
    'consistent-return': 0,
    'max-len': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-use-before-define': ['error', { functions: false, classes: true }],
    'no-underscore-dangle': 'off',
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': ['warn', { aspects: ['invalidHref'] }],
    'jsx-a11y/label-has-associated-control': 'off',
    'react/prefer-stateless-function': ['off'],
    'react/jsx-filename-extension': ['off'],
    'react/forbid-prop-types': ['off'],
    'react/no-danger': 0,
    'react/prop-types': 0,
    'no-throw-literal': 'error',
    'no-bitwise': ['off'],
    'dot-notation': ['off'],
    'prettier/prettier': ['error'],
    camelcase: ['off'],
    'jsx-a11y/label-has-for': ['off'],
    'no-nested-ternary': 'off',
    'react/no-this-in-sfc': 'off',
    'no-param-reassign': 'off',
    'react/sort-comp': [
      1,
      {
        order: [
          'static-methods',
          'instance-variables',
          'lifecycle',
          '/^on.+$/',
          'everything-else',
          'rendering',
        ],
        groups: {
          rendering: ['/^render.+$/', 'render'],
        },
      },
    ],
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  globals: {
    global: true,
    cookieDomain: true,
    document: true,
    window: true,
    describe: true,
    context: true,
    it: true,
    beforeAll: true,
    afterAll: true,
    beforeEach: true,
    afterEach: true,
    expect: true,
    sinon: true,
    shallow: true,
    mount: true,
    render: true,
    jest: true,
    TAction: true,
    API_URL: true,
    test: true,
    EventSource: true,
    body: true,
    browser: true,
  },
  settings: {
    'import/extensions': ['.js', '.jsx'],
    'import/parser': 'babel-eslint',
    'import/resolver': {
      // You can use only webpack but with this approach webstorm doesn't show
      // any red highlight for alias imports
      // If you forget to add alias here build still will work if there are aliases in
      // webpack.config but with this webstorm works better.
      // eslint-import-resolver-alias
      alias: [
        ['app', path.join(__dirname, 'app/')],
        ['assets', path.join(__dirname, 'assets/')],
      ],
      // It also works but with alias there are no red highlight in webstorm
      // and with this approach build works but I still see red highlights in webstorm
      // eslint-import-resolver-webpack
      webpack: {
        config: path.join(__dirname, './webpack.config.js'),
      },
    },
  },
  plugins: ['@typescript-eslint', 'prettier', 'import', 'react-hooks'],
};
