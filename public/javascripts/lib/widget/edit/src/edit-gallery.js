class EditGallery extends EditDraggable {
  constructor(selectors){
    super();
    this.selectors = selectors;
    this.validatePhotoValues();
    this.photoFields = this.topModal.find('.photo-field');
    this.photoPreview = this.topModal.find('.photo-gallery-preview');
    this.buttonCheckboxes = this.topModal.find('.form-field-button_displayed :checkbox');
    this.thirdPartyCheckboxes = this.topModal.find('.form-field-third_party_enable :checkbox');
    this.maxPhotos = this.photoFields.length;

    this.renderPreview();

    this.checkboxToggles();

    this.photoFields.on('change', (e)=>{
      this.renderPreview();
    });

    $(window).one('close-modal', this.removePhotoListeners());
  }

  renderPreview(){
    this.draggableContainer().html('');
    this.photoFields.each((idx, elem)=>{
      this.initPhoto(idx, elem);
    });
  }

  removePhotoListeners() {
    this.topModal.find('.photo[draggable=true]').each((idx, elem) => {
      $(elem).off('click');
      $(elem).find('.fa-remove').off('click')
      this.removeDraggable(elem);
    });
  }


  initPhoto(idx, elem){
    let jsonData = this.getPhotoData($(elem), idx);
    let photo = '';
    if (jsonData['url'].length){
      photo = this.initPhotoThumbnail(jsonData, idx);
    } else {
      photo = this.initPhotoPlaceholder(jsonData, idx);
    }
    this.photoPreview.append(photo);
  }

  initPhotoThumbnail(jsonData, idx){
    let photo = this.topWindow.$("<div class='photo photo-real' draggable='true' data-index='"+(idx+1)+"'></div>");
    let img = `<img src="${jsonData['url']}">`;
    let remove = "<i class='fa fa-remove'></i>";

    photo.html(img + remove);
    photo.data('photo', jsonData);

    setTimeout(()=>{
      this.initPhotoClick(photo);
      this.initPhotoRemove(photo);
      this.makeDraggable(photo);
    }, 0);

    return photo;
  }

  initPhotoPlaceholder(jsonData, idx){
    let photo = this.topWindow.$("<div class='photo photo-placeholder' data-index='"+(idx+1)+"'><i class='fa fa-plus'></i></div>");
    photo.data('photo', jsonData);
    this.initPhotoClick(photo);
    return photo;
  }

  initPhotoClick(photo){
    photo.on('click', (e)=>{
      let idx = $(e.currentTarget).data('index');
      let field = this.topModal.find('.photo-field-'+idx);
      this.topModal.animate({scrollTop: field.position().top}, 200);
      return false;
    });
  }

  initPhotoRemove(photo){
    photo.find('.fa-remove').on('click', (e)=>{
      let parent = $(e.currentTarget).parent('.photo');
      let idx = parent.data('index');
      let field = this.topModal.find('.photo-field-'+idx);
      field.find('.form-field input[type=text]').each((i, elem)=>{
        $(elem).val('');
        $(elem).trigger('change');
      });
      this.renderPreview();
      return false;
    });
  }

  draggableContainer(){
    return this.topModal.find('.photo-gallery-preview');
  }

  draggableClass(){
    return '.photo';
  }

  draggableData(){
    return this.dragElem.data('photo');
  }

  draggableObjects(){
    return this.topModal.find('.photo-real');
  }

  afterDragDrop(){
    this.importGalleryJson(this.getGalleryJson());
    this.photoCheckboxOptionsOnLoad(this.buttonCheckboxes);
    this.photoCheckboxOptionsOnLoad(this.thirdPartyCheckboxes);
  }

  getGalleryJson(){
    return $.map(this.topModal.find('.photo'), (elem, idx)=>{
      return $(elem).data('photo');
    });
  }

  importGalleryJson(json){
    var photoVals = this.photoValues();
    var importData = (typeof json === 'string') ? JSON.parse(json) : json;
    this.photoFields.each((idx, elem)=>{
      let fields = $(elem);
      let imported = importData[idx];
      this.resetFields(fields);
      for (let key of Object.keys(photoVals)){
        this.setValueOrEmpty(fields, photoVals[key], idx, imported[key]);
      }
    });
    this.renderPreview();
  }

  getValueOrEmpty(fields, photoSetting, idx){
    let { name, type } = this.getSettingNameAndType(photoSetting, idx);
    let field = this.getFormField(fields, name, type);
    if (type === 'checkbox'){
      return field.length ? field.prop('checked') : false;
    } else {
      return field.length ? field.val() : "";
    }
  }

  setValueOrEmpty(fields, photoSetting, idx, val){
    let { name, type } = this.getSettingNameAndType(photoSetting, idx);
    let field = this.getFormField(fields, name, type);
    if (field.length){
      if (type === 'ckeditor') {
        let ckeditorId = field.attr('id');
        let editor = this.topWindow.CKEDITOR.instances[ckeditorId];
        editor ?  editor.setData(val) : field.val(val);
      } else if (type === "checkbox") {
        field.prop("checked", val);
      } else {
        field.val(val);
      }
    }
  }

  resetFields(fields){
    fields.find('input[type=text], textarea').val("");
    fields.find('input[type=checkbox]').prop("checked", false);
  }

  getFormField(fields, name, type){
    switch(type){
      case 'ckeditor':
      case 'textarea':
        return fields.find(`.form-field-${name} textarea`);
      case 'checkbox':
        return fields.find(`.form-field-${name} input[type=checkbox]`);
      case 'radio':
        return fields.find(`.form-field-${name} input[type=radio]:checked`);
      default:
        return fields.find(`.form-field-${name} input[type=text]`);
    }
  }

  getSettingNameAndType(photoSetting, idx){
    return {
      name: photoSetting['name'].replace('X', (idx+1)).replace(/_/g, '-'),
      type: photoSetting['type']
    };
  }

  getPhotoData(fields, idx) {
    let data = {};
    let photoVals = this.photoValues();
    for (let key of Object.keys(photoVals)){
      data[key] = this.getValueOrEmpty(fields, photoVals[key], idx);
    }
    return data;
  }

  validatePhotoValues(){
    if (!this.photoValues()['url']){
      throw new Error("url must be defined in photoValue");
    }
  }

  photoValues(){
    // override in subclass
    throw new Error("photoValues not defined");
  }

  // Photo Checkbox Toggles

  checkboxToggles() {
    this.photoToggles(this.buttonCheckboxes);
    this.photoToggles(this.thirdPartyCheckboxes);
  }

  photoToggles(photoCheckboxes) {
    this.photoCheckboxOptionsOnLoad(photoCheckboxes);

    setTimeout(() => {
      this.photoCheckboxOptionsListener(photoCheckboxes);
    }, 0);
  }

  photoCheckboxOptionsOnLoad(photoCheckboxes) {
    photoCheckboxes.each((idx, elem) => {
      this.photoCheckboxOptionsToggle(elem);
    });
  }

  photoCheckboxOptionsListener(photoCheckboxes) {
    photoCheckboxes.change(event => {
      this.photoCheckboxOptionsToggle(event.target);
    });
  }

  photoCheckboxOptionsToggle(fotoCheckbox) {
    let photoCheckbox = $(fotoCheckbox),
        photoCheckboxIsChecked = photoCheckbox.is(':checked'),
        photoCheckboxFormField = photoCheckbox.closest(".form-field.check-field"),
        photoOptions = photoCheckboxFormField.next();
    photoOptions.toggle(photoCheckboxIsChecked);
  }

}
