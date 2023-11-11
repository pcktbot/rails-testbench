import { Controller } from "@hotwired/stimulus";
import Quill from 'quill';

export default class extends Controller {
  initialize () {
    console.log('#initialize', this);
    console.log('quill', Quill);
    this.quill = new Quill(this.element, {
      theme: 'snow'
    });
  }
}
