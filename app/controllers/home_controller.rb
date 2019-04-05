class HomeController < ApplicationController
  protect_from_forgery 
  def index
    @username = { employeeId: "null" }
  end
end
