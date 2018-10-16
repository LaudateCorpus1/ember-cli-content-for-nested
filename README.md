# ember-cli-content-for-nested

[![npm version](https://badge.fury.io/js/ember-cli-content-for-nested.svg)](https://badge.fury.io/js/ember-cli-content-for-nested)

ember-cli nested addons contentFor workaround

## Usage

```js
// index.js
const contentForNested = require('ember-cli-content-for-nested');

module.exports = {
  contentFor: contentForNested,
  // or
  contentFor(type, { rootURL }) {
    return contentForNested.apply(this, [...arguments, () => {
      switch (type) {
        case 'head':
          return `<link rel="stylesheet" href="${rootURL}assets/normalize.css">`;
      }
    }]);
  }
};
```
