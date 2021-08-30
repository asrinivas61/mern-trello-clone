# mern-trello-clone
A Trello application clone project using MERN tech stack

# Pre-Requisites
- NodeJS 14.x.x or higher
- MongoDB 4.x

# Steps to setup the application in running state.
1. Clone the application code from [GitLab](https://github.com/asrinivas61/mern-trello-clone.git)
2. navigate to client directory:
    a. Goto `src/environments/environment.prod.ts` file and update `TRELLO_API_ENDPOINT` value to the host url where the application is going to be deployed.
    b. run the following commands one after another
        ```npm install``` and ```npm run build```
3. After completion of step 2 copy the folder `build/**` folder from client --> into the target folder `server/public/trello-client-portal`.
4. Make sure the target MongoDB service is up and running.
5. Navigate to `server` directory:
    a. Make sure the `.env` file has this `NODE_ENV=production` value.
    b. Goto `config/env/PROD.js` file and update the downstream target service (MongoDB) details accordingly.
    c. execute the following commands one after another
        ```npm install``` and ```npm start```
6. Now the service is accessible at port 3000 with the current host location.

# To Run Test cases:
1. Navigate to client/server directories and run the command ``npm test``.