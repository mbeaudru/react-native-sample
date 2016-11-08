module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "jest": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-native"
    ],
    "extends": ["eslint:recommended", "plugin:react/recommended", "airbnb", "react-native"],
    "parser": "babel-eslint",
    "rules": {
        "react/require-extension": "off", // https://github.com/AtomLinter/linter-eslint/issues/579#issuecomment-239143599
        "react/no-unused-prop-types": [1, { skipShapeProps: true }],
        "import/no-namespace": 0,
        "react-native/no-inline-styles": 1,
        "react-native/no-unused-styles": 1,
        "react-native/no-color-literals": 1,
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "class-methods-use-this": 0,
        "indent": [2, 2, {"SwitchCase": 1}],
        "linebreak-style": [
          "error",
          "windows"
        ],
        "semi": [
            "error",
            "always"
        ],
        "max-len": ["error", 80, 2],
        "no-use-before-define": 0,
        "jsx-quotes": 1,
        "no-unused-vars": 1,
        "import/extensions": 1,
        "import/no-extraneous-dependencies": 0,
        "import/no-unresolved": 0,
        "comma-dangle": 0,
        "no-underscore-dangle": ["error", { "allow": ["_id", "_rev"] }],
        "import/imports-first": 0,
        "react/prefer-stateless-function": 1,
        "react/sort-comp": [2, {
            order: [
                'render',
                'static-methods',
                'lifecycle',
                'everything-else'
            ],
            groups: {
                lifecycle: [
                    'displayName',
                    'propTypes',
                    'contextTypes',
                    'childContextTypes',
                    'mixins',
                    'statics',
                    'defaultProps',
                    'constructor',
                    'getDefaultProps',
                    'getInitialState',
                    'state',
                    'getChildContext',
                    'componentWillMount',
                    'componentDidMount',
                    'componentWillReceiveProps',
                    'shouldComponentUpdate',
                    'componentWillUpdate',
                    'componentDidUpdate',
                    'componentWillUnmount'
                ]
            }
        }]
    }
};
