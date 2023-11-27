Rails.application.routes.draw do
  devise_for :users
  root to: 'home#index'
  resources :documents
  get 'websites', to: 'websites#index'
  post 'websites', to: 'websites#copy'
  resources :transactions, only: [:index, :show, :new, :edit]
  resources :sortable, only: [:index, :show]
  resources :text_editor, only: [:index, :update]
  namespace :api do
    resources :text_editor, only: [:update]
  end
end
