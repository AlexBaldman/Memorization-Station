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
alex = User.create(username: 'alex', email: 'alexlbeckerman@gmail.com', password: '123456')
puts "#{User.count} users created!"

people = Chart.create(name: 'Memory System People', description: 'Celebrities and other well-known figures for association', image_url: 'https://townsquare.media/site/295/files/2015/01/ozzy.jpg', user: @admin)
puts "#{Chart.count} charts created!"

ozzie = MemoryObject.create(name: 'Ozzie Osbourne', number: '00', initials: 'OO', description: 'Ozzie biting the head off a bat', image_url: 'https://townsquare.media/site/295/files/2015/01/ozzy.jpg', user: @admin, chart: chart1)
annie = MemoryObject.create(name: 'Orphan Annie', number: '01', initials: 'OA', description: 'Orphan Annie singing a song on Broadway', image_url: 'http://4.bp.blogspot.com/-JzdLYUVCbQc/TsZrJApPSQI/AAAAAAAAEuc/xoiB1-Tnjig/s1600/AnnieSandyTOMORROW.jpg', user: @admin, chart: chart1)
obiwan = MemoryObject.create(name: 'Obi-Wan Kenobi', number: '02', initials: 'OB', description: 'Obi-Wan weilding a lightsaber', image_url: '', user: @admin, chart: chart1)
puts "#{MemoryObject.count} memory objects created!"

# template = MemoryObject.create(name: '________', number: '00', initials: 'OO', description: 'Lorem ipsum something something', image_url: 'Lorem ipsum', user: @admin, chart: chart1)


## ------------------------
# @chart1.memory_objects.push(@memory_object00, @memory_object01)


 
