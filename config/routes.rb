Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/api', to: 'documents#index'
  get '/api/:section/:uuid', to: 'documents#show'
  patch '/api/:section/:uuid', to: 'documents#update'
  post '/api', to: 'documents#create'
  post '/api/sections', to: 'sections#create'
  patch '/api/:id', to: 'sections#update'
  delete '/api/:id', to: 'sections#destroy'
  delete '/api/:section/:uuid', to: 'documents#destroy'
  post '/api/login', to: 'sessions#create'
  post '/api/logout', to: 'sessions#destroy'
  post '/api/refresh', to: 'sessions#update'
  root to: proc { [400, {}, []] }
end
