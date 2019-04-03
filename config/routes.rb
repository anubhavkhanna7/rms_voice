Rails.application.routes.draw do
  get 'hospital/index'
  get 'home/index'
  resources :home
  resources :hospital
  root 'home#index'
  # get 'hello_world', to: 'hello_world#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
