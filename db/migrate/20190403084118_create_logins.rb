class CreateLogins < ActiveRecord::Migration[5.2]
  def change
    create_table :logins do |t|
      t.string :employeeId
      t.string :password
      t.string :hospitalId

      t.timestamps
    end
  end
end
