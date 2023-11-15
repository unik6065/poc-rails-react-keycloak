class HomepageController < ApplicationController
  skip_before_action :validate_token, only: %i[index]
  before_action :doctor?, only: %i[doctor_info]

  def index; end

  def user_info
    render json: @decoded_token
  end

  def doctor_info
    render json: @decoded_token
  end
end
