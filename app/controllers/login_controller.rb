class LoginController < ApplicationController
  protect_from_forgery 
  def index
  end
  def new
  end
  def show
    @login = Login.find(params[:patientName])
    p @login
  end
end
