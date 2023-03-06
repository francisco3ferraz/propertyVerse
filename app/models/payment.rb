#frozen_String_literal: true

class Payment < ApplicationRecord

  # Association between Payment and Reservation models
  belongs_to :reservation

  # Define monetize method to convert columns into a Money object with nil allowed
  monetize :subtotal_cents, allow_nil: true
  monetize :cleaning_fee_cents, allow_nil: true
  monetize :service_fee_cents, allow_nil: true
  monetize :total_cents, allow_nil: true
end
