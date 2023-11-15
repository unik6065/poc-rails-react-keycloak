class HomepageController < ApplicationController
  skip_before_action :validate_token, only: %i[index]

  def index; end

  def user_info
  end
end
