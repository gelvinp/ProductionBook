require 'rails_helper'

RSpec.describe Section, type: :model do
  describe 'validations' do
    it { is_expected.to validate_uniqueness_of(:name) }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_length_of(:name).is_at_most(25) }
    it { is_expected.to have_many(:documents).dependent(:destroy) }
  end
end
