# frozen_string_literal: true

# Returns either a list of documents by name and MD5 hash, or given an MD5
# hash, returns that file as a binary blob
class FilesController < ApplicationController
  before_action :authenticate_user

  def index
    files = Dir.glob('documents/*.pdf').select { |e| File.file? e }
    rich_files = files.map { |f| { name: File.basename(f), hash: Digest::MD5.hexdigest(f) } }
    render json: rich_files
  end

  def show
    files = Dir.glob('documents/*.pdf').select { |e| File.file? e }
    file = files.find { |f| Digest::MD5.hexdigest(f) == params[:id] }
    if file
      File.open(file, 'r') do |f|
        send_data f.read.force_encoding('BINARY'), filename: File.basename(file), type: 'application/pdf', disposition: 'attachment'
      end
    else
      head :bad_request
    end
  end
end
