![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# PROJECT 4: Your Full Stack App <!-- omit in toc -->

**One. More. Project.**

You are one week away from graduating your Software Engineering Immersive... Needless to say, we're incredibly proud, and you should be too!

## Table of Contents <!-- omit in toc -->
- [OVERVIEW](#overview)
  - [Important Dates](#important-dates)
  - [The MVP Requirements](#the-mvp-requirements)
- [GETTING STARTED](#getting-started)
  - [Step 1. Make A New Repo](#step-1-make-a-new-repo)
  - [Step 2. Pitch Your Idea](#step-2-pitch-your-idea)
  - [Step 3. Get Hacking](#step-3-get-hacking)
- [EVALUATION](#evaluation)
- [PLAGIARISM](#plagiarism)

# OVERVIEW

## Important Dates

- **Pitches Due:** Monday, 8/10/20 at 10:00AM
- **_Something_ Deployed (Strong Recommendation):** Friday, 8/14/20 by 5:00PM
- **Presentations:** Wednesday, 8/19/20 at 10:00AM

<br>

For your final project, you will build your very own full-stack, full-CRUD app, utilizing a RESTful JSON API with the so-called "React on Rails" stack.

This project, like the others, will be a portfolio piece... **Your ultimate portfolio piece.** Build something you can be proud of and that demonstrates an understanding of (and an ability to use) the tools and techniques you learned over the last 3 months. It should be **functional with sufficient complexity** to really show off your new abilities.

### So, this is what 3 months of grueling work has come to... <!-- omit in toc -->

<br>

## The MVP Requirements

### Planning <!-- omit in toc -->

- Have a **thoroughly** developed `README.md` file. (Refer below to _"Pitch Your Project Idea"_ for more.)
  - Copy the raw markdown from the [project planning template](https://git.generalassemb.ly/sei-nyc-neptune/project-4/blob/master/README-template.md) to get started.

### Server (Back End) <!-- omit in toc -->

- Have a **RESTful JSON API**.
  - Build a **Ruby on Rails** server, exposing RESTful JSON endpoints.
  - Build a database with at least 3 tables:
    - There must be at least 1 association between your tables. (1:m _or_ m:m)
  - Utilize **Rails** to define models for interacting with the database.
  - Implement working generic controller actions for Full CRUD (`index`, `show`, `create`, `update`, `delete`) between your non-User tables 
    - _Note that if you choose to do Authentication, CRUD on your User table does not count toward this requirement._

### Client (Front End) <!-- omit in toc -->

- Have a working, interactive **React** app, built using `npx create-react-app`.
  - Have at least 8 separate, rendered components in an organized and understandable React file structure.
  - Utilize functional and class React components appropriately.
  - Utilize state and props in your components efficiently.
  - Use _only_ React for DOM Manipulation.
- Consume data from your **Ruby on Rails API**, and render that data in your components.
- Utilize **React Router**, for client-side routing.
- Demonstrate Full CRUD actions ( `index`, `show`, `create`, `update`, and `delete` ) on the front end.
  - _Note that if you decide to implement Auth, your full CRUD actions must be covered amongst your non-User tables._

### Styling <!-- omit in toc -->

- Be styled with CSS (or SCSS, if you'd prefer).
- Use Flexbox or Grid in your layout design.
- Implement 2 media queries for responsive design on 3 screen sizes (including desktop).

### Linting <!-- omit in toc -->

- Indent properly.
- Utilize high-quality, semantic variable names.
- Follow `camelCase`, `snake_case`, and `kebab-case` convention.
- Remove unnecessary boilerplate React files and code.
- Remove all `console.log()`s and commented out code (functional notes and comments are okay).

### Deployment <!-- omit in toc -->

- Deploy the fully functional front-end via Surge or Netlify.
- Deploy the back-end via Heroku.

### Procedural <!-- omit in toc -->

- Initialize a **git repo on Github**, with a link to your hosted project.
- Have **frequent commits**, making a _robust_ commit history at least every day. (75 commits minimum)
- Use effective and safe **branching and merging** processes.

<br>

# GETTING STARTED

You know the drill!

## Step 1. Make A New Repo

Like before, you will start by creating your project repository on your **personal** GitHub. (Please do not name the repo "Project 4." It should be a descriptive or creative title, with the description explaining it's a student project.)

## Step 2. Pitch Your Idea

Before you start coding away, you will meet with all your instructors for a 5 minute pitch to get your idea approved. You must have your idea prepared in the repository's README.md file, **including all of the following items**, to get approved.

1. **Title:** A working title for your app.
2. **Overview:** A brief explanation in non-technical terms, summarizing the app.
   - **Features:** A full feature list for your MVP app.
   - **Goals:** The overarching goals for your project.
   - **Challenges:** An explanation of the challenges you expect to face with this project.
3. **MVP:** An overview of your MVP, including the minimum, need-to-have features of the app.
   - **Client:** Wire-frames, component hierarchy, component breakdown, and time-frame estimates.
   - **Server:** Data architecture, ERD model, and API endpoint documentation.
   - **Dependencies:** A full list of all libraries, frameworks, etc.
4. **Post-MVP:** Your goals for post-MVP, including features that you would like to implement once your MVP is complete.

> [Project 4 README Template](./README-template.md)

> ["How detailed should wireframes be?"](https://justuxdesign.com/blog/wireframe-fidelity)
>
> [Wireframe.cc](https://wireframe.cc/)
> 
> [Whimsical](https://whimsical.com/)
> 
> [lucidchart](https://www.lucidchart.com/)
>
> [draw.io](https://www.draw.io/)
>
> [ERDPlus](https://erdplus.com/)

## Step 3. Get Hacking

Some tips...

### Deploy Early and Often! <!-- omit in toc -->

### Getting Unstuck <!-- omit in toc -->

Remember:

1. Don't hesitate to write messy code to solve short-term problems; you can always refactor later!
2. Read the documentation for whatever technologies you use! The docs often include a tutorial that can help you get started, and learning to read documentation is crucial to your success as a developer.

### Getting Support <!-- omit in toc -->

Each student will be given 5 (five) tokens, redeemable at any time during regular class time (subject to instructors' schedules), for 20 minutes. **Tokens cannot be transferred between students.**

Instructors will not be holding open office hours during project week. This is to give you the opportunity to solve issues and errors you run in to on your own and with your classmates. However, your TA will still hold their hours as planned.

### How to submit a request for support <!-- omit in toc -->

While it is important for you to develop not only your coding skills but also your ability to debug code, please don't spin your wheels for too long. If you get stuck on an issue, we encourage you to attempt to fix it yourself. This includes: reviewing your code, reading the error message, and researching your issue through google. 

More often than not, that is enough to resolve your issue, however if you find yourself spending too much time on one issue, create an issue ticket. This will provide the instructor with a point of reference regarding your code and the issue you are having and will enable us to give you more effective guidance.

> [Project Issue Ticket Template](./issue-ticket-template.md)

We will be providing a survey link to sign up for support. You must include in the survey, your name and a link to the issue ticket. Also please remember to push up you code that is having the issue when signing up. Optionally, if you would like to schedule one-on-one ahead of time, you can provide a time slot for when you would like to meet with someone from the instructional team. We will do our best to reach out to you as close to your preferred time slot as possible.

<br>

# EVALUATION

Your instructors will evaluate your project and determine if it is complete or incomplete based on the following criteria.

- **Code Quality:** Is the code well formatted? Are variable and function names
  semantic and sensible? Is the code easy to read and understand?
- **Technical Requirements:** How does the project stack up to the requirements
  for this project? Is the developer making use of the material we've covered in
  a way that makes sense?
- **Creativity & Interface:** Is the application easy to navigate? Does it work
  well in every major browser? Is it responsive? Does it incorporate modern UI
  Themes?
- **Functionality:** Does the application work without errors or bugs? Does it
  present a complete app, where every feature is fully implemented in a way that
  makes sense?
- **Presentation:** Is there adequate documentation? Is the repository well
  organized and free of clutter?

## Incomplete Projects <!-- omit in toc -->

If you do not meet the MVP requirements by the deadline, we loop in Student Services about a 3 day project extension. **You are allowed only one extension for any project. If you have already used yours, please make an extra effort to communicate your progress and loop us in on any challenges.**

Remember, your certificate of completion and Outcomes support eligibility will be conditioned on the future completion of your project. Let's avoid that.

<br>

# PLAGIARISM

Remember. We have a **zero tolerance policy** towards plagiarism. More on our plagiarism policy can be found in our course wiki's [plagiarism policy page](https://git.generalassemb.ly/sei-nyc-neptune/class-info/blob/master/policies/plagiarism.md).
