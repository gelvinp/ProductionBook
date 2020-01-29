# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/api', to: 'files#index'
  get '/api/:id', to: 'files#show'
  root to: proc { [400, {}, []] }
end
