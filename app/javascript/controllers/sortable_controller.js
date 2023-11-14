import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = [
    'list',
    'toggle',
    'content',
    'scroll'
  ];

  static values = {
    disabled: {
                type   : Boolean,
                default: false
              }
  };

  connect () {
    console.log('#connect', this);
  }
  initialize () {
    console.log('#initialize', this, Sortable);
    this.sortable = new Sortable(this.listTarget, {
      animation : 150,
      disabled  : this.disabledValue,
      ghostClass: 'ghost-blue',
      draggable : '.sortable-list-item',
      onUpdate  : function (event) {this.onUpdate(event);}.bind(this),
    });
    this.toggleTarget.checked = this.disabledValue;
  }

  onUpdate (event) {
    if (event) console.log('#onUpdate', event, this);
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
    widget.id = generateFiveDigitNumber();
    widget.name = `${widget.id}`;
    const markup = `
      <li class="sortable-list-item" data-sortable-id="${widget.id}">
        <span class="sortable-handle">☰</span>
        <a data-action="click->sortable#edit" class="flex-grow sortable-open">${widget.name}</a>
        <button class="btn circle" data-action="click->sortable#remove" data-sortable-target="removeButton">♺</button>
      </li>
    `;
    this.listTarget.insertAdjacentHTML('beforeend', markup);
    this.scroll();
    this.onUpdate();
  }

  findParent (event, selector) {
    return event.target.closest(selector);
  }

  remove (event) {
    const parent = this.findParent(event, '.sortable-list-item');
    parent.classList.add('hidden');
    parent.addEventListener('transitionend', () => {
      parent.remove();
    }, { once: true });
    this.onUpdate();
  }

  disabledValueChanged () {
    this.contentTarget.classList.toggle('disabled', this.disabledValue);
    this.sortable.option('disabled', this.disabledValue);
  }

  toggle (event) {
    this.disabledValue = event.target.checked;;
  }

  scroll () {
    this.scrollTarget.scrollTo({
      top: this.scrollTarget.scrollHeight,
      behavior: 'smooth'
    });
  }

  edit (event) {
    console.log('#edit', event, this);
    // 
  }
}

function generateFiveDigitNumber() {
  return Math.floor(Math.random() * 90000) + 10000;
}