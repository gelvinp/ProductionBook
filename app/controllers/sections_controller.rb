# Handles creating and deleting sections
class SectionsController < ApplicationController
  before_action :check_password

  # Creates a new section and returns the ID (or -1 if error)
  #
  # @param name [String] Friendly name of the section to create
  #
  # @note POST /api/sections
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

  # Renames a preexisting section and returns success or failure
  #
  # @param name [String] New name for the section
  # @param id [Integer] ID of the section to rename
  #
  # @note PATCH or PUT /api/:id
  #
  # return JSON where success: true or false
  def update
    section = Section.where(id: params[:id]).first
    if section&.update(name: params['name'])
      render json: { success: true }
    else
      render json: { success: false }
    end
  end

  # Deletes a preexisting section and all its documents
  #
  # @param id [Integer] ID of the section to delete
  #
  # @note DELETE /api/:id
  #
  # return JSON where success: true or false
  def destroy
    section = Section.where(id: params[:id]).first
    if section&.destroy
      render json: { success: true }
    else
      render json: { success: false }
    end
  end
end
