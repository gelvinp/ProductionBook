# Organizes login information
#
# @attr [Integer] id Random 4 digit ID of the user
# @attr [Integer] auth Authorization level of the user.
#   0: Read only
#   1: Read and upload only
#   2: Full access
#
# @note has_secure_password
class User < ApplicationRecord
  has_secure_password

  # Initializes the ID, password, and auth
  def setup
    self.id ||= loop do
      random_id = rand(1000..9999)
      break random_id unless User.exists?(id: random_id)
    end
    self.password ||= SecureRandom.alphanumeric
    self.auth ||= 0
    puts "User ID: #{self.id}"
    puts "User Password: #{self.password}"
  end
end
