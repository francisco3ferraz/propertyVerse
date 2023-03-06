class User < ApplicationRecord

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable

  # Associations
  has_one :profile, dependent: :destroy
  has_one_attached :picture
  has_many :favorites, dependent: :destroy
  has_many :favorited_properties, through: :favorites, source: :property
  has_many :reservations, dependent: :destroy
  has_many :payments, through: :reservations
  has_many :reserved_properties, through: :reservations, source: :property
  has_many :reviews, dependent: :destroy

  # Callback
  after_create :create_profile

  # Create a profile for the user after creation
  def create_profile
    self.profile = Profile.new
    save!
  end

  # Return the full name of the user
  def full_name
    "#{first_name} #{last_name}". squish
  end

end
