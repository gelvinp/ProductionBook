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
        expect(document.name).to eq(@name)
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
end
