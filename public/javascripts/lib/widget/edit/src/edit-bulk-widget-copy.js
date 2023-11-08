class EditBulkWidgetCopy{
  constructor() {
    this.isBeta = window.location.href.includes('beta_cms');
    this.topWindow = window.top;
    this.topModal = this.topWindow.$(this.isBeta ? '#website-tools-frame' : '.modal');
    this.cmsDomain = window.location.origin;


    let configsViaHtml = JSON.parse($(`${this.isBeta ? "#website-tools-frame" : ".modal"} form #edit-config`).html());

    this.options = {
      "widgetId":              configsViaHtml.widgetId,
      "sourceClientUrn":       configsViaHtml.sourceClientUrn,
      "subImagePlaceholder":   configsViaHtml.subImagePlaceholder,
      "pageSpecificWidget":    configsViaHtml.pageSpecificWidget,
      "targetClientUrn": "",
      "targetWebsiteUrns": "",
      "targetPageNames": ""
    };

    this.getCurrentUser();
    this.getClients();
    this.placeholderImagesChange();
    this.clientChange();
    this.websiteChange();
    this.pagesChange();
    this.submitListen();
  }

  // Action Functions Below
  getCurrentUser(){
    return $.ajax({
      url: `${this.cmsDomain}/api/current_users`,
      dataType: 'json',
      success: (data) => {
        if (data.current_users.g5_user) {
          $('#exporter').show();
        }
      },
      error: (xhr, status, error) => {
        $('#exporter').html(`<p>We are unable to gather the data to export</p>`)
      }
    });
  }

  getClients(){
    return $.ajax({
      url: `${this.cmsDomain}/api/clients`,
      dataType: 'json',
      success: (data) => {
        if (data !== null) {
          this.buildClientsSelect(data.clients, this.options);
        }
      },
      error: (xhr, status, error) => {
        $('.client-select').html(`<p>We are having problems.</p>`)
      }
    });
  }

  placeholderImagesChange(){
    let placeholder = document.querySelectorAll('.placeholder-images input[type="checkbox"]')[0];
    placeholder.onchange = (event) => {
      this.options.subImagePlaceholder = event.target.checked;
    }
  }

  clientChange(){
    let clientSelect = document.querySelectorAll('.client-select select')[0];
    clientSelect.onchange = (event) => {
      this.options.targetClientUrn = event.target.value;
      this.getWebsitesAndPages();
    }
  }

  websiteChange(){
    let websiteSelect = document.querySelectorAll('.websites_list select')[0],
        parent = this;
    websiteSelect.onchange = (event) => {
      let selectedItems = Array.from(event.target.selectedOptions)
      parent.options.targetWebsiteUrns = selectedItems.map(opt => opt.value)
      parent.addOrRemoveAssociatedPages(parent.options.targetWebsiteUrns);
    }
  }

  pagesChange(){
    let pagesSelect = document.querySelectorAll('.pages_list select')[0],
        parent = this;
    if (!!pagesSelect){
      pagesSelect.onchange = (event) => {
        let selectedItems = Array.from(event.target.selectedOptions)
        parent.options.targetPageNames = selectedItems.map(opt => opt.value)
      }
    }
  }

  submitListen(){
    let parent = this;
    $( ".export-button" ).click(function(e) {
      e.preventDefault();
      parent.postWidget();
    });
  }

  // Supporting Functions Below
  addOrRemoveAssociatedPages(website_urns){
    let pages = [];
    let data = JSON.parse(sessionStorage.currentWebsitesData);
    website_urns.map(function(opt){
      data.filter(function (entry) {
        if(entry.urn === opt){
          entry.pageNames.forEach(v => {v.webName = entry.name;});
          pages.push(...entry.pageNames)
        }
      });
    })
    this.buildPagesSelect(pages);
  }

  gatherWebsites(websites){
    $(websites).each((idx, e) => {
      let checkboxMarkup = `<option value="${e.urn}">${e.name}</option>`;
      sel.append($(checkboxMarkup));
    });
  }

  getWebsitesAndPages(){
    return $.ajax({
      url: `${this.cmsDomain}/api/clients/${this.options.targetClientUrn}/website_and_page_names`,
      dataType: 'json',
      success: (data) => {
        if (data !== null) {
          this.buildWebsitesSelect(data, this.options);
          sessionStorage.setItem('currentWebsitesData', JSON.stringify(data));
        }
      },
      error: (xhr, status, error) => {
        $('.websites-multi-select').html(`<p>We are having websites & pages problems.</p>`)
      }
    });
  }

  buildClientsSelect(clients = []){
    let sel = this.topModal.find('.client-select select');
    if (clients.length){
      $(clients).each((idx, e) => {
        let checkboxMarkup = `<option value="${e.urn}">${e.name}</option>`;
        sel.append($(checkboxMarkup));
      });
      sel.material_select();
    }
  }

  buildWebsitesSelect(websites = []){
    this.options.targetWebsiteUrns = ''; //reset selected websites data if new client is selected
    this.options.targetPageNames = ''; //reset pages data if new website is selected
    sessionStorage.clear();
    let sel = this.topModal.find('.websites_list select');
    if (websites.length){
      sel[0].innerHTML = "";
      $(websites).each((idx, e) => {
        const checkboxMarkup = `<option value="${e.urn}">${e.verboseName}</option>`;
        sel.append($(checkboxMarkup));
      });
      sel.material_select();
    }
  }

  buildPagesSelect(pages = []){
    let sel = this.topModal.find('.pages_list select');
    if (pages.length){
      sel[0].innerHTML = "";
      $(pages).each((idx, e) => {
        const checkboxMarkup = `<option value="${e.name}">${e.webName} - ${e.name}</option>`;
        sel.append($(checkboxMarkup));
      });
      sel.material_select();
    }
  }

  postWidget(){
    let targetPage = this.options.pageSpecificWidget ? `${this.options.targetPageNames}`.split(",") : ['Website Template'];
    let data = {  client_urn:                  `${this.options.sourceClientUrn}`,
                  sub_images_with_placeholder: `${this.options.subImagePlaceholder}`,
                  source_widget_id:            `${this.options.widgetId}`,
                  target_client_urn:           `${this.options.targetClientUrn}`,
                  target_website_urns:         `${this.options.targetWebsiteUrns}`.split(","),
                  target_page_names:           targetPage
               };
    fetch(`${this.cmsDomain}/api/clients/${this.options.sourceClientUrn}/bulk_copy_widgets`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(result => alert(result.message))
  }
};

new EditBulkWidgetCopy();
