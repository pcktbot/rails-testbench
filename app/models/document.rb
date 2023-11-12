class Document < ApplicationRecord
  belongs_to :user
  after_commit :broadcast_data

  def broadcast_data
    index_data = DocumentsController.renderer.render(
      partial: "documents/index",
      locals: { documents: user.documents, user: user })
  end
end
