class EditPagesMultiselect{
  constructor(){
    this.dropdownContent = $('.pages-select-multi ul.dropdown-content');
    this.noneOptions = this.dropdownContent.find('li:first-child');
    this.pageOptions = this.dropdownContent.find('li:not(:first-child)');

    this.uncheckSelectedWhenNoneChecked();
    this.uncheckNoneWhenOptionChecked();
  }

  uncheckSelectedWhenNoneChecked() {
    $(this.noneOptions).bind('click.noneOption', (event) => {
      $(this.pageOptions).unbind('click.pageOption');
      $(event.currentTarget).siblings('li.active').each((i, el) => {
        el.click();
      });
      this.uncheckNoneWhenOptionChecked();
    });
  }

  uncheckNoneWhenOptionChecked(){
    $(this.pageOptions).bind('click.pageOption', (event) => {
      var noneOption = $(event.currentTarget).siblings().first();
      if ($(noneOption).hasClass('active')) {
        $(this.noneOptions).unbind('click.noneOption');
        $(noneOption).click();
        this.uncheckSelectedWhenNoneChecked();
      }
      if(!this.dropdownContent.find('li.active').length) {
        $(this.noneOptions).bind('click.noneOption');
        $(noneOption).click();
      }
    });
  }
}

new EditPagesMultiselect();
