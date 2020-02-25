# Organizes different documents
#
# @attr [String] name Friendly name of the document
# @attr [String] uuid Unique ID that will match the stored file on the server
class Document < ApplicationRecord
  belongs_to :section
  before_create do
    self.uuid = SecureRandom.uuid
  end
  before_destroy do
    file.purge
  end
  has_one_attached :file
  validates :name, presence: true

  # Returns the attached PDF as a binary blob
  #
  # @returns [Binary Blob, nil] base64 binary blob representing PDF or nil
  def binary_blob
    return unless file.attached?

    binary = nil
    file.open do |file|
      binary = file.read.force_encoding('BINARY')
    end
    binary
  end
end
