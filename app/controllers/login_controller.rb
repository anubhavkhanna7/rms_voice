class LoginController < ApplicationController
  protect_from_forgery 
  def index
    @uname = params[:employeeId]
    @pass = params[:password]
    @login = Login.find_by(employeeId: @uname, password: @pass)
    @value = @login.hospitalId
    render json: {
        username: @uname,
        hospitalId: @value
      }, status: :ok
  end
  def new
  end
  def show
  end
end
