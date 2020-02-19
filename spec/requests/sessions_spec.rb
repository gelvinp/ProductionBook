require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  describe "Invalid Tokens" do
    it "rejects invalid headers" do
      get "/api", headers: { Authorization: "This wont work" }
      expect(response).to have_http_status(400)
    end

    it "rejects invalid tokens" do
      get "/api", headers: { Authorization: "Bearer notarealtoken" }
      expect(response).to have_http_status(400)
    end

    it "rejects expired tokens" do
      payload = { auth: 2, exp: 6.minutes.ago.to_i }
      token = JWT.encode payload, Rails.application.credentials.secret_key_base, 'HS256'
      cookies['token'] = token
      get "/api"
      expect(response).to have_http_status(401)
      expect(JSON.parse(response.body)['expired']).to be_truthy
    end
  end

  describe "POST /api/login" do
    context "valid password" do
      before do
        post "/api/login", headers: { Authorization: get_pass }
      end

      it "returns status 200" do
        expect(response).to have_http_status(200)
      end

      it "returns a valid session" do
        @response = response.cookies['token']
        @jwt = JSON.parse(Base64.decode64(@response.split('.')[1]))
        expect(Time.zone.at(@jwt['exp'])).to be_within(5.seconds).of(6.minutes.from_now)
        expect(@jwt['auth']).to eq(2)
      end

      it "sets a reset cookie" do
        refresh = JSON.parse(Base64.decode64(response.cookies['refresh'].split('.')[1]))
        expect(refresh['id']).to eq('eventual_password_id_here')
      end
    end

    context "invalid password" do
      before do
        post "/api/login", headers: { Authorization: 'FakePassword' }
      end

      it "returns status 400" do
        expect(response).to have_http_status(400)
      end
    end
  end

  describe "POST /api/logout" do
    before do
      post '/api/logout', headers: { Authorization: "Bearer #{@token}" }
    end

    it "returns a 204" do
      expect(response).to have_http_status(204)
    end

    it "unsets the reset and token cookies" do
      expect(response.cookies['refresh']).to be_nil
      expect(response.cookies['token']).to be_nil
    end
  end

  describe 'POST /api/refresh' do
    context 'Valid refresh token' do
      before do
        post "/api/login", headers: { Authorization: get_pass }
        cookies['refresh'] = response.cookies['refresh']
        post '/api/refresh'
      end

      it "returns a 200" do
        expect(response).to have_http_status(200)
      end

      it "returns a new valid token" do
        @response = response.cookies['token']
        @jwt = JSON.parse(Base64.decode64(@response.split('.')[1]))
        expect(Time.zone.at(@jwt['exp'])).to be_within(5.seconds).of(6.minutes.from_now)
        expect(@jwt['auth']).to eq(2)
      end
    end

    context 'Invalid token' do
      before do
        cookies['refresh'] = { id: -1 }.to_json
        post '/api/refresh'
      end

      it "returns a 400" do
        expect(response).to have_http_status(400)
      end
    end
  end
end
