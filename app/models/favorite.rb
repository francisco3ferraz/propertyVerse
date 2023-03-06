#frozen_String_literal: true

class Favorite < ApplicationRecord

  # Association between Favorite and User models
  belongs_to :user

  # Association between Favorite and Property models
  belongs_to :property
  
end

