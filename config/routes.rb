Rails.application.routes.draw do
  
  # Devise authentication routes for users
  devise_for :users
  
  # Root path
  root "home#index"
  
  # API namespace for users and favorites
  namespace :api do
    get "/users_by_email" => "users_by_emails#show", as: :users_by_email
    resources :favorites, only: [:create, :destroy]
  end
  
  # Properties routes for showing details and making reservations
  resources :properties, only: :show do
    resources :reservations, only: :new, controller: "properties/reservations"
  end
  
  # Route for creating reservation payments
  resources :reservation_payments, only: :create

  # Route for showing user profiles
  resources :profiles, only: [:show, :update]

end
