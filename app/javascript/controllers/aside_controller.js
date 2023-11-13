import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  initialize() {
    console.log('#initialize', this.element);
    this.element.addEventListener('raulAsideClose', this.handleClose.bind(this));
    this.hoverEl = document.querySelector('.hover-detection');
    this.hoverEl.addEventListener('mouseover', this.handleMouseOver.bind(this));
  }

  handleClose(event) {
    console.log('#handleClose', event);
    this.element.active = false;
  }

  handleMouseOver(event) {
    setTimeout(() => {
      console.log('#handleMouseOver', event);
      this.element.active = true;
    }, 400);
  }
}