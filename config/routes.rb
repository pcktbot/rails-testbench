Rails.application.routes.draw do
  get 'websites', to: 'websites#index'
  post 'websites', to: 'websites#copy'
  get 'sortable', to: 'sortable#edit'
end
