# Checks supplied authorization header against set password
class ApplicationController < ActionController::API
  # Returns a bad request unless request contains the set password in the
  # header.
  #
  # @param Authorization [String] The given password
  def authenticate_user
    head :bad_request unless request.headers['Authorization'] == ENV['PASSWORD']
  end
end
