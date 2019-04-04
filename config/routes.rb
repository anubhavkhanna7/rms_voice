Rails.application.routes.draw do
  get 'login/new'
  get 'home/index'
  get 'hospital/index'
  resources :login
  resources :home
  resources :hospital
  root 'login#new'
  # get 'hello_world', to: 'hello_world#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
