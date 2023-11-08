class EditBlogTagSelector{
  constructor(){
    let theData = $('.modal form div.data');
    if (theData.length) {
      this.options = {
        "nae_url": theData.data('nae-url'),
        "location_urn": theData.data('location-urn'),
        "selected_blog_tags": theData.data('selected-blog-tags')
      };
      this.getPage();
      this.submitListen();
    }
  }

  getPage(){
    return $.ajax({
      url: `${this.options.nae_url}/locations/${this.options.location_urn}/tags.json`,
      dataType: 'json',
      success: (data) => {
        if (data !== null) {
          this.buildTagInputCheckboxes(data.tags, this.options);
        }
      },
      error: (xhr, status, error) => {
        $('.dynamic-select-multi').html(`<p>We are having problems retrieving tags from the NAE service.</p>`)
      }
    });
  }

  buildTagInputCheckboxes(tags, opts){
    let sel = $('.dynamic-select-multi select'),
        defaultChecked = opts.selected_blog_tags.length === 0 ? "selected" : "",
        defaultOptionMarkup = `<option ${defaultChecked} value="">Default / No Tags</option>`;
    sel.append($(defaultOptionMarkup));

    if (tags.length){
      $(tags).each((idx, e) => {
        let isChecked = opts.selected_blog_tags.includes(e.name) ? "selected" : "",
            checkboxMarkup = `<option ${isChecked} value="${e.name}">${e.name}</option>`;
        sel.append($(checkboxMarkup));
      });
      sel.material_select();
    }
  }

  submitListen(){
    let sel = $('.dynamic-select-multi');
    sel.on('focusout', ()=>{
      let hasActive = sel.find('ul li').filter(".active");
      if (hasActive.length < 1){
        sel.find('select option').first().prop("selected", "selected").attr("value", "");
        sel.find('select').material_select();  
      }
    })
  }
};

new EditBlogTagSelector();
