class TextEditorController < ApplicationController


  def index
    @id = 1
    @document = Document.find(@id)
    @name = @document.name
  end

  def update

  end
  
end