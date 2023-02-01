module Api
    class FavoritesController < ApplicationController

        # nullify the session for the duration of the request
        protect_from_forgery with: :null_session


        # Create a new Favorite [ User Favorites Property ]
        def create
            favorite = Favorite.create!(favorite_params)

            respond_to do |format|
                format.json do
                    render json: serialize_favorite(favorite), status: :created
                end
            end
        end

        # Delete a Favorite [ User Unfavorites Property ]
        def destroy
            favorite = Favorite.find(params[:id])
            favorite.destroy!

            respond_to do |format|
                format.json do
                    render json: serialize_favorite(favorite), status: 204
                end
            end
        end
        
        private 

        def favorite_params
            params.permit(:user_id, :property_id)
        end

        def serialize_favorite(favorite)
            FavoriteSerializer.new(favorite).serializable_hash[:data].to_json
        end

    end
end