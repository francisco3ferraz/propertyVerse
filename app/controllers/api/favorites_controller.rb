#frozen_string_literal = true

module Api
  class FavoritesController < ApplicationController

    # Prevent CSRF attacks
    protect_from_forgery with: :null_session

    # Create a new Favorite object
    def create
      favorite = Favorite.create!(favorite_params)

      # Respond to the request with JSON and a 201 Created status
      respond_to do |format|
        format.json do
          render json: serialize_favorite(favorite), status: :created
        end
      end
    end

    # Destroy an existing Favorite object
    def destroy
      favorite = Favorite.find(params[:id])
      favorite.destroy!

      # Respond to the request with JSON and a 204 No Content status
      respond_to do |format|
        format.json do
          render json: serialize_favorite(favorite), status: 204
        end
      end
    end

    private

    # Permit the user_id and property_id parameters for creating new Favorite objects
    def favorite_params
      params.permit(:user_id, :property_id)
    end

    # Convert a Favorite object to a JSON string using the FavoriteSerializer class
    def serialize_favorite(favorite)
      FavoriteSerializer.new(favorite).serializable_hash[:data].to_json
    end
  end
end
