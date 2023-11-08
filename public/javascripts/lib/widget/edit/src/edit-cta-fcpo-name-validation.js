class WidgetEditCtaFcpoNameValidationJS {

  checkFCPOLabelClass(input) {
    const inputVal = input.val(),
          inputCheck = input.siblings("label").find("span.input-check");

    if(!inputVal) {
      return inputCheck.removeClass("pass fail");
    }

    this.fcpoNamesLoop(inputVal, inputCheck);
  }

  fcpoNamesLoop(inputVal, inputCheck) {
    for (let i = 0; i < this.fcpoNames.length; i++) {
      if(inputVal === this.fcpoNames[i]) {
        inputCheck.removeClass("fail").addClass("pass");
        break;
      } else {
        inputCheck.removeClass("pass").addClass("fail");
      }
    }
  }

  checkFCPOName(fcpoField) {
    this.fcpoNames = [];
    const fcpoNameField = window.top.$('.modal').find(fcpoField),
          that = this;

    fcpoNameField.find("label").html(function(_, html) {
      return html.replace(/(Enter Custom Name Here)/g, '<span class="input-check">$1</span>')
    });

    $("#side-nav-secondary").find(".g5-widget-fa-featured-content-pop-out").each(function(index, element) {
      that.fcpoNames.push($( element ).closest(".widget-thumbnail").next().text());
    });

    this.checkFCPOLabelClass(fcpoNameField.find("input[type=text]"));

    fcpoNameField.find("input[type=text]").keyup(function(e) {
      that.checkFCPOLabelClass($(e.currentTarget));
    });
  }

}

new WidgetEditCtaFcpoNameValidationJS();
