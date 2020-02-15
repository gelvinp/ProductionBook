require 'rails_helper'

RSpec.describe "Documents", type: :request do
  describe "GET /api" do
    before do
      @section = create(:section)
      @document = create(:document, section: @section)
      get "/api", headers: { Authorization: ENV['PASSWORD'] }
    end

    it "returns status 200" do
      expect(response).to have_http_status(200)
    end

    it "returns an index" do
      expected_response = [
        {
          'id' => @section.id,
          'name' => @section.name,
          'files' => [
            {
              'name' => @document.name,
              'uuid' => @document.uuid
            }
          ]
        }
      ]
      expect(JSON.parse(response.body)).to eq(expected_response)
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

  describe "POST /api" do
    context "existing section" do
      before do
        @section = create(:section)
        file = File.open(Rails.root.join('spec', 'factories', 'documents', 'Resume.pdf'))
        @dataURI = Base64.encode64(file.read).prepend("data:application/pdf;base64,")
        file = File.open(Rails.root.join('spec', 'factories', 'documents', 'Resume.pdf'))
        @binaryBlob = file.read.force_encoding('BINARY')
        @name = File.basename(file)
        file.close
        post "/api", headers: { Authorization: ENV['PASSWORD'] }, params: { file: @dataURI, section: @section.id, name: @name }
      end

      it "returns status 200" do
        expect(response).to have_http_status(200)
      end

      it "returns success and uuid" do
        expected_response = {
          "success" => true,
          "uuid" => Document.last.uuid
        }
        expect(JSON.parse(response.body)).to eq(expected_response)
      end

      it "creates a new document" do
        document = Document.last
        expect(document.section).to eq(@section)
        expect(document.name).to eq(@name.split(".")[0..-2].join("."))
        expect(document.file.attached?).to be_truthy
        expect(document.binary_blob).to eq(@binaryBlob)
        expect(@section.documents.count).to eq(1)
      end

      after do
        Dir.children(Rails.root.join('tmp', 'storage')).each do |f|
          next if f == ".keep"
          FileUtils.rm_r(Rails.root.join('tmp', 'storage', f))
        end
      end
    end

    context "non-existant section" do
      before do
        post "/api", headers: { Authorization: ENV['PASSWORD'] }, params: { file: 'Broken', section: -1, name: 'Broken' }
      end

      it "returns status 200" do
        expect(response).to have_http_status(200)
      end

      it "returns failure" do
        expected_response = {
          "success" => false,
          "uuid" => -1
        }
        expect(JSON.parse(response.body)).to eq(expected_response)
      end
    end

    context "invalid base64 data" do
      before do
        @section = create(:section)
        post "/api", headers: { Authorization: ENV['PASSWORD'] }, params: { file: 'Broken', section: @section.id, name: 'Broken' }
      end

      it "returns status 200" do
        expect(response).to have_http_status(200)
      end

      it "returns failure" do
        expected_response = {
          "success" => false,
          "uuid" => -1
        }
        expect(JSON.parse(response.body)).to eq(expected_response)
      end
    end

    context "non-pdf base64 data" do
      before do
        @section = create(:section)
        post "/api", headers: { Authorization: ENV['PASSWORD'] }, params: { file: 'data:image/png;base64,Broken', section: @section.id, name: 'Broken' }
      end

      it "returns status 200" do
        expect(response).to have_http_status(200)
      end

      it "returns failure" do
        expected_response = {
          "success" => false,
          "uuid" => -1
        }
        expect(JSON.parse(response.body)).to eq(expected_response)
      end
    end
  end

  describe "GET /api/:section/:uuid" do
    context "File exists" do
      before do
          @section = create(:section)
          file = File.open(Rails.root.join('spec', 'factories', 'documents', 'Resume.pdf'))
          @dataURI = Base64.encode64(file.read).prepend("data:application/pdf;base64,")
          file = File.open(Rails.root.join('spec', 'factories', 'documents', 'Resume.pdf'))
          @binaryBlob = file.read.force_encoding('BINARY')
          @name = File.basename(file)
          file.close
          post "/api", headers: { Authorization: ENV['PASSWORD'] }, params: { file: @dataURI, section: @section.id, name: @name }
          @document = Document.last
          get "/api/#{@section.id}/#{@document.uuid}", headers: { Authorization: ENV['PASSWORD'] }
      end

      it "returns status 200" do
        expect(response).to have_http_status(200)
      end

      it "returns the binary blob" do
        expect(response.body).to eq(@binaryBlob)
      end
    end

    context "File does not exist" do
      before do
        get "/api/-1/-1", headers: { Authorization: ENV['PASSWORD'] }
      end

      it "returns status 204" do
        expect(response).to have_http_status(204)
      end
    end
  end

  describe "DELETE /api/:section/:uuid" do
    context "Document exists" do
      before do
        @section = create(:section)
        @document = create(:document, section: @section)
        delete "/api/#{@section.id}/#{@document.uuid}", headers: { Authorization: ENV['PASSWORD'] }
      end

      it "returns status 200" do
        expect(response).to have_http_status(200)
      end

      it "deletes the document" do
        expect(Document.where(uuid: @document.uuid).first).to be_nil
      end

      it "returns true" do
        expect(JSON.parse(response.body)["success"]).to be_truthy
      end
    end

    context "Document does not exist" do
      before do
        delete "/api/99999/99999", headers: { Authorization: ENV['PASSWORD'] }
      end

      it "returns status 200" do
        expect(response).to have_http_status(200)
      end

      it "returns false" do
        expect(JSON.parse(response.body)["success"]).to be_falsey
      end
    end
  end

  describe "PATCH /api/:section/:uuid" do
    context "Document does not exist" do
      before do
        patch "/api/999999/99999", headers: { Authorization: ENV['PASSWORD'] }
      end

      it "returns status 200" do
        expect(response).to have_http_status(200)
      end

      it "returns an error" do
        expect(JSON.parse(response.body)["error"]).to be_truthy
      end
    end

    context "Document name is invalid" do
      before do
        @section = create(:section)
        @document = create(:document, section: @section)
        patch "/api/#{@section.id}/#{@document.uuid}", params: { name: '' }, headers: { Authorization: ENV['PASSWORD'] }
      end

      it "returns status 200" do
        expect(response).to have_http_status(200)
      end

      it "returns false" do
        expect(JSON.parse(response.body)["name"]).to be_falsey
      end
    end

    context "Document name is valid" do
      before do
        @new_name = "A new section name"
        @section = create(:section)
        @document = create(:document, section: @section)
        patch "/api/#{@section.id}/#{@document.uuid}", params: { name: @new_name }, headers: { Authorization: ENV['PASSWORD'] }
      end

      it "returns status 200" do
        expect(response).to have_http_status(200)
      end

      it "returns true" do
        expect(JSON.parse(response.body)["name"]).to be_truthy
      end

      it "renames the document" do
        expect(@document.reload.name).to eq(@new_name)
      end
    end

    context "Section is invalid" do
      before do
        @section = create(:section)
        @document = create(:document, section: @section)
        patch "/api/#{@section.id}/#{@document.uuid}", params: { new_section: 99999 }, headers: { Authorization: ENV['PASSWORD'] }
      end

      it "returns status 200" do
        expect(response).to have_http_status(200)
      end

      it "returns false" do
        expect(JSON.parse(response.body)["section"]).to be_falsey
      end
    end

    context "Section is valid" do
      before do
        @section_two = create(:otherSection)
        @section = create(:section)
        @document = create(:document, section: @section)
        patch "/api/#{@section.id}/#{@document.uuid}", params: { new_section: @section_two.id }, headers: { Authorization: ENV['PASSWORD'] }
      end

      it "returns status 200" do
        expect(response).to have_http_status(200)
      end

      it "returns true" do
        expect(JSON.parse(response.body)["section"]).to be_truthy
      end

      it "moves the section" do
        expect(@section.reload.documents).not_to include(@document)
        expect(@section_two.reload.documents).to include(@document)
      end
    end
  end
end
