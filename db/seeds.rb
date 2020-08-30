
# This file contains the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command,
# (or created alongside the database with db:setup).
#
# __EXAMPLES__:
#     movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#     Character.create(name: 'Luke', movie: movies.first)
#--------------------------------

# ___Clear out objects, charts, and users in previous database when seeding, so as not to create duplicates:

MemoryObject.destroy_all
Chart.destroy_all
User.destroy_all
#--------------------------------

# ___Create Some Users, and tell us how many were created___:

@admin = User.create(username: 'admin', email: 'admin@email.com', password: '123456')
@alex = User.create(username: 'alexBaldman', email: 'alexlbeckerman@gmail.com', password: '123456')
# puts `#{User.count} users created!`
#--------------------------------

# ___Create some Charts, and tell us how many were created___:

@peopleChart = Chart.create(name: 'People', description: 'memory system people', image_url: 'https://jeffwarren.org/wp-content/uploads/thinker.jpg', user: @alex)
@numberChart = Chart.create(name: 'Numbers 0-10', description: 'memory system numbers 0-10', image_url: 'https://specials-images.forbesimg.com/imageserve/1135400792/960x0.jpg?fit=scale', user: @alex)
# puts `#{Chart.count} charts created!`

#--------------------------------

# ___Create some Numbers to seed in NumberChart, and tell us how many were created___:

@numbers = MemoryObject.create(
    [
        {
            number: '0',
            name: 'zero',
            description: 'donut',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCRSVzxfuyH253ftSos6cwasbRU6rR80qpeg&usqp=CAU',
            chart_id: @numberChart,
            user: @alex
        },
        {
            number: '1',
            name: 'one',
            description: 'pencil',
            image_url: 'https://i.etsystatic.com/15835007/r/il/f50fe7/1634154587/il_1588xN.1634154587_gktz.jpg',
            chart: @numberChart,
            user: @alex
        },
        {
            number: '2',
            name: 'two',
            description: 'swan',
            image_url: 'https://clipartix.com/wp-content/uploads/2017/03/Swan-clipart-2.gif',
            chart: @numberChart,
            user: @alex
        },
        {
            number: '3',
            name: 'three',
            description: 'handcuffs',
            image_url: 'https://thumbs.dreamstime.com/z/unlocked-handcuffs-white-painted-brick-wall-open-form-number-100363062.jpg',
            chart: @numberChart,
            user: @alex
        },
        {
            number: '4',
            name: 'four',
            description: 'sailboat',
            image_url: 'https://www.clker.com/cliparts/R/E/0/L/7/U/number-4-sailboat-md.png',
            chart: @numberChart,
            user: @alex
        },
        {
            number: '5',
            name: 'five',
            description: 'hook',
            image_url: 'https://www.memory-improvement-tips.com/images/hook.jpg',
            chart: @numberChart,
            user: @alex
        },
        {
            number: '6',
            name: 'six',
            description: 'elephant trunk',
            image_url: 'https://i.pinimg.com/originals/cb/55/5f/cb555fd7a75e154994047b72e08b4917.jpg',
            chart: @numberChart,
            user: @alex
        },
        {
            number: '7',
            name: 'seven',
            description: 'axe',
            image_url: 'https://www.a-prandi.it/public/gallery/G103/maxi/3-001-7-C-03.jpg',
            chart: @numberChart,
            user: @alex
        },
        {
            number: '8',
            name: 'eight',
            description: 'hourglass',
            image_url: 'https://i.pinimg.com/originals/46/60/fe/4660feae46ba0ca33435209207c4bfdf.jpg',
            chart: @numberChart,
            user: @alex
        },
        {
            number: '9',
            name: 'nine',
            description: 'balloon',
            image_url: 'https://cdn2.vectorstock.com/i/thumb-large/03/96/red-balloon-ribbon-vector-1860396.jpg',
            chart: @numberChart,
            user: @alex
        }
    ]
)

# puts `Mathematical!  #{MemoryObject.count} numbers created!`
# --------------------------------

# Create some People to seed in PeopleChart:

@people = MemoryObject.create(
    [
        { 
            name: 'Ozzie Osbourne', 
            number: '00', 
            initials: 'OO', 
            description: 'biting the head off a bat like a proper psycho', 
            image_url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4a1e8f0e-aa17-4fea-8d97-26c41ceb9068/d3it68t-a60b9db6-c313-4bef-902c-a18958495b8e.jpg/v1/fill/w_600,h_893,q_75,strp/ozzy_osbourne_caricature_by_andrej2249_d3it68t-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD04OTMiLCJwYXRoIjoiXC9mXC80YTFlOGYwZS1hYTE3LTRmZWEtOGQ5Ny0yNmM0MWNlYjkwNjhcL2QzaXQ2OHQtYTYwYjlkYjYtYzMxMy00YmVmLTkwMmMtYTE4OTU4NDk1YjhlLmpwZyIsIndpZHRoIjoiPD02MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.Ov9hS0oOiMdnCoyHyHYPf8Jya7f-WqZkYFF32Y4-WRI', 
            user: @alex, 
            chart: @peopleChart 
        }, 
        { 
            name: 'Orphan Annie', 
            number: '01', 
            initials: 'OA', 
            description: 'performing a musical number', 
            image_url: 'http://4.bp.blogspot.com/-JzdLYUVCbQc/TsZrJApPSQI/AAAAAAAAEuc/xoiB1-Tnjig/s1600/AnnieSandyTOMORROW.jpg', 
            user: @alex, 
            chart: @peopleChart
        }, 
        {    
            name: 'Obi-Wan Kenobi', 
            number: '02', 
            initials: 'OB', 
            description: 'weilding a lightsaber looking like a beard model', 
            image_url: 'https://4.bp.blogspot.com/-k2KS5eXyCCU/VN8pwoY917I/AAAAAAAAcU0/1LWaI_xs0Uw/s1600/obi1.jpg', 
            user: @alex, 
            chart: @peopleChart 
        },
        {
            name: 'Osi Umenyiora', 
            number: '03', 
            initials: 'OC', 
            description: 'sacking Tom Brady so hard he might die', 
            image_url: 'https://static.clubs.nfl.com/image/private/t_editorial_landscape_12_desktop/giants/gjseqmqiomniuowtioim.jpg', 
            user: @alex, 
            chart: @peopleChart,
            
        },
        { 
            number: '04',
            initials: 'OD',
            name: 'Oscar De La Hoya',
            description: 'jabbin super fast jabs with the best of em',
            image_url: 'https://www.ringtv.com/wp-content/uploads/2018/05/Oscar-De-La-Hoya-vs.-Yori-Boy-Campas-YouTube.jpg', 
            chart: @peopleChart,
            user: @alex     
        },
        { 
            number: '05',
            initials: 'OE',
            name: 'Dmar Epps',
            description: 'coaching the Pittsburg Steelers (because he looks like Mike Tomplin, obviously)',
            image_url: 'https://cdn.s3-media.wbal.com/Media/Archive/f7667b87-3c88-42ed-b63c-df7598f7a295/original.jpg', 
            chart: @peopleChart,
            user: @alex 
        },
        {
            number: '06',
            initials: 'OS',
            name: 'OJ Simpson',
            description: 'trying to put on that pesky glove',
            image_url: 'https://lovelace-media.imgix.net/getty/51988708.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '07',
            initials: 'OG',
            name: 'Oscar the Grouch',
            description: 'yelling at folks on the sidewalk froom his trashcan',
            image_url: 'https://media.washtimes.com/media/image/2015/07/17/Oscar.jpg',
            chart: @peopleChart,
            user: @alex
        },{
            number: '08',
            initials: 'OH',
            name: 'Owen Hart',
            description: 'falling from the ceiling, unfortunately',
            image_url: 'https://d1nslcd7m2225b.cloudfront.net/Pictures/2000x2000fit/6/5/4/1326654_owendiveinjapan_964702.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '09',
            initials: 'ON',
            name: 'Oliver North',
            description: 'lying to Congress about Iran Contra or some other shadiness',
            image_url: 'https://www.dw.com/image/39165037_401.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '10',
            initials: 'AO',
            name: 'Annie Oakley',
            description: 'shooting off some six shooters with ease',
            image_url: 'https://historydaily.org/content/60058/7a48da90bf9968f9009c87bdb24ec3d2.jpg',
            chart: @peopleChart,
            user: @alex
        }
        # },
        # {
        #     number: '11',
        #     initials: 'AA',
        #     name: 'Andre Agassi',
        #     description: 'hitting a tennisball super hard with a headband holding on his wig super tight',
        #     image_url: 'https://2.bp.blogspot.com/-Adg9zZrpLCM/VdBpvMzLdbI/AAAAAAAAJGA/TeB4mVVuN_Q/s400/agass.jpg',
        #     chart: @peopleChart,
        #     user: @alex
        # },
        # {
        #     number: '12',
        #     initials: 'AB',
        #     name: 'Al Bundy',
        #     description: 'sittin on the couch with his hands down his pants watching TV',
        #     image_url: 'https://memegenerator.net/img/images/15027148.jpg',
        #     chart: @peopleChart,
        #     user: @alex
        # }
    ]
)

# puts `Look at those beautiful bastards!  You just created #{MemoryObject.count} people!  You're like some sort of God!`
# ____________________________

## template JSON:
# {
    # number: '00', 
    # initials: 'OO', 
    # name: '', 
    # description: '____', 
    # image_url: '_____', 
    # user: @admin, 
    # chart: people 
# },

# OO = MemoryObject.create(name: 'Ozzie Osbourne', number: '00', initials: 'OO', description: 'Ozzie biting the head off a bat', image_url: 'https://townsquare.media/site/295/files/2015/01/ozzy.jpg', user: @admin, chart: people)
# OA = MemoryObject.create(name: 'Orphan Annie', number: '01', initials: 'OA', description: 'Orphan Annie singing a song on Broadway', image_url: 'http://4.bp.blogspot.com/-JzdLYUVCbQc/TsZrJApPSQI/AAAAAAAAEuc/xoiB1-Tnjig/s1600/AnnieSandyTOMORROW.jpg', user: @admin, chart: people)
# OB = MemoryObject.create(name: 'Obi-Wan Kenobi', number: '02', initials: 'OB', description: 'Obi-Wan weilding a lightsaber', image_url: '', user: @admin, chart: people)
# OC =
# OD = 
# OE = 
# OS = 
# OG = 
# OH = 
# ON = 
# AO = 
# AA = 
# AB = 
# AC = 
# AD = 
# AE = 


 
