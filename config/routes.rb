Rails.application.routes.draw do
  resources :memory_objects
  resources :charts
  resources :users

  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'
  get 'users', to: 'users#index'
  get 'users/:id', to: 'users#show'
  post '/users/:id', to: 'users#create'
  post '/charts/:id', to: 'charts#create'
  get 'charts', to: 'charts#index'
  get '/charts/:id', to: 'charts#show'
  get '/charts/new', to: 'charts#new'
  get '/memory_objects', to: 'memory_objects#index'
  get '/memory_objects/:id', to: 'memory_objects#show'
  post '/memory_objects/:id', to: 'memory_objects#create'
  put '/charts/:id/memory_objects/:memory_objects_id', to: 'charts#add_object'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
end

