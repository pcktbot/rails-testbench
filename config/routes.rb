Rails.application.routes.draw do
  devise_for :users
  root to: 'home#index'
  resources :documents
  get 'websites', to: 'websites#index'
  post 'websites', to: 'websites#copy'
  get 'sortable', to: 'sortable#index'
  resources :text_editor, only: [:index, :update]
end
