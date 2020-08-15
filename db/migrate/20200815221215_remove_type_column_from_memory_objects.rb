class RemoveTypeColumnFromMemoryObjects < ActiveRecord::Migration[6.0]
  def change
    remove_column :memory_objects, :type, :string
  end
end
