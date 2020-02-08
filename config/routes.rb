Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/api', to: 'documents#index'
  get '/api/:section/:uuid', to: 'documents#show'
  post '/api', to: 'documents#create'
  post '/api/section', to: 'sections#create'
  root to: proc { [400, {}, []] }
end
