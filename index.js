'use strict';

function contentForNested(type, config, content, contentFor) {
  let _contentFor = (func, context) => {
    let retVal;
    if (func) {
      retVal = func.call(context, type, config, content);
    }
    return retVal || '';
  };
  return this.addons.reduce((content, addon) => {
    return content += _contentFor(addon.contentFor, addon);
  }, '') + _contentFor(contentFor, this);
}

module.exports = contentForNested;
