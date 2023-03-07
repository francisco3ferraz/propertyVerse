#frozen_String_literal: true

class Profile < ApplicationRecord
  include Countriable
  
  # Association between Profile and User models
  belongs_to :user

  # Set object's geocoded location based on its address attribute
  geocoded_by :address

  # Call geocode method after validation if latitude and longitude are blank
  after_validation :geocode, if: -> { latitude.blank? && longitude.blank? }

  # Return formatted address string
  def address
    [state, country_name].compact.join(', ')
  end

  # Return the full name of the user
  def full_name
    "#{first_name} #{last_name}". squish
  end

end
