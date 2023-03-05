module PropertyHelper
    def property_rating_percentage(property:, rating:)
        count = property.reviews_count
        count > 0 ? ((property.reviews.where(rating: rating).size.to_f / count) * 100).to_i : 0
    end
end