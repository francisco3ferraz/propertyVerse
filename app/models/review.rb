class Review < ApplicationRecord

    # Validations
    validates :title, presence: true
    validates :body, presence: true
    validates :rating, presence: true, numericality: { greater_than_or_equal_to: 1, less_than_or_equal_to: 5, only_integer: true }

    # Associations
    belongs_to :reviewable, polymorphic: true, counter_cache: true
    belongs_to :user

    # Callback
    after_commit :update_average_rating, on: [:create, :update]

    # Update average rating of the reviewable object
    def update_average_rating
        reviewable.update!(average_rating: reviewable.reviews.average(:rating))
    end

end
