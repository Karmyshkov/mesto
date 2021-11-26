export default class Section {

  constructor({renderer}, sectionContainer) {
    this._renderer = renderer;
    this.container = sectionContainer;
  }

  renderer(item) {
    this._renderer(item);
  }

  addItem(item) {
    this.container.prepend(item);
  }
}
