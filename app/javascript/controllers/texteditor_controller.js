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
    
    this.checkbox = document.querySelector('#toggle-auto-save');
    this.checkbox.addEventListener('change', (event) => {
      if (event.target.checked) {
        this.setInterval();
      } else {
        this.clearInterval();
      }
    });
    this.setInterval();
  }
  
  connect () {
    this.content = document.querySelector('#preload-html');
    console.log('#connect', this.element, this.content);
    this.quill.root.innerHTML = this.content.textContent;
  }

  disconnect () {
    console.log('#disconnect', this.element);
  }

  async save () {
    let content = this.quill.root.innerHTML;
    console.log('#save', JSON.stringify(content));  
    const res = await fetch(`/api/text_editor/${this.idValue}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
      },
      body: JSON.stringify({data: content}),
    });
    if (res.ok) this.clearInterval();
    const data = await res.json();
    console.log('#save', data);
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
