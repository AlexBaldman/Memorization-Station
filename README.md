# Memorization Station

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

## Overview
_An application designed to aid in the building of memorization systems. A user is able to store charts of data listing mental associations with numbers, people, places, etc. as they build out personalized memory systems used to remember various types of information._

<br>

## MVP

> The Minimum Viable Product will be the foundational version of the application with basic functionality and design, with additional functions and styling being added Post-MVP.

_The MVP for **Memorization Station** will be for it to store some of my own personal charts of data that I've been working on, of associations of numbers with various celebrities/well-known figures, etc. with the ability to edit, update, and delete the data through the site._

## Post-MVP
_Post-MVP ideas for the project are plentiful.  Searching for celebrities photos to use as images for the people associations.  Being able to create journeys using a Map API and store your locations, which are used in memory systems as loci, or locational storage points for bits of information.  Gamifying certain aspects using flash cards, adding playing cards, dice, etc.  So many possibilities.

<br>

### Goals

- _Build a Ruby on Rails API to serve as a back-end server for application data_
- _Seed server with my personal data / charts_
- _Build a functioning front-end client using ReactJS_
- _Allow for the storage of data and creation of useful new materials to use as references/associations when learning and building out systems for memorization of information._
- _Increase ability to retain and recall information, helping to speed up learning overall._
- _Add innovative, creative, and quirky new ways of building out these systems, gamifying the process in diffferent areas and make process that can be tedious a lot more fun._


<br>

### Libraries and Dependencies

|     Library      | Description                                |
| :--------------: | :----------------------------------------- |
|      React       | _Javascript library, used here via the Create-React-App package, used to build the application's front-end.  React's focus is on building speedy and responsive web applications by only updating the site's DOM when necessary, and having the various pieces of an application separated into components that are re-useable and lend themselves to efficient scaling and performance._ |
|   React Router   | _Used within the React front-end to navigate between various screens/views and components making up the overall application._ |
| Axios | _Used to pull data into the front-end for rendering on the page, Axios is responsible for efficient interaction between the front-end and the RESTful API being served on the back-end_ |
|     Ruby on Rails      | _Used to build the back-end of the application, where various API endpoints will be accessed in order to pull data into the front-end for use/display and to manage the database._ |

<br>

### Client (Front End)

#### Wireframes

> Basic intended views for various screens:

![Desktop Main](url)

- Desktop

![Tablet Main](url)

- Tablet 

![Mobile Main](url)

- Mobile


#### Component Tree

> Visual representation of how React components are being rendered & parent/child relationship between them:

![Component Tree](url)

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
        |__ symbols
      |__ mockups

|__ components/
      |__ Main.jsx
      |__ Header.jsx
      |__ Footer.jsx
      |__ Nav.jsx
      |__ Display.jsx
      |__ Edit.jsx
      |__ Things.jsx



|__ screens/
      |__ Main.jsx
      |__ Numbers.jsx
      |__ Places.jsx
      |__ People.jsx
      |__ Things.jsx
      |__ Create.jsx
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

|   Footer    |   class    |   y   |   n   | _The gallery will render the posts using cards in flexbox._      |

| Gallery Card | functional |   n   |   y   | _The cards will render the post info via props._                 |

|    Footer    | functional |   n   |   n   | _The footer will show info about me and a link to my portfolio._ |




#### Time Estimates

> Use this section to estimate the time necessary to build out each of the components you've described above.

| Task                | Priority | Estimated Time | Time Invested | Actual Time |
| ------------------- | :------: | :------------: | :-----------: | :---------: |
| Set up Rails Server   |    L     |     3 hrs      |     2 hrs     |    3 hrs    |
| Create CRUD Actions |    H     |     3 hrs      |     1 hrs     |     TBD     |
| Action to do        |    M     |     1 hrs      |     1 hrs     |     TBD     |
| Action to do        |    M     |     1 hrs      |     1 hrs     |     TBD     |
| Action to do        |    M     |     1 hrs      |     1 hrs     |     TBD     |
| Action to do        |    M     |     1 hrs      |     1 hrs     |     TBD     |
| Action to do        |    M     |     1 hrs      |     1 hrs     |     TBD     |
| Action to do        |    M     |     1 hrs      |     1 hrs     |     TBD     |
| Action to do        |    M     |     1 hrs      |     1 hrs     |     TBD     |
| TOTAL               |          |     6 hrs      |     3 hrs     |     TBD     |

<br>

### Server (Back End)

#### ERD Model

> A model of the data structuring for the API on the back-end:









<br>

***

## Post-MVP

> Ideas for possible implementation Post-MVP (after completing a Minimum Viable Product):

- Idea for the future.
- Idea for whenever.
- Idea for probably never.

***

## Code Showcase

> This section will include brief code snippets and notes highlighting functionality I found interesting or am proud of, along with a brief description of the code.




## Code Issues & Resolutions

> Any major issues will be cataloged here along with their resolution for future referral and learning from mistakes.


