import { Controller } from "@hotwired/stimulus";
import Quill from 'quill';
export default class extends Controller {
  static values = { id: Number };
  initialize () {
    console.log('#initialize', this.element);
    this.quill = new Quill(this.element, {
      theme: 'snow',
      debug: 'info',
      placeholder: 'Compose an epic...',
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      }
    });
    // how do you handle not saving if no changes?
    
    this.setInterval();
  }

  connect () {
    console.log('#connect', this.element);
  }

  disconnect () {
    console.log('#disconnect', this.element);
  }

  save () {
    let content = this.quill.root.innerHTML;
    console.log(JSON.stringify(content));  
  }

  clearInterval () {
    clearInterval(this.interval);
  }

  setInterval () {
    this.interval = setInterval(() => {
      this.save();
    }, 5000);
  }
  
}
