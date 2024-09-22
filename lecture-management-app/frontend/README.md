# Lecture Planning and Management Application

This repository contains the source code for the thesis based on a Lecture Planning and Management Application for the university.  
The application aims to simplify the lecture scheduling process for professors and admins by offering collaboration features, streamlined planning, export functionality, conflict management, and other features.

The application is developed using the MERN stack with MongoDB as the database, Express and Node.js handling the backend server, and React.js for the frontend interface. 

## Requirements:

- **nodemon** installed globally.  
  If not installed, run:
  ```bash
  npm i nodemon --global

- **node** v18 installed.
  To install Node.js, run:
  ```bash
  nvm install node

## Steps to Run the Application:

- 1. Clone the repository.
git clone <repository_url>

- 2. Navigate into the project directory.
cd <project-directory>

- 3. Ensure to add the .env file in the following locations:
 **./backend/.env**
 and **./frontend/.env**

## Backend (Server):

- 1. Navigate to the backend directory:
  ```bash
  cd backend
  
- 2. Install dependencies:
    ```bash
   npm i

- 3. Start the server:
    ```bash
   npm run start

## Frontend (Client):

- 1. Navigate to the frontend directory:
    ```bash
    cd frontend

- 2. Install dependencies:
    ```bash
    npm i

- 3. Start the client:
    ```bash
    npm run start

## The app will run in development mode. 
Open the following link to view the app in your browser: 
http://localhost:3000


## Application Flow:

- **Home Page**:
  - Displays a calendar view with events created for holidays, academic events, breaks, and classroom assignments.

- **Status Board**:
  - Admin can initiate module planning and assign them to professors.
  - Professors can plan lectures for the assigned modules and collaborate with other professors.
  - Professors can change the status of the module plan from 'In Progress' to 'Completed,' and Admins can verify and approve the plan as 'Approved.' This allows both professors and admins to track the progress of planning.
  - Once approved, the finalized lecture plan can be exported in `.ics` format for integration into personal calendars or in `.xlsx` format.

- **Admin Hub**:
  - Admins have special access to add upcoming events/holidays in the "Events and Holidays" section and new courses in the "Courses and Modules" section, which will be visible and accessible in the application.
  - Admins can also approve or reject newly registered users in the "User Registrations" section.


