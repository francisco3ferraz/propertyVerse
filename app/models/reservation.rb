class Reservation < ApplicationRecord
  
  # Association between Reservation and Property models
  belongs_to :property

  # Association between Reservation and User models
  belongs_to :user

  # Reservation has a single payment and it's dependent on reservation deletion
  has_one :payment, dependent: :destroy

  # Check-in and Check-out dates are required for a reservation
  validates :checkin_date, presence: true
  validates :checkout_date, presence: true

  # Returns future reservations
  scope :future_reservations, -> { where("checkout_date > ?", Date.today)}

end
