# Handles creating and deleting sections
class SectionsController < ApplicationController
  before_action :authenticate_user

  # Creates a new section and returns the ID (or -1 if error)
  #
  # @param name [String] Friendly name of the section to create
  #
  # @note POST /api/section
  #
  # @return JSON object where id: Database ID of the created section, or -1 if invalid
  def create
    section = Section.new
    section.name = params['name']
    if section.save
      render json: { id: section.id }
    else
      render json: { id: -1 }
    end
  end
end
