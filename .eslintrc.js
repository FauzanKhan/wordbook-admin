module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 7,
    },
    "rules": {
        "react/jsx-filename-extension": 0,
        "react/sort-comp": 0,
        "object-curly-newline": 0,
        "jsx-a11y/media-has-caption": 0,
        "react/require-default-props": 0,
    },
    "env": {
        "browser": true,
        "node": true,
        "jest": true,
    }
};