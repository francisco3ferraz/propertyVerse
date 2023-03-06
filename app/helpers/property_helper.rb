# frozen_string_literal: true

module PropertyHelper
    # Calculate the percentage of reviews for a given rating for a given property
    # based on the total count of reviews for the property.
    # Returns 0 if no reviews are available for the property.
    def property_rating_percentage(property:, rating:)
        count = property.reviews_count
        count > 0 ? ((property.reviews.where(rating: rating).size.to_f / count) * 100).to_i : 0
    end
end