require 'rails_helper'

RSpec.describe Document, type: :model do
  describe 'Document' do
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

      it 'purges the file on destroy' do
        FileUtils.rm_rf(Rails.root.join('tmp', 'storage'))
        @document.save
        @document.file.attach(io: File.open(Rails.root.join('spec', 'factories', 'documents', 'Resume.pdf')), filename: 'Resume.pdf', content_type: 'application/pdf')
        expect(Dir.glob(Rails.root.join('tmp', 'storage/**/*')).select{ |i| File.file?(i) }.size).to be(1)
        @document.destroy
        expect(Dir.glob(Rails.root.join('tmp', 'storage/**/*')).select{ |i| File.file?(i) }.size).to be(0)
      end
    end
    it { is_expected.to validate_presence_of(:name) }
  end
end
