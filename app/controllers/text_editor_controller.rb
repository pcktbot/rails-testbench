class TextEditorController < ApplicationController


  def index
    @id = params[:id]
    @document = Document.find(@id)
    @name = @document.name
    @createdAt = @document.created_at
    @updatedAt = @document.updated_at
  end

  def update

  end
  
end