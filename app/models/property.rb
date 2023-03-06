#frozen_String_literal: true

class Property < ApplicationRecord

    # Set constants
    CLEANING_FEE = 5_000.freeze
    CLEANING_FEE_MONEY = Money.new(CLEANING_FEE)
    SERVICE_FEE_PERCENTAGE = (0.08).freeze


    # Define attribute validations
    validates :name, presence: true
    validates :headline, presence: true
    validates :description, presence: true
    validates :address_1, presence: true
    validates :city, presence: true
    validates :state, presence: true
    validates :country, presence: true

    # Convert column into a Money object with nil allowed
    monetize :price_cents, allow_nil: true

    # Set object's geocoded location based on its address attribute
    geocoded_by :address

    # Call geocode method after validation if latitude and longitude are blank
    after_validation :geocode, if: -> { latitude.blank? && longitude.blank? }

    # Define model associations
    has_many_attached :images, dependent: :destroy
    has_many :favorites, dependent: :destroy
    has_many :favorited_users, through: :favorites, source: :user
    has_many :reviews, as: :reviewable
    has_many :reservations, dependent: :destroy
    has_many :payments, through: :reservations
    has_many :reserved_users, through: :reservations, source: :user

    # Get address
    def address
        #[address_1, address_2, city, state, country].compact.join(', ')
        [state, country].compact.join(', ')
    end

    # Get default_image
    def default_image
        images.first
    end

    # Get user who favorited
    def favorited_by?(user)
        return if user.nil?

        favorited_users.include?(user)
    end

    # Returns available dates for reservations
    def available_dates
        date_format = "%b %e"
        next_reservation = reservations.future_reservations.order(checkout_date: :desc).first
        return Date.tomorrow.strftime(date_format)..Date.today.end_of_year.strftime(date_format) if next_reservation.nil?
            next_reservation.checkout_date.strftime(date_format)..Date.today.end_of_year.strftime(date_format)
    end

end
