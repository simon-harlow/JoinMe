# JoinMe

**Contens**
- [JoinMe](#joinme)
  - [📝 Description](#-description)
  - [🎓 Author](#-author)
  - [🧰 Tech Stack \& Notable Dependencies](#-tech-stack--notable-dependencies)
      - [Client Side](#client-side)
      - [Server Side](#server-side)
  - [📜 API Documentation](#-api-documentation)
  - [📦 Local Setup](#-local-setup)
      - [.env](#env)
      - [MySQL DB \& Data](#mysql-db--data)
  - [🖼️ Screenshots \& GIFs](#️-screenshots--gifs)


## 📝 Description
For my BrainStation Capstone Project, I created JoinMe, a unique social platform that allows users to connect with others who share their passion for sports and the outdoors.

JoinMe is designed to be an add-on for Strava to allow users to post future activities that they wise other users to join. Users can 'Join' an Event, post comments, view information about the event including an embedded map that will display a GPX route of the activity if uploaded by the user.

## 🎓 Author

[Simon Harlow](https://github.com/simon-harlow)

## 🧰 Tech Stack & Notable Dependencies

#### Client Side

* React.js
* SAAS
* Google-Maps API *(for places auto-complete)*
* Leaflet *(map rendering and GPX route display)*
* Toastify

*I opted not to use a css library such as Chakra UI or Tailwind CSS as I wanted the challenge of creating the modals, buttons etc... myself. I felt this gave me more flexibility to create what I envisaged*

#### Server Side

* node.js
* express
* knex.js
* mysql

## 📜 API Documentation

[All of the API's used in the project can be found here](https://documenter.getpostman.com/view/24908455/2s93eePonf)


## 📦 Local Setup

Steps to setup local environment for the project

#### .env
Copy this file to an .env file in the server folder and replace the values with your own local configuration.

```
PORT=8080
BACKEND_URL=http://localhost
DB_LOCAL_DBNAME='joinme'
DB_LOCAL_USER='root'
DB_LOCAL_PASSWORD='your local password'
```

#### MySQL DB & Data

Setup a DB called 'joinme' by connecting to your local MySQL server and running the following command:

```
create database joinme;
```

Switch to the joinme db by running command:

```
use joinme;
```

Run the migrations and then insert seed data by running these commands from within the server folder. This will invoke the scripts from the `package.json` file

```
npm run migrate
npm run seed
```

## 🖼️ Screenshots & GIFs



