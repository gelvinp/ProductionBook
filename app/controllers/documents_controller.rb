require 'data_uri'

# Returns either a listing of sections and documents, or a specific document
class DocumentsController < ApplicationController
  before_action :authenticate_user
  # Returns a json object describing the available sections and the files
  # contained within
  #
  # @note GET /api
  #
  # @return JSON array of objects
  def index
    sections = Section.all
    render json: sections.map { |s| { id: s.id, name: s.name, files: s.documents.all.map { |d| { name: d.name, uuid: d.uuid } } } }
  end

  # Accepts a binary blob of a PDF file, creates a matching document in the
  # specified section, and stores the file
  #
  # @param file [String] Base64 representing PDF file
  # @param section [Integer] ID of the section to add the file too
  # @param name [String] Name of the PDF file
  #
  # @note POST /api
  #
  # @return JSON object where success: true or false indicating success, uuid:
  #   the new document's uuid
  def create
    section = Section.where(id: params['section']).first
    if section
      document = Document.create(section: section, name: params['name'])
      tempfile = Tempfile.new('document')
      begin
        uri = URI::Data.new(params['file'])
        raise URI::InvalidURIError, 'Base64 Data is not a PDF' unless uri.content_type == 'application/pdf'

        tempfile.binmode
        tempfile.write(uri.data)
        tempfile.rewind
        document.file.attach(io: tempfile, filename: params['name'], content_type: 'application/pdf')
        render json: { success: true, uuid: document.uuid }
      rescue URI::InvalidURIError
        render json: { success: false, uuid: -1 }
      ensure
        tempfile.close
        tempfile.unlink
      end
    else
      render json: { success: false, uuid: -1 }
    end
  end

  # Returns a binary blob for the specified document, given a section and
  # UUID
  #
  # @param section [Integer] ID of the section
  # @param uuid [String] UUID of the file to return
  #
  # @note GET /api/[:section]/[:uuid]
  #
  # @return Binary blob representing file
  def show
    section = Section.where(id: params[:section]).first
    document = section&.documents&.where(uuid: params[:uuid])&.first
    send_data document.binary_blob, filename: document.name, type: 'application/pdf', disposition: 'attachment' if document
  end
end
