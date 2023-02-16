module Api
    class FavoritesController < ApplicationController

      # proteção contra ataques de falsificação de solicitações
      protect_from_forgery with: :null_session
  
      def create
        # cria um novo favorito a partir dos parâmetros enviados
        favorite = Favorite.create!(favorite_params)
  
        # responde a request na formatação JSON
        respond_to do |format|
          format.json do
            # renderiza a resposta JSON com o status de criação bem-sucedida (201)
            render json: serialize_favorite(favorite), status: :created
          end
        end
      end
  
      def destroy
        # encontra o favorito pelo ID especificado nos parâmetros
        favorite = Favorite.find(params[:id])
        # exclui o favorito
        favorite.destroy!
  
        # responde a request na formatação JSON
        respond_to do |format|
          format.json do
            # renderiza a resposta JSON com o status de sucesso sem conteúdo (204)
            render json: serialize_favorite(favorite), status: 204
          end
        end
      end
  
      private
  
      # permite apenas os parâmetros especificados
      def favorite_params
        params.permit(:user_id, :property_id)
      end
  
      # converte o objeto favorito para bytes, para ser enviado na resposta JSON
      def serialize_favorite(favorite)
        FavoriteSerializer.new(favorite).serializable_hash[:data].to_json
      end
    end
  end
  