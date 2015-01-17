class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :name
      t.boolean :public
      t.string :age
      t.text :address
      t.string :scale
      t.text :story

      t.timestamps
    end
  end
end
