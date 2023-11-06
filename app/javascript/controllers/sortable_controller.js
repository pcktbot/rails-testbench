import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['list'];

  initialize () {
    this.sortable = new Sortable(this.listTarget, {
      animation: 150,
      ghostClass: 'ghost-blue',
      draggable: '.sortable-list-item',
      onUpdate: function (event) {
        this.onUpdate(event);
      }.bind(this)
    });
  }

  onUpdate (event) {
    if (event) console.log('#onUpdate', event, this);
    console.log('#onUpdate', {
      current_list: this.currentList(),
      current_length: this.currentLength(),
      current_ids: this.currentIds()
    });
  }

  currentList () {
    return this.listTarget.querySelectorAll('.sortable-list-item');
  }

  currentLength () {
    return this.currentList().length;
  }

  currentIds () {
    return Array.from(this.currentList()).map((item) => parseInt(item.dataset.sortableId)); 
  }

  add (widget) {
    // api request
    widget.name = 'Content Stripe';
    widget.id = generateFiveDigitNumber();
    const markup = `
    <li class="sortable-list-item" data-sortable-id="${widget.id}">
      <span class="sortable-handle">☰</span>
      <a data-action="click->sortable#edit" class="flex-grow sortable-open">${widget.name}</a>
      <button class="btn circle" data-action="click->sortable#remove" data-sortable-target="removeButton">♺</button>
    </li>
    `;
    this.listTarget.insertAdjacentHTML('beforeend', markup);
    this.onUpdate();
  }

  remove (event) {
    // find parent by css selector
    const parent = event.target.closest('.sortable-list-item');
    parent.classList.add('hidden');
    parent.addEventListener('transitionend', () => {
      parent.remove();
    }, { once: true });
    this.onUpdate();
  }

  edit (event) {
    console.log('#edit', event, this);
    // 
  }
}

function generateFiveDigitNumber() {
  return Math.floor(Math.random() * 90000) + 10000;
}