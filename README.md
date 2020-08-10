# MEMORIZATION STATION

- [Project Overview](#overview)
- [MVP](#mvp)
  - [Goals](#goals)
  - [Libraries and Dependencies](#libraries-and-dependencies)
  - [Client (Front End)](#client-front-end)
    - [Wireframes](#wireframes)
    - [Component Tree](#component-tree)
    - [Component Hierarchy](#component-hierarchy)
    - [Component Breakdown](#component-breakdown)
    - [Time Estimates](#time-estimates)
  - [Server (Back End)](#server-back-end)
    - [ERD Model](#erd-model)
- [Post-MVP](#post-mvp)
- [Code Showcase](#code-showcase)
- [Code Issues & Resolutions](#code-issues--resolutions)

<br>

# Memorization Station

> _**A Metaphorical Mansion of Memory Material.**_

## Project Overview



_An application designed to serve as an intuitive tool for building and storing of

Memory systems have been used to aid in retaining and recalling important information about the world throughout history. 
The key insight and basic fundamental principle of most of these systems is that we can remember most efficiently when engaging the visual cortex.  

<br>

## MVP

> The Minimum Viable Product should be a well-planned, easily-communicated product, ensuring that the client's deliverable will be achievable and meet specifications within the time frame estimated.

_The **Project Title** MVP lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus fermentum risus vitae bibendum. Integer vel ipsum mollis odio sollicitudin ornare eu vel ex. In quis fringilla velit, ac maximus quam. Etiam eget placerat neque. Aenean faucibus sem non nisi lobortis ullamcorper._

<br>

### Goals

- _Build a Ruby on Rails API to serve as a back-end server for application data._
- _Build a functioning front-end using the ReactJS framework._
- _Allow the creation of useful materials to use as reference when learning/building systems for memorization of information._
- _Increase ability to retain and recall information, helping to speed up learning overall._


<br>

### Libraries and Dependencies

|     Library      | Description                                |
| :--------------: | :----------------------------------------- |
|      React       | _Javascript library, used here via the Create-React-App package, used to build the application's front-end.  React's focus is on building speedy and responsive web applications by only updating the site's DOM when necessary, and having the various pieces of an application separated into components that are re-useable and lend themselves to efficient scaling and performance._ |
|   React Router   | _Used within the React front-end to navigate between various screens/views and components making up the overall application._ |
| Axios | _Used to pull data into the front-end for rendering on the page, Axios is responsible for efficient interaction between the front-end and the RESTful API being served on the back-end_ |
|     Ruby on Rails      | _Used to build the back-end of the application, where various API endpoints will be accessed in order to pull data into the front-end for use/display and to manage the database._ |
|  Ruby Router  | _Lorem ipsum dolor sit amet, consectetur._ |

<br>

### Client (Front End)

#### Wireframes

> Basic intended views for various screens:

![Desktop Landing](url)

- Desktop Landing

![Desktop Main](url)

- Desktop Main

![Tablet](url)

- Tablet 

![Mobile](url)

- Mobile


#### Component Tree

> Visual representation of how React components are being rendered & parent/child relationship between them:


#### Component Hierarchy

> Visual representation of the intended hierarchy of the data architecture and React components making up the application:

``` structure

src
|__ assets/
      |__ fonts
      |__ icons
      |__ images
        |__ people
        |__ places
        |__ things
      |__ mockups

|__ components/
      |__ Main.jsx
      |__ Layout.jsx
      |__ Header.jsx
      |__ Footer.jsx
      |__ Navigation.jsx
      |__ People.jsx
      |__ Places.jsx
      |__ Things.jsx


|__ screens/
      |__ Main.jsx
      |__ Welcome.jsx
      |__ MemorySystem.jsx

|__ services/
    |__ utilities.js
    |__ apiConfig.js

```

#### Component Breakdown

> Further breakdown & detail regarding components making up the application:

|  Component   |    Type    | state | props | Description                                                      |
| :----------: | :--------: | :---: | :---: | :--------------------------------------------------------------- |
|   Main  | functional |   n   |   n   | _The main component will serve as the container for the body of the application._       |

|    Header    | functional |   n   |   n   | _The header will contain the navigation and logo._               |
|  Navigation  | functional |   n   |   n   | _The nav component will contain links used to navigate to different views within the application._       |

|   Gallery    |   class    |   y   |   n   | _The gallery will render the posts using cards in flexbox._      |
| Gallery Card | functional |   n   |   y   | _The cards will render the post info via props._                 |
|    Footer    | functional |   n   |   n   | _The footer will show info about me and a link to my portfolio._ |

#### Time Estimates

> Use this section to estimate the time necessary to build out each of the components you've described above.

| Task                | Priority | Estimated Time | Time Invested | Actual Time |
| ------------------- | :------: | :------------: | :-----------: | :---------: |
| Add Contact Form    |    L     |     3 hrs      |     2 hrs     |    3 hrs    |
| Create CRUD Actions |    H     |     3 hrs      |     1 hrs     |     TBD     |
| TOTAL               |          |     6 hrs      |     3 hrs     |     TBD     |

> _Why is this necessary? Time frames are key to the development cycle. You have limited time to code your app, and your estimates can then be used to evaluate possibilities of your MVP and post-MVP based on time needed. It's best you assume an additional hour for each component, as well as a few hours added to the total time, to play it safe._

<br>

### Server (Back End)

#### ERD Model

> Use this section to display an image of a computer generated ERD model. You can use draw.io, Lucidchart or another ERD tool.

<br>

***

## Post-MVP

> Use this section to document ideas you've had that would be fun (or necessary) for your Post-MVP. This will be helpful when you return to your project after graduation!

***

## Code Showcase

> Use this section to include a brief code snippet of functionality that you are proud of and a brief description.

## Code Issues & Resolutions

> Use this section to list of all major issues encountered and their resolution.
