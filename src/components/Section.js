export default class Section {

  constructor ({items, renderer}, sectionContainer) {
    this.items = items;
    this._renderer = renderer;
    this.container = sectionContainer;
  }

  renderer () {
    this.items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem (item) {
    this.container.prepend(item);
  }
}
