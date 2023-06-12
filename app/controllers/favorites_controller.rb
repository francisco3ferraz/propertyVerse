# frozen_string_literal: true

class FavoritesController < ApplicationController
    before_action :authenticate_user!
  
    def index
      @properties = current_user.favorited_properties
    end
  end
  