require 'rails_helper'

RSpec.describe Document, type: :model do
  describe 'pre-create hooks' do
    context 'without a section' do
      it 'fails to create' do
        @document = build(:document)
        expect(@document.save).to be_falsey
      end
    end

    context 'with a section' do
      before do
        @section = create(:section)
        @document = build(:document, section: @section)
      end

      it 'creates successfully' do
        expect(@document.save).to be_truthy
      end

      it 'creates a uuid' do
        @document.save
        expect(@document.uuid).to be
      end

      it 'belongs to a section' do
        @document.save
        expect(@document.section).to eq(@section)
        is_expected.to belong_to(:section)
      end
    end
  end
end
