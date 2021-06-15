# Corona-Virus-Test-App

This app simulates Corona virus test when an X-ray image is uploaded to the server. It randomly generates a positive or nagative result. It is designed just for illustration, and does not actually perform corona virus test. Designed is done with MEAN stack.

## Running the project on localhost

After clonning the repository, and having the complete project files saved in a directory on you computer, open the project folder with your desired editor.

To run the frontend part of the project:

- Navigate to the directory of the frontend files: `cd frontend-chest-X`
- Install node.js on your computer if you do not already have it installed [node.js](https://nodejs.org/en/)
- To check the version of node.js you have installed, type: `node -v`
- Install angular globally: `npm install -g @angular/cli`
- To install all the frontend dependencies: `npm install`
- To open the frontend on localhost: `ng serve --port 4200`

Setting up the database

- Install [MongoDB](https://zarkom.net/blogs/how-to-install-mongodb-for-development-in-windows-3328) on windows
- Install [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) on mac
- Install [MongoDB compass](https://www.mongodb.com/try/download/compass) for managing the database

To run the backend part of the project:

- Navigate to the directory of the backend files: `cd backend-chest-X`
- To install all the backend dependencies: `npm install`
- To run the backend server: `nodemon server.js`

## Tech Stack

- Angular
- Node.js and Express
- MongoDB and Mongoose
