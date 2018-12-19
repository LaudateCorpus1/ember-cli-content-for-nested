'use strict';

function contentForNested(type, config, content, contentFor) {
  let isDummyApp = this.project.pkg.name === this.name;

  // This also works.
  // let isDummyApp = this.project.pkg.name !== this.app.name;

  // Dummy apps are special snowflakes, and they share
  // the same package.json as the addon. This means that the
  // addon's dependencies are also the dummy app's direct dependencies.
  // Therefore, this workaround would cause double content
  // for the dummy app.
  if (isDummyApp) {
    return;
  }

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
