export default class Section {

  constructor ({items, renderer}, sectionContainer) {
    this.items = items;
    this._renderer = renderer;
    this.container = sectionContainer;
  }

  renderer () {
    this._renderer(this.items);
  }

  addItem (item) {
    this.container.prepend(item);
  }
}
