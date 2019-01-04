'use strict';

function contentForNested(type, config, _content, contentFor) {
  let _contentFor = (func, context) => {
    let retVal;
    if (func) {
      retVal = func.call(context, type, config, _content);
    }
    return retVal || '';
  };

  let content = '';

  let isDummyApp = this.project.isEmberCLIAddon();

  // These also work.
  // let isDummyApp = this.project.pkg.name === this.name;
  // let isDummyApp = this.project.pkg.name !== this.app.name;

  // Dummy apps are special snowflakes, and they share
  // the same package.json as the addon. This means that the
  // addon's dependencies are also the dummy app's direct dependencies.
  // Therefore, this workaround would cause double content
  // for the dummy app.
  if (!isDummyApp) {
    content = this.addons.reduce((content, addon) => {
      return content += _contentFor(addon.contentFor, addon);
    }, content);
  }

  return content + _contentFor(contentFor, this);
}

module.exports = contentForNested;
