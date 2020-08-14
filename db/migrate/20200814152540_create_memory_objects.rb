class CreateMemoryObjects < ActiveRecord::Migration[6.0]
  def change
    create_table :memory_objects do |t|
      t.string :type
      t.string :number
      t.string :initials
      t.string :name
      t.string :description
      t.string :image_url
      t.references :user, null: false, foreign_key: true
      t.references :chart, null: false, foreign_key: true

      t.timestamps
    end
  end
end
