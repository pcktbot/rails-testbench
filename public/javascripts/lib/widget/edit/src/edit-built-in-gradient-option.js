class EditBuiltInGradient {

  constructor() {
    this.topModal = window.top.$('.modal');
    this.builtInGradientOption = this.topModal.find('.built-in-gradient-option');
    this.builtInGradientOpen();
  }

  builtInGradientOpen() {
    let builtInGradientOptionToggle = this.topModal.find('span.built-in-gradient-option-toggle');
    builtInGradientOptionToggle.click(function(e) {
      this.builtInGradientOption.addClass('open');
      $(e.currentTarget).closest(".form-field").addClass("gradient-form-field");
      this.themeColor = this.topModal.find('.theme-colors > div');
      this.themeColors();
      this.themeColorSelector();
      this.builtInGradientClose();
    }.bind(this));
  }

  builtInGradientClose() {
    let builtInGradientOptionToggle = this.topModal.find('div.built-in-gradient-option-toggle'),
        backgroundColorFormField = this.topModal.find('.form-field.gradient-form-field');
    builtInGradientOptionToggle.click(function() {
      this.builtInGradientOption.removeClass('open');
      backgroundColorFormField.removeClass("gradient-form-field");
    }.bind(this));
  }

  themeColors() {
    let themeColor = $('.theme-config .custom-colors .color-picker');
    for (let i = 0; i <= 2; i++) {
      let customColor = themeColor.eq(i).find('input').val(),
          themeColorX = this.themeColor.eq(i);
      themeColorX.find('div').css('background-color', customColor)
      themeColorX.find('span').text(customColor);
    }
  }

  themeColorSelector() {
    let colorField = this.topModal.find('.color-stops-container [class*=fields-wrap] [class*=fields]'),
        hexColorField = colorField.eq(0),
        hexColorFieldInput = hexColorField.find('.vc-input__input');
    this.themeColor.click(function(e) {
      colorField.hide();
      hexColorField.show();
      hexColorFieldInput.val($(e.currentTarget).find('span').text());
    });
  }

};

new EditBuiltInGradient();
