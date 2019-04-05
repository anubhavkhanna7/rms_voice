class HospitalController < ApplicationController
  protect_from_forgery 
  def index
    @username = { username: "null" }
  end
  
  def create
    @data = Hospital.new(data_items)
    @data.save
    # redirect_to home_path(@data)
  end
  private
  def data_items
    params.permit(*Hospital.new.attributes.keys)
  end
end
