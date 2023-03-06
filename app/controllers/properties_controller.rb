#frozen_string_literal: true

class PropertiesController < ApplicationController
    # GET request for showing a specific property
    def show
        # Retrieve the `Property` object associated with the `:id` parameter
        @property = Property.find(params[:id])
    end
end
