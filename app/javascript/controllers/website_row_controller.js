import {Controller} from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['button'];

  change (event) {
    this.buttonTarget.style = "color: red;";
    console.log('changeButtonState', event, this.buttonTarget);
  }

  connect () {
    console.log('Hello, Stimulus!', this.element);
  }
}
