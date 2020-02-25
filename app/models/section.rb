# Organizes different categories of files
#
# @attr [String] name Friendly name of the section
class Section < ApplicationRecord
  has_many :documents, dependent: :destroy
  validates :name, uniqueness: true, presence: true, length: { maximum: 25 }
end
