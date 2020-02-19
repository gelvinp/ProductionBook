# Checks supplied authorization header against set password
class ApplicationController < ActionController::API
  include ActionController::Cookies
  # Returns a bad request unless request contains a valid token
  #
  # @param Authorization [String] The given token
  def check_password
    head :bad_request unless current_role
  end

  # Returns the current role if already found, or finds the current role from
  # the token cookie
  def current_role
    @current_role ||= role_from_token
  end

  private

  def role_from_token
    token = cookies[:token]
    begin
      decoded_token = JWT.decode(token, Rails.application.credentials.secret_key_base, true, algorithm: 'HS256')[0]
      decoded_token['auth']
    rescue JWT::ExpiredSignature
      render json: { expired: true }.to_json, status: 401
    rescue JWT::DecodeError
      head :bad_request
    end
  end
end
