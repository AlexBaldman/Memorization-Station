# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
# EXAMPLES:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

MemoryObject.destroy_all
Chart.destroy_all
User.destroy_all

@admin = User.create(username: 'admin', email: 'admin@email.com', password: '123456')
puts "#{User.count} users created!"

@chart = Chart.create(name: 'chart1', description: 'People', image_url: 'https://townsquare.media/site/295/files/2015/01/ozzy.jpg')
puts "#{Chart.count} charts created!"

@ozzie = MemoryObject.create(name: 'Ozzie Osbourne', number: '00', initials: 'OO', description: 'Ozzie biting the head off a bat', image_url: 'https://townsquare.media/site/295/files/2015/01/ozzy.jpg')

@annie = MemoryObject.create(name: 'Orphan Annie', number: '01', initials: 'OA', description: 'Orphan Annie singing a song on Broadway', image_url: 'http://4.bp.blogspot.com/-JzdLYUVCbQc/TsZrJApPSQI/AAAAAAAAEuc/xoiB1-Tnjig/s1600/AnnieSandyTOMORROW.jpg')
puts "#{MemoryObject.count} memory objects created!"



# @chart1.memory_objects.push(@memory_object00, @memory_object01)

# NEED TO CREATE A FIELD TO HOLD MEMORY_OBJECTS WITHIN CHARTS
# SO I CAN PUSH THESE OBJECTS THERE? 
# OR DO THEY ONLY LINK BY ID ??? 
 
# EXAMPLES:


# Flavor.destroy_all
# Food.destroy_all
# User.destroy_all

# @admin = User.create!(username: 'admin', email: 'admin@email.com', password: '123456')
# puts "#{User.count} users created"

# @pizza = Food.create!(name: 'Pizza', user: @admin)
# puts "#{Food.count} foods created"

# @salty = Flavor.create!(name: "salty")
# @sweet = Flavor.create!(name: "sweet")
# @umami = Flavor.create!(name: "umami")
# @sour = Flavor.create!(name: "sour")
# @bitter = Flavor.create!(name: "bitter")
# puts "#{Flavor.count} flavors created"

# @pizza.flavors.push(@salty, @sweet, @umami)

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

