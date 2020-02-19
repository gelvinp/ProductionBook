require 'rails_helper'

RSpec.describe "Sections", type: :request do
  describe "POST /api/sections " do
    context "section is valid" do
      before do
        @section_name = 'New Section'
        log_in
        post "/api/sections", headers: { Authorization: "Bearer #{@token}" }, params: { name: @section_name }
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
        log_in
        post "/api/sections", headers: { Authorization: "Bearer #{@token}" }, params: { name: @section.name }
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

  describe "DELETE /api/:id" do
    context "Section exists" do
      before do
        @section = create(:section)
        log_in
        delete "/api/#{@section.id}", headers: { Authorization: "Bearer #{@token}" }
      end

      it "returns status 200" do
        expect(response).to have_http_status(200)
      end

      it "deletes the section" do
        expect(Section.where(id: @section.id).first).to be_nil
      end

      it "returns true" do
        expect(JSON.parse(response.body)["success"]).to be_truthy
      end
    end

    context "Section does not exist" do
      before do
        log_in
        delete "/api/999999", headers: { Authorization: "Bearer #{@token}" }
      end

      it "returns status 200" do
        expect(response).to have_http_status(200)
      end

      it "returns false" do
        expect(JSON.parse(response.body)["success"]).to be_falsey
      end
    end
  end

  describe "PATCH /api/:id" do
    context "Section does not exist" do
      before do
        log_in
        patch "/api/999999", headers: { Authorization: "Bearer #{@token}" }
      end

      it "returns status 200" do
        expect(response).to have_http_status(200)
      end

      it "returns false" do
        expect(JSON.parse(response.body)["success"]).to be_falsey
      end
    end

    context "Section name is invalid" do
      before do
        @section = create(:section)
        @section_two = create(:otherSection)
        log_in
        patch "/api/#{@section.id}", params: { name: @section_two.name }, headers: { Authorization: "Bearer #{@token}" }
      end

      it "returns status 200" do
        expect(response).to have_http_status(200)
      end

      it "returns false" do
        expect(JSON.parse(response.body)["success"]).to be_falsey
      end
    end

    context "Section name is valid" do
      before do
        @section = create(:section)
        @new_name = "A new section name"
        log_in
        patch "/api/#{@section.id}", params: { name: @new_name }, headers: { Authorization: "Bearer #{@token}" }
      end

      it "returns status 200" do
        expect(response).to have_http_status(200)
      end

      it "returns true" do
        expect(JSON.parse(response.body)["success"]).to be_truthy
      end

      it "renames the section" do
        expect(@section.reload.name).to eq(@new_name)
      end
    end
  end
end
