Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/api', to: 'documents#index'
  get '/api/:section/:uuid', to: 'documents#show'
  post '/api', to: 'documents#create'
  scope '/api' do
    resources :sections, only: [:create, :update, :destroy]
  end
  root to: proc { [400, {}, []] }
end
