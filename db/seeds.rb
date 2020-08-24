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
@alex = User.create(username: 'alexBaldman', email: 'alexlbeckerman@gmail.com', password: '123456')
puts "#{User.count} users created!"

@peopleChart = Chart.create(name: 'People', description: 'memory system people', image_url: 'https://jeffwarren.org/wp-content/uploads/thinker.jpg', user: @admin)
@numberPicsChart = Chart.create(name: 'Numbers 0-10', description: 'memory system numbers 0-10'
puts "#{Chart.count} charts created!"

@people = MemoryObject.create([
        { 
        name: 'Ozzie Osbourne', 
        number: '00', 
        initials: 'OO', 
        description: 'Ozzie biting the head off a bat', 
        image_url: 'https://townsquare.media/site/295/files/2015/01/ozzy.jpg', 
        user: @admin, 
        chart: people }, 
        { 
        name: 'Orphan Annie', 
        number: '01', 
        initials: 'OA', 
        description: 'Orphan Annie singing a song on Broadway', 
        image_url: 'http://4.bp.blogspot.com/-JzdLYUVCbQc/TsZrJApPSQI/AAAAAAAAEuc/xoiB1-Tnjig/s1600/AnnieSandyTOMORROW.jpg', 
        user: @admin, 
        chart: people }, 
        {   
        name: 'Obi-Wan Kenobi', 
        number: '02', 
        initials: 'OB', 
        description: 'Obi-Wan weilding a lightsaber', 
        image_url: '', 
        user: @admin, 
        chart: people },
        {


        
        }
]


puts "#{MemoryObject.count} memory objects created!"

# template = MemoryObject.create(name: '________', number: '00', initials: 'OO', description: 'Lorem ipsum something something', image_url: 'Lorem ipsum', user: @admin, chart: chart1)

## template JSON:

# {
    
    # number: '00', 
    # initials: 'OO', 
    # name: '', 
    # description: '____', 
    # image_url: '_____', 
    # user: @admin, 
    # chart: people },



OO = MemoryObject.create(name: 'Ozzie Osbourne', number: '00', initials: 'OO', description: 'Ozzie biting the head off a bat', image_url: 'https://townsquare.media/site/295/files/2015/01/ozzy.jpg', user: @admin, chart: people)
OA = MemoryObject.create(name: 'Orphan Annie', number: '01', initials: 'OA', description: 'Orphan Annie singing a song on Broadway', image_url: 'http://4.bp.blogspot.com/-JzdLYUVCbQc/TsZrJApPSQI/AAAAAAAAEuc/xoiB1-Tnjig/s1600/AnnieSandyTOMORROW.jpg', user: @admin, chart: people)
OB = MemoryObject.create(name: 'Obi-Wan Kenobi', number: '02', initials: 'OB', description: 'Obi-Wan weilding a lightsaber', image_url: '', user: @admin, chart: people)
OC =
OD = 
OE = 
OS = 
OG = 
OH = 
ON = 
AO = 
AA = 
AB = 
AC = 
AD = 
AE = 

 
