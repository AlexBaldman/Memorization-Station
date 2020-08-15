# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
# EXAMPLES:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

MemoryObject.destroy_all
Chart.destroy_all
User.destroy_all

@Alex = User.create(username: 'Alex', email: 'alexlbeckerman@gmail.com', password: '123456')

@people_chart = Chart.create(name: 'Memory System People', description: 'Famous People Associations for Numbers 00-99', image_url: '')

@person01 = MemoryObject.create(number: '01', initials: 'OA', name: '', description: '', image_url: '')


# EXAMPLES:

# MemoryObject.create(type: 'person', number: '', initials: '', name: '', description: '', image_url: '')

# Chart.create(name: '', description: '', image_url: '')

# User.create(username: '', email: '', password: '')

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

# CHARTS SCHEMA:

# create_table "charts", force: :cascade do |t|
#     t.string "name"
#     t.string "description"
#     t.string "image_url"
#     t.bigint "user_id", null: false
#     t.datetime "created_at", precision: 6, null: false
#     t.datetime "updated_at", precision: 6, null: false
#     t.index ["user_id"], name: "index_charts_on_user_id"
#   end