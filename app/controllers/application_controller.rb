# frozen_string_literal: true

# Checks supplied authorization header against set password
class ApplicationController < ActionController::API
  def authenticate_user
    head :bad_request unless request.headers['Authorization'] == ENV['PASSWORD']
  end
end
