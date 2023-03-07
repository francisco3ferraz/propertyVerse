#frozen_string_literal = true

module Api
  class UsersByEmailsController < ApplicationController

    # Retrieve a user by email
    def show
      # Find the user by email
      user = User.find_by!(email: params[:email])

      # Respond with JSON and a 200 OK status
      respond_to do |format|
        format.json do
          render json: user.to_json, status: :ok
        end
      end

      # Catch ActiveRecord::RecordNotFound errors and respond with JSON and a 404 Not Found status
      rescue ActiveRecord::RecordNotFound => e
      respond_to do |format|
        format.json do
          render json: { error: e.message }.to_json, status: 404
        end
      end
    end
  end
end


