class HomeController < ApplicationController
  protect_from_forgery 
  def index
  end
  
  def create
    p '*' * 100;
    p params
    @data = Hospital.new(data_items)
 
    @data.save
    redirect_to @data
  end
  private
    def data_items
      params.require(:hospital).permit(:hospitalId, :patientId, :patientName, :hospitalName, :hospitalAddr, :phnum, :country, :city, :state, :county, :zip)
    end
end
