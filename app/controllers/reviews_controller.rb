# frozen_string_literal: true

class ReviewsController < ApplicationController
  before_action :authenticate_user!

  def new
    @property = Property.find_by(id: params[:property_id])

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

    @review = current_user.reviews.build(review_params)
    @review.reviewable = Property.find_by(params[:property_id])

    if @review.save
      redirect_to property_path(@review.reviewable), notice: 'Review created successfully.'
    else
      render :new
    end
  end

  private

  def review_params
    params.require(:review).permit(:title, :body, :rating, :reviewable_id, :reviewable_type)
  end
end
