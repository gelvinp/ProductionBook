# Handles user logins and logouts
class SessionsController < ApplicationController
  # Issues a new JWT and refresh token
  #
  # @param Authorization [String] The given password
  #
  # @note POST /api/login
  #
  # @return JSON where token: JWT, also sets http only cookie to refresh token
  def create
    user = User.find_by(id: params['id'])
    if user&.authenticate(params['password'])
      payload = { id: user.id }
      refresh = JWT.encode payload, Rails.application.credentials.secret_key_base, 'HS256'
      payload = { auth: user.auth, exp: 6.minutes.from_now.to_i }
      token = JWT.encode payload, Rails.application.credentials.secret_key_base, 'HS256'
      response.set_cookie(:refresh, value: refresh, expires: 20.years.from_now, path: '/api/refresh', secure: Rails.env.production?, httponly: true, same_site: :strict)
      response.set_cookie(:token, value: token, expires: 20.years.from_now, path: '/api', secure: Rails.env.production?, httponly: true, same_site: :strict)
      render json: { auth: user.auth }
    else
      head :bad_request
    end
  end

  # Clears the refresh token in the browser's cookie store
  #
  # @note POST /api/logout
  def destroy
    response.set_cookie(:refresh,
                        value: '',
                        expires: 1.day.ago,
                        path: '/api/refresh',
                        secure: Rails.env.production?,
                        httponly: true,
                        same_site: :strict)
    response.set_cookie(:token,
                        value: '',
                        expires: 1.day.ago,
                        path: '/api',
                        secure: Rails.env.production?,
                        httponly: true,
                        same_site: :strict)
    head :no_content
  end

  # Issues a new JWT given a valid refresh token
  #
  # @note POST /api/refresh
  #
  # @return JSON where token: JWT, or if refresh token, expired: true
  def update
    refresh = cookies[:refresh]
    begin
      decoded_token = JWT.decode(refresh, Rails.application.credentials.secret_key_base, true, algorithm: 'HS256')[0]
      id = decoded_token['id']
      user = User.find_by(id: id)
      if user
        payload = { auth: user.auth, exp: 6.minutes.from_now.to_i }
        token = JWT.encode payload, Rails.application.credentials.secret_key_base, 'HS256'
        response.set_cookie(:token, value: token, expires: 20.years.from_now, path: '/api', secure: Rails.env.production?, httponly: true, same_site: :strict)
        render json: { auth: user.auth }
      else
        head :bad_request
      end
    rescue JWT::DecodeError
      head :bad_request
    end
  end
end
