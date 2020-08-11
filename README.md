# Memorization Station
> _**A Metaphorical Mansion of Memory Material.**_

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

## Overview

_**Memorization Station** is a web application designed to spark interest in learning about the mind, memory, and how various systems that have been developed and used throughout history can be used to improve one's ability to absorb and recall information. 

_Its basic functionality at MVP will be to store charts/tables of "memory objects" and generally aid in the building of memorization systems. Users will have the ability to build and store charts of data listing mental associations with numbers, people, places, etc. as they build out different aspects of a personalized memory system, used to encode and recall various types of information._

  - **Goals:**
      - To spark people's interest in learning about memory, and give users a basic understanding of memory systems and the ability to build some basic charts of associations.

    - **Challenges:** 
      - I believe I have a good understanding of how the different technologies are working together, but implementing all the necessary steps on my own on an invividual basis is definitely going to require me to cement my understanding of many of the details I haven't had much practice with yet.

<br>
  
## MVP 

_**Memorization Station** in its MVP version should serve as a bit of an introduction to memory systems, and have the basic functionality of allowing a user to log in and create/store/edit basic charts/tables of "memory objects" of various types.

<br>

### Goals

- _Build a Ruby on Rails API to serve as a back-end server for application data_
- _Seed server with personal data / charts_
- _Build an elegant frontend client using create-react-app_
- _Allow for the storage of data and creation of useful new materials to use as references/associations when learning and building out systems for memorization of information._
- _Increase ability to retain and recall information, helping to speed up learning overall._
- _Add innovative, creative, and quirky new ways of building out these systems, gamifying the process in different areas and make process that can be tedious a lot more fun._


<br>

### Libraries and Dependencies

|     Library      | Description                                |
| :--------------: | :----------------------------------------- |
|      React       | _Javascript library, used here via the Create-React-App package, used to build the application's front-end.  React's focus is on building speedy and responsive web applications by only updating the site's DOM when necessary, and having the various pieces of an application separated into components that are re-useable and lend themselves to efficient scaling and performance._ |
|   React Router   | _Used within the React frontend to navigate between various screens/views and components making up the overall application._ |
| Axios | _Used to pull data into the front-end for rendering on the page, Axios is responsible for efficient interaction between the front-end and the RESTful API being served on the back-end_ |
|     Ruby on Rails      | _Used to build the back-end of the application, where various API endpoints will be accessed in order to pull data into the front-end for use/display and to manage the database._ |
|     Rails Router      | _Recognizing browser URLs on the backend of the app and dispatches them to the controller actions requested._ |



<br>

### Client (Front End)

#### Wireframes

> Basic intended views for various screens:

![Desktop Main](https://i.imgur.com/ThVmSlT.png)

- Desktop Main

![Tablet Main](https://i.imgur.com/ZOjzh0S.png)

- Tablet Main

![Mobile Main](https://i.imgur.com/ZkI7whz.png)

- Mobile Main


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
      |__ Login.jsx
      |__ Signup.jsx
      |__ CreateObjects.jsx
      |__ ShowCharts.jsx



|__ screens/
      |__ Main.jsx
      |__ About.jsx
      |__ LoginSignup.jsx
      |__ CreateObjects.jsx
      |__ UpdateObjects.jsx
      |__ ShowCharts.jsx

|__ services/
    |__ utilities.js
    |__ apiConfig.js

```

#### Component Breakdown

|  Component   |    Type    | state | props | Description                                                      |
| :----------: | :--------: | :---: | :---: | :--------------------------------------------------------------- |
|   Main  | functional |   n   |   n   | _The main component will serve as the container for the body of the application._       |
|    Header    | functional |   n   |   n   | _The header will contain the navigation and logo._               |
|   Footer    |   class    |   n   |   n   | _The footer will hold some general information about the site (and perhaps the nav if layout were to change)._      |
|  Navigation  | functional |   n   |   n   | _The nav component will contain links used to navigate to different views within the application._       |
| Create Objects | functional |   n   |   y   | _The user will enter data to create an object._                 |
| Show Charts   |  functional  |  y  |  y  | _The user will enter data to create an object._   | 




#### Time Estimates

> Use this section to estimate the time necessary to build out each of the components you've described above.

| Task                | Priority | Estimated Time | Time Invested | Actual Time |
| ------------------- | :------: | :------------: | :-----------: | :---------: |
| Setup Rails Server Basics   |    H     |     3 hrs      |    __ hrs     |    __ hrs    |
| Setup User Authentication |    H     |     3 hrs      |      TBD     |     TBD     |
| Models / Controllers      |    H     |     2 hrs      |     TBD     |     TBD     |
| Seed Data      |    M     |     2 hrs      |      TBD     |     TBD     |
| Testing & Troubleshooting      |    M     |     4 hrs      |      TBD     |     TBD     |
| Create React App, Cleanup junk, etc.     |    H     |      2 hrs      |     TBD     |     TBD     |
| API Config in Client        |    M     |     3 hrs      |     TBD     |     TBD     |
| Build out screens/views        |    M     |     3 hrs      |     TBD     |     TBD     |
| Basic layout & styling        |    M     |     3 hrs      |     TBD     |     TBD     |
| Figuring things out and learning by doing...        |    Priceless     |     Priceless      |     Priceless     |     Priceless     |
| TOTAL               |          |     25 hrs      |     TBD     |     TBD     |

<br>

### Server (Back End)

#### ERD Model

> A model of the data structuring for the API on the back-end:

![ERD Model](https://i.imgur.com/JKFeDr0.png)


<br>

***

## Post-MVP

_Post-MVP ideas for the project are plentiful._

_Since both memory and the mind in general are topics I am extremely interested in, I see the MVP of "Memorization Station" as something to continue to build upon and use as a sandbox as I learn new technologies and technique, think of new tools to build, and try to imagine creative new ways to interact with or further build out the database. For example:_

  - Searching for celebrities photos to use as images for the people associations.  

  - Being able to build out more specific types of collections of memory objects, such as "memory palaces" containing items, "memory journeys" consisting of locations in a specific order, etc.  Journeys could perhaps use a Map API to map out actual locations.

  - Perhaps allowing some interactions between multiple users/sharing of select charts or data, ability to export data sets to other software, etc.

  - Building various exercises & games, i.e. allowing the user to practice remembering the associations they build using flash cards, setting up a trivia game to used spaced repetition to help cement memorization, integrating playing cards, etc.  Many possibilities.

  - As mentioned in the project prompt:
    - Ideas for the future.
    - Ideas for whenever..
    - Ideas for probably never...

***

## Code Showcase

> This section will include brief code snippets and notes highlighting functionality I found interesting or am proud of, along with a brief descriptions of the code:


## Code Issues & Resolutions

> Any major issues will be cataloged here along with resolution (for future referral, to act as a cautionary tale to others, and to accelerate learning by analyzing mistakes).


