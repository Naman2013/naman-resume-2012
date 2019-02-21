const path = require('path');

module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "import/prefer-default-export": 0,
    'no-use-before-define': ['error', { 'functions': false, 'classes': true }],
    'react/prefer-stateless-function': ['off'],
  },
  "globals": {
    "test": true,
    "it": true,
    "expect": true,
    "window": true,
    "EventSource": true,
    "describe": true,
    "body": true,
    "browser": true,
    "jest": true
  },
  'settings': {
    'import/extensions': ['.js', '.jsx'],
    'import/parser': 'babel-eslint',
    'import/resolver': {
      // You can use only webpack but with this approach webstorm doesn't show
      // any red highlight for alias imports
      // If you forget to add alias here build still will work if there are aliases in
      // webpack.config but with this webstorm works better.
      // eslint-import-resolver-alias
      'alias': [
        ['app', path.join(__dirname, 'app/')],
      ],
      'webpack': {
        'config': path.join(__dirname, 'webpack.config.js')
      }
    }
  },
  plugins: [
    'import'
  ]
};
