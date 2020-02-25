require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it { is_expected.to have_secure_password }
  end

  describe 'setup' do
    before do
      @user = User.new
      @user.setup
    end

    it 'Sets the ID' do
      expect(@user.id).to be_between(1000, 9999)
    end

    it 'Sets the password' do
      expect(@user.password).not_to be_nil
    end

    it 'Sets the auth to 0' do
      expect(@user.auth).to be(0)
    end
  end
end
