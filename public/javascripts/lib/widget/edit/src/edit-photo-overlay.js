class EditPhotoOverlay {
  constructor() {
    this.photoEditVariables();
    this.checkboxPhotoCases();
  }
  photoEditVariables() {
    this.topModal = window.top.$('.modal');
    this.photoFilterOptions = this.topModal.find(".photo-filter-options");
    this.photoOverlayCheckbox = this.topModal.find(".form-field-photo-filter :checkbox");
    this.mobilePhotoFilterOptions = this.topModal.find(".mobile-photo-filter-options");
    this.mobilePhotoOverlayCheckbox = this.topModal.find(".form-field-mobile-photo-filter :checkbox");
  }

  checkboxPhotoCases() {
    this.editGlobalJS = new WidgetEditGlobalJS();
    this.editGlobalJS.checkboxCases(this.photoOverlayCheckbox, this.photoFilterOptions);
    this.editGlobalJS.checkboxCases(this.mobilePhotoOverlayCheckbox, this.mobilePhotoFilterOptions);
  }
}

new EditPhotoOverlay();
