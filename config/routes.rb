Rails.application.routes.draw do
  resources :memory_objects
  resources :charts
  resources :users

  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'

  get '/charts/:id', to: 'chart#show'
  # get '/memory_objects/:id' to 'memory_object#show'

  # get '/memory_objects/:id' to: 'objects#show'
  # put '/charts/:charts_id/memory_object/:id' to: 'charts#add_object'

  # NEED TO FIGURE OUT - SERVER WOULD NOT START WITH THE ABOVE UNCOMMENTED



  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
end