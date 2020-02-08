require 'rails_helper'

RSpec.describe "Sections", type: :request do
  describe "POST /api/section " do
    context "section is valid" do
      before do
        @section_name = 'New Section'
        post "/api/section", headers: { Authorization: ENV['PASSWORD'] }, params: { name: @section_name }
      end

      it "returns status 200" do
        expect(response).to have_http_status(200)
      end

      it "returns the ID of the new section" do
        expected_response = { "id" => Section.last.id }
        expect(JSON.parse(response.body)).to eq(expected_response)
        expect(Section.last.name).to eq(@section_name)
      end
    end

    context "section is invalid" do
      before do
        @section = create(:section)
        post "/api/section", headers: { Authorization: ENV['PASSWORD'] }, params: { name: @section.name }
      end

      it "returns status 200" do
        expect(response).to have_http_status(200)
      end

      it "returns -1 as the ID" do
        expected_response = { 'id' => -1 }
        expect(JSON.parse(response.body)).to eq(expected_response)
      end
    end
  end

  describe "Rejects unauthorized connections" do
    before do
      get "/api"
    end

    it "returns status 400" do
      expect(response).to have_http_status(400)
    end
  end
end
