class CreateHospitals < ActiveRecord::Migration[5.2]
  def change
    create_table :hospitals do |t|
      t.string :hospitalId
      t.string :patientId
      t.string :patientName
      t.string :hospitalName
      t.string :hospitalAddr
      t.string :phnum
      t.string :country
      t.string :city
      t.string :state
      t.string :county
      t.string :zip

      t.timestamps
    end
  end
end
