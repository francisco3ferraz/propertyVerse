# frozen_string_literal: true

class ReviewsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]

  def new
    @property = Property.find(params[:property_id])

    if current_user.reviews.where(reviewable_id: @property.id).count == current_user.reservations.where(property_id: @property.id).count
      redirect_to root_path, alert: 'You have already reviewed this property.'
      return
    elsif current_user.reservations.where(property_id: @property.id).empty?
      redirect_to root_path, alert: 'You have not stayed at this property yet.'
      return
    end

    @review = Review.new
  end

  def create
    @property = Property.find(params[:review][:property_id])

    if current_user.reviews.where(reviewable_id: @property.id).count == current_user.reservations.where(property_id: @property.id).count
      redirect_to root_path, alert: 'You have already reviewed this property.'
      return
    elsif current_user.reservations.where(property_id: @property.id).empty?
      redirect_to root_path, alert: 'You have not stayed at this property yet.'
      return
    end

    @review = Review.new(review_params)
    @review.user = current_user
    @review.property = @property

    if @review.save
      redirect_to @property, notice: 'Review was successfully created.'
    else
      render :new
    end
  end

  private

  def review_params
    params.require(:review).permit(:rating, :title, :body)
  end
end
