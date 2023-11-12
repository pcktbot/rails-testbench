module Api
  class TextEditorController < ApplicationController
    def update
      @document = Document.find(params[:id])
      @document.update(data: params[:data])
      render json: @document
    end
  end
end
