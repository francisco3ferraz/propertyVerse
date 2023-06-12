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
  
  get "/properties/search" => "properties/search#index"

  # Properties routes for showing details and making reservations
  resources :properties, only: :show do
    resources :reservations, only: :new, controller: "properties/reservations"
  end
  
  # Route for creating reservation payments
  resources :reservation_payments, only: :create

  # Route for showing and updating user profiles
  resources :profiles, only: [:show, :update]

  # Route to show the favorited properties of the current user
  resources :favorites, only: [:show, :index]

  # Route for showing and updating user accounts
  resources :accounts, only: [:show, :update]

  # Route for showing and updating user passwords
  resources :passwords, only: [:show, :update]

  # Route for showing payments
  resources :payments, only: :index

  put "hostify/:user_id" => "hostify#update", as: :hostify

  namespace :host do
    get "/dashboard" => "dashboard#index", as: :dashboard

    resources :properties, only: [:new, :create]
    resources :payments, only: :index
  end

end
