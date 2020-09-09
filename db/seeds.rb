
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
            number: '00', 
            name: 'Ozzie Osbourne', 
            initials: 'OO', 
            description: 'biting the head off a bat like a proper psycho', 
            image_url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4a1e8f0e-aa17-4fea-8d97-26c41ceb9068/d3it68t-a60b9db6-c313-4bef-902c-a18958495b8e.jpg/v1/fill/w_600,h_893,q_75,strp/ozzy_osbourne_caricature_by_andrej2249_d3it68t-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD04OTMiLCJwYXRoIjoiXC9mXC80YTFlOGYwZS1hYTE3LTRmZWEtOGQ5Ny0yNmM0MWNlYjkwNjhcL2QzaXQ2OHQtYTYwYjlkYjYtYzMxMy00YmVmLTkwMmMtYTE4OTU4NDk1YjhlLmpwZyIsIndpZHRoIjoiPD02MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.Ov9hS0oOiMdnCoyHyHYPf8Jya7f-WqZkYFF32Y4-WRI', 
            user: @alex, 
            chart: @peopleChart 
        }, 
        { 
            number: '01',
            name: 'Orphan Annie',  
            initials: 'OA', 
            description: 'performing a musical number', 
            image_url: 'http://4.bp.blogspot.com/-JzdLYUVCbQc/TsZrJApPSQI/AAAAAAAAEuc/xoiB1-Tnjig/s1600/AnnieSandyTOMORROW.jpg', 
            user: @alex, 
            chart: @peopleChart
        }, 
        {    
            number: '02',
            name: 'Obi-Wan Kenobi',  
            initials: 'OB', 
            description: 'weilding a lightsaber looking like a beard model', 
            image_url: 'https://4.bp.blogspot.com/-k2KS5eXyCCU/VN8pwoY917I/AAAAAAAAcU0/1LWaI_xs0Uw/s1600/obi1.jpg', 
            user: @alex, 
            chart: @peopleChart 
        },
        {
            number: '03', 
            name: 'Osi Umenyiora', 
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
            name: 'Omar Epps',
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
        },
        {
            number: '11',
            initials: 'AA',
            name: 'Andre Agassi',
            description: 'hitting a tennisball super hard with a headband holding on his wig super tight',
            image_url: 'https://2.bp.blogspot.com/-Adg9zZrpLCM/VdBpvMzLdbI/AAAAAAAAJGA/TeB4mVVuN_Q/s400/agass.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '12',
            initials: 'AB',
            name: 'Al Bundy',
            description: 'sittin on the couch with his hands down his pants watching TV',
            image_url: 'https://memegenerator.net/img/images/15027148.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '13',
            initials: 'AC',
            name: 'Aleister Crowley',
            description: 'doing magick, drawing a pentagram or something evil seeming',
            image_url: 'https://images-na.ssl-images-amazon.com/images/I/81jRzG7gmyL._AC_SL1500_.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '14',
            initials: 'AD',
            name: 'Abner Doubleday',
            description: 'inventing baseball',
            image_url: 'https://s3-us-west-2.amazonaws.com/flx-editorial-wordpress/wp-content/uploads/2018/04/09152649/Ridiculous-6-John-Turturro-Abner-Doubleday.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '15',
            initials: 'AE',
            name: 'Albert Einstein',
            description: 'writing out physics formulas on a chalkboard',
            image_url: 'https://s3.amazonaws.com/holdenluntz.com/wp-content/uploads/20200625181753/keystone-press-agency_albert-einstein-writing-blackboard.jpeg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '16',
            initials: 'AS',
            name: 'Arnold Schwartzenegger',
            description: 'pumping iron / flexing',
            image_url: 'https://i.pinimg.com/originals/48/0e/bc/480ebc56b3ef355b3b84e42e00a3071a.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '17',
            initials: 'AG',
            name: 'Ali G',
            description: 'BOOYAKASHA! finger snap',
            image_url: 'https://media1.tenor.com/images/67993b95e090778b512b9a5446d02f5c/tenor.gif?itemid=3411330',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '18',
            initials: 'AH',
            name: 'Adolf Hitler',
            description: 'doing a Nazi salute / heiling himself',
            image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Hitler_salute_in_front_of_lamppost.jpg/240px-Hitler_salute_in_front_of_lamppost.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '19',
            initials: 'AN',
            name: 'Aaron Neville',
            description: 'singing super vibrato-ish',
            image_url: 'https://www.offbeat.com/wp-content/uploads/2016/01/aaronneville.goldengrichardiii.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '20',
            initials: 'BO',
            name: 'Barack Obama',
            description: 'making fun of Donald Trump at the White House Press Dinner',
            image_url: 'https://static01.nyt.com/images/2016/05/01/multimedia/whcd-obamaroast/whcd-obamaroast-superJumbo.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '21',
            initials: 'BA',
            name: 'BA Baracus',
            description: 'driving the A-team van',
            image_url: 'https://www.ateamresource.com/gallery/file533.png',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '22',
            initials: 'BB',
            name: 'Bugs Bunny',
            description: 'giving the ole smackaroo kiss',
            image_url: 'https://i.pinimg.com/originals/3e/92/9d/3e929d9c445d912006f63a2fec3bb82c.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '23',
            initials: 'BC',
            name: 'Bill Cosby',
            description: 'drugging someone',
            image_url: 'https://pbs.twimg.com/media/DoDPNCbXoAEQWBW.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '24',
            initials: 'BD',
            name: 'Bob Dylan',
            description: 'playing harmonica',
            image_url: 'https://i.pinimg.com/originals/81/eb/d0/81ebd0a6bcf438185e51feab70d25b03.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '25',
            initials: 'BE',
            name: 'Big Ern McCracken',
            description: 'bowling with his custom rose ball, hair all akimbo',
            image_url: 'https://i.pinimg.com/originals/5c/56/9b/5c569be6b4e9c8cb35904751d49010ec.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '26',
            initials: 'BS',
            name: 'Bart Simpson',
            description: 'aiming his slingshot',
            image_url: 'https://i7.pngguru.com/preview/624/914/573/bart-simpson-s-guide-to-life-homer-simpson-marge-simpson-maggie-simpson-bart-simpson.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '27',
            initials: 'BG',
            name: 'Bill Gates',
            description: 'posing like a dork with a PC monitor (with perhaps evil plans to takeover the world on the screen)',
            image_url: 'https://fossbytes.com/wp-content/uploads/2016/10/bill-gates-chilhood.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '28',
            initials: 'BH',
            name: 'Ben Hur',
            description: 'racing a charriot',
            image_url: 'https://thumbs-prod.si-cdn.com/KpuiR1zj_62MC7poGmnOGqbokMo=/fit-in/1600x0/https://public-media.si-cdn.com/filer/20110930101013BenHur_Photo_After-small.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '29',
            initials: 'BN',
            name: 'Bill Nye',
            description: 'doing a nerdy science experiment',
            image_url: 'https://i.kym-cdn.com/photos/images/original/000/342/360/1ed.gif',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '30',
            initials: 'CO',
            name: 'Conan O\'Brien',
            description: 'doing a monologue, maybe his silly puppet-scissor dance',
            image_url: 'https://media4.giphy.com/media/3o6gb948yzJ96dws7e/source.gif',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '31',
            initials: 'CA',
            name: 'Captain America',
            description: 'throwing his sheild',
            image_url: 'https://giffiles.alphacoders.com/691/6911.gif',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '32',
            initials: 'CB',
            name: 'Charles Bronson',
            description: 'shootin\' down some ne\'er-do-wells in a shootout',
            image_url: 'https://i.gifer.com/4uh6.gif',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '33',
            initials: 'CC',
            name: 'Charlie Chaplin',
            description: 'tweaking his moustache in classic fashion',
            image_url: 'https://i.pinimg.com/originals/14/fd/a4/14fda4892437ea76382b823cda3a5801.gif',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '34',
            initials: 'CD',
            name: 'Charlie Day',
            description: 'dressed as greenman being silly/crazy',
            image_url: 'https://kittyvondrake.files.wordpress.com/2010/12/charliedgreen_man.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '35',
            initials: 'CE',
            name: 'Clint Eastwood',
            description: 'asking someone if they feel lucky punk at gunpoint',
            image_url: 'https://4.bp.blogspot.com/-xT42YTtTPoY/UxTFQRkRJdI/AAAAAAAAAdU/KbKjhMe_0uE/w1200-h630-p-k-no-nu/Dirty+Harry.png',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '36',
            initials: 'CS',
            name: 'Carl Sagan',
            description: 'hosting Cosmos in his imaginary ship, saying something like "billions and billions',
            image_url: 'https://www.documentary.org/sites/default/files/images/articles/cosmos-carl-sagan.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '37',
            initials: 'CG',
            name: 'Charles Grodin',
            description: 'being driven insane by Clifford',
            image_url: 'https://fanboynation.com/wp-content/uploads/2015/04/clifford-3.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '38',
            initials: 'CH',
            name: 'Charleton Heston',
            description: 'yelling at dirty apes about how damned they are from captivity',
            image_url: 'https://steamuserimages-a.akamaihd.net/ugc/1456139678335012961/6BA3F39C5C5076642FF443107462275A039BCF23/',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '39',
            initials: 'CN',
            name: 'Chuck Norris',
            description: 'throwing karate kicks as powerful as the sun, or some other hyperbolic karate-actions',
            image_url: 'https://i.ytimg.com/vi/d0z1gNl-us8/hqdefault.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '40',
            initials: 'DO',
            name: 'David Ortiz',
            description: 'hitting a homerun looking super satisfied',
            image_url: 'https://www.boston.com/wp-content/uploads/2014/06/9700cfb4d35948458c461f62df7db103-9700cfb4d35948458c461f62df7db103-0-1.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '41',
            initials: 'DA',
            name: 'Dan Ackroyd',
            description: 'Ghostbusting',
            image_url: 'https://i.pinimg.com/originals/21/5d/de/215dde31c776e5529373a7389c114b9f.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '42',
            initials: 'DB',
            name: 'Derren Brown',
            description: 'hypnotizing someone',
            image_url: 'https://i.dailymail.co.uk/i/pix/2013/03/14/article-2292648-18A831A9000005DC-437_306x467.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '43',
            initials: 'DC',
            name: 'Daniel Cormier',
            description: 'performing a takedown or suplex',
            image_url: 'https://ufc-video.s3.amazonaws.com/image/uploadedpics/cormier.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '44',
            initials: 'DD',
            name: 'Daffy Duck',
            description: 'hopping around all insane-like in Daffyesque fashion',
            image_url: 'https://media.tenor.com/images/e333b336f46a68196f97e85e0d3b5776/tenor.gif',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '45',
            initials: 'DE',
            name: 'Dale Earnhardt',
            description: 'celebrating a win on the podium / racing a Nascar',
            image_url: 'https://cdn.vox-cdn.com/thumbor/XjN8-I7tuzhVYA_4RkTywFp8x8s=/0x36:4807x3241/1200x800/filters:focal(0x36:4807x3241)/cdn.vox-cdn.com/uploads/chorus_image/image/46263450/GettyImages-472081870.0.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '46',
            initials: 'DS',
            name: 'Deion Sanders',
            description: 'returning a kickoff or interception for a TD',
            image_url: 'https://a.espncdn.com/photo/2008/0919/nfl_a_sanders1_300.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '47',
            initials: 'DG',
            name: 'Dave Grohl',
            description: 'playing a drum solo',
            image_url: 'https://i.ytimg.com/vi/QLHJJzXyv7Y/hqdefault.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '48',
            initials: 'DH',
            name: 'David Hasselhoff',
            description: 'running down the beach in full Baywatch form',
            image_url: 'https://i.pinimg.com/474x/1b/44/9a/1b449a18dd6f8529af959566381c0799.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '49',
            initials: 'DN',
            name: 'Dirk Nowitzki',
            description: 'shooting a jump shot over a blocker',
            image_url: 'https://images2.minutemediacdn.com/image/fetch/w_736,h_485,c_fill,g_auto,f_auto/https%3A%2F%2Fthesmokingcuban.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2017%2F07%2F1089487562-850x560.jpeg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '50',
            initials: 'EO',
            name: '',
            description: '',
            image_url: '',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '51',
            initials: 'EA',
            name: '',
            description: '',
            image_url: '',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '52',
            initials: 'EB',
            name: 'Eric Bana',
            description: 'turning into the hulk',
            image_url: 'https://qph.fs.quoracdn.net/main-qimg-0f826b9e59715c87eefd8179a7ecaf8e',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '53',
            initials: 'EC',
            name: 'Ewan Cameron',
            description: 'doing MK-Ultra experiments on people like a creep',
            image_url: 'https://i2-prod.dailyrecord.co.uk/incoming/article11666210.ece/ALTERNATES/s615b/JS138334168.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '54',
            initials: 'ED',
            name: 'Mr. Ed',
            description: 'being a horse that talks, obviously',
            image_url: 'https://cdn0.wideopenpets.com/wp-content/uploads/2016/05/Untitled-design-18-770x405.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '55',
            initials: 'EE',
            name: 'Ernie Els',
            description: 'playing golf looking a bit dufusish',
            image_url: 'https://golf.com/wp-content/uploads/2020/07/ErnieElsDistance.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '56',
            initials: 'ES',
            name: 'Edward Scissorhands',
            description: 'sculpting elaborate hedge sculptures, or perhaps a block of ice from time to time...',
            image_url: 'https://arthistoryoffilmtcmc.files.wordpress.com/2018/09/edwardshlowangle.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '57',
            initials: 'EG',
            name: '',
            description: '',
            image_url: '',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '58',
            initials: 'EH',
            name: 'E',
            description: '',
            image_url: '',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '59',
            initials: 'EN',
            name: 'Ed Norton',
            description: 'fightclub fighting / beating the shit out of ',
            image_url: 'https://shblogging.files.wordpress.com/2016/12/fightclub_256pyxurz.jpg',
            chart: @peopleChart,
            user: @alex
        },
        {
            number: '60',
            initials: 'SO',
            name: 'Shaquille O\'Neal',
            description: 'breaking the backboard with a slam dunk',
            image_url: 'https://thumbs.gfycat.com/HugePhysicalIzuthrush-max-1mb.gif',
            chart: @peopleChart,
            user: @alex
        }
    ]
)

# puts `Look at those beautiful bastards!  You just created #{MemoryObject.count} people!  You're like some sort of God!`
# ____________________________

## template JSON:

        # ,
        # {
        #     number: '',
        #     initials: '',
        #     name: '',
        #     description: '',
        #     image_url: '',
        #     chart: @peopleChart,
        #     user: @alex
        # }


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


 
