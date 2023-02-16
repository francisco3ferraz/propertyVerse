module Api
    class UsersByEmailsController < ApplicationController
      def show
        # encontra o usuário pelo e-mail fornecido.
        user = User.find_by!(email: params[:email])
        # define como a resposta será formatada de acordo com o formato solicitado na requisição.
        respond_to do |format|
          format.json do
            # renderiza o usuário como JSON com o código de status :ok (200).
            render json: user.to_json, status: :ok
          end
        end
  
        # captura qualquer exceção gerada pelo método find_by!.
        rescue ActiveRecord::RecordNotFound => e
          respond_to do |format|
            format.json do
              # renderiza uma mensagem de erro como JSON com o código de status 404 (Not Found).
              render json: { error: e.message }.to_json, status: 404
                end
            end
        end
    end
end

