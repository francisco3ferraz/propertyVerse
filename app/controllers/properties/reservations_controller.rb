#frozen_string_literal = true

module Properties
    class ReservationsController < ApplicationController
        # Call `authenticate_user!` before executing any action
        before_action :authenticate_user!

        def new
            # Retrieve the `Property` object associated with the `:property_id` parameter
            @property = Property.find(params[:property_id])

            # Create a new `Reservation` object associated with the `@property` object
            @reservation = @property.reservations.new

            # Retrieve the permitted parameters for a new reservation
            @checkin_date = new_reservation_params[:checkin_date]
            @checkout_date = new_reservation_params[:checkout_date]
            @subtotal = new_reservation_params[:subtotal]
            @cleaning_fee = new_reservation_params[:cleaning_fee]
            @service_fee = new_reservation_params[:service_fee]
            @total = new_reservation_params[:total]
        end

        private
        
        # Define the permitted parameters for a new reservation
        def new_reservation_params
            params.permit(
                :checkin_date, :checkout_date, 
                :subtotal, :cleaning_fee, 
                :service_fee, :total
            )
        end
    end
end
