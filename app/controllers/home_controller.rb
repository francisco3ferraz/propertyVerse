#frozen_string_literal: true

class HomeController < ApplicationController
    # GET request for the home page
    def index
        # Retrieve all `Property` objects from the database
        @properties = Property.all
    end
end
