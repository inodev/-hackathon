class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :name
      t.boolean :public
      t.integer :age
      t.text :address
      t.integer :scale

      t.timestamps
    end
  end
end
