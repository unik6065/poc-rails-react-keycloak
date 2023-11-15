Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'homepage#index'
  get '/user-infos' => 'homepage#user_info'
  get '/doctor-infos' => 'homepage#doctor_info'
  get '/*path' => 'homepage#index'
end
