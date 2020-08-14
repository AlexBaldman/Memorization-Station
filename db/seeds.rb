# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)






MemoryObject.destroy_all
Chart.destroy_all
User.destroy_all


@admin = User.create(username: 'Alex', email: 'alexlbeckerman@gmail.com', password: '123456')



# MEMORY OBJECTS SCHEMA:
# create_table "memory_objects", force: :cascade do |t|
#     t.string "type"
#     t.string "number"
#     t.string "initials"
#     t.string "name"
#     t.string "description"
#     t.string "image_url"
#     t.bigint "user_id", null: false
#     t.bigint "chart_id", null: false
#     t.datetime "created_at", precision: 6, null: false
#     t.datetime "updated_at", precision: 6, null: false
#     t.index ["chart_id"], name: "index_memory_objects_on_chart_id"
#     t.index ["user_id"], name: "index_memory_objects_on_user_id"
#   end