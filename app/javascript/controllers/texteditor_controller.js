import { Controller } from "@hotwired/stimulus";
import Quill from 'quill';
export default class extends Controller {
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
    
    setInterval(() => {
      let content = this.quill.root.innerHTML;
      console.log(JSON.stringify(content));
    }, 5000);
  }
}
