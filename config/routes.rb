Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'homepage#index'
  get '/user-infos' => 'homepage#user_info'
  get '/*path' => 'homepage#index'

  get 'auth/:provider/callback', to: 'sessions#create'
  get '/login', to: 'sessions#new'
end
