# Health Check API

[<- go back](../README.md)

Before we start building the health check API, we follow the following [article](https://blog.logrocket.com/typeorm-object-relational-mapping-node-js/) to set up `TypeORM` in our `nodejs` application.

Command to kill existing processes on a port `lsof -t -i tcp:3000 | xargs kill`
### Initial set up

We are able to start the application 
```shell
(base) dhruvparthasarathy@Dhruvs-MacBook-Air Assignment2 % npm run start

> assignment2@1.0.0 start
> ts-node src/index.ts

Inserting a new user into the database...
Saved a new user with id: 1
Loading users from the database...
Loaded users:  [ User { id: 1, firstName: 'Timber', lastName: 'Saw', age: 25 } ]
Here you can setup and run express / fastify / any other framework.
```

Here we see that since we have TypeORM set up, we are also able to do the following: 
1. Create a users table
2. Save a new user
3. And load the user back from the database through the nodejs application. 

```ts
export const initializeDB = () => {

	AppDataSource.initialize().then(async () => {
	
		console.log("Inserting a new user into the database...")	
		const user = new User()
		user.firstName = "Timber"
		user.lastName = "Saw"
		user.age = 25
		await AppDataSource.manager.save(user)
		console.log("Saved a new user with id: " + user.id)
		console.log("Loading users from the database...")
		const users = await AppDataSource.manager.find(User)
		console.log("Loaded users: ", users)
		console.log("Here you can setup and run express / fastify / any other framework.")
	}).catch(error => console.log(error))

}

// Data is present in the database
// SELECT * FROM public.user;
//  1 | Timber    | Saw      |  25
```


### Setting up an express application

This is the basic express app that we are able to get up and running with a connected Postgres DB. 

```ts
import { initializeDB } from "./database";
import express from 'express';

const app = express();

// initialize db here
await initializeDB();

app.listen(3000, () => console.log('Assignment 2 app is listening on port 3000.'));
```

```shell
npm run start

> assignment2@1.0.0 start
> npx esrun src/index.ts

Loading users from the database...
Loaded users:  [ User { id: 1, firstName: null, lastName: null, age: 25 } ]
Assignment 2 app is listening on port 3000.
```

### Next Steps

Two significant enhancements have been implemented:

1. Setting up a 405 Method Not Allowed response for inappropriate HTTP methods on a specific API endpoint.
2. Integrating a code prettification process into the Git pre-commit hook to maintain consistent code styling.

## 1. Handling 405 Method Not Allowed

### Objective

Ensure that our `/healthz` endpoint responds with a `405 Method Not Allowed` status code when HTTP methods other than GET are used.

### Implementation

- **Middleware Creation**: Developed a custom middleware in Express.js to intercept requests to `/healthz`.
- **Method Check**: The middleware checks the request method. If it's anything other than GET, it responds with a 405 status.
  
  When database service is stopped:![[Pasted image 20240129004259.png]]
  
  When PUT request is tried:
  ![[Pasted image 20240129004420.png]]
- **Integration**: Integrated the middleware into the Express app, ensuring it executes after the route definitions.

### Code Snippet

```ts 
function methodNotAllowed(req, res, next) {   
    if (req.originalUrl === '/healthz' && req.method !== 'GET') {     
        res.status(405).send('Method Not Allowed');   
    } else {
        next();   
        } 
}  
```

### Testing

- Performed testing with different HTTP methods (POST, PUT) to verify that the endpoint correctly returns a 405 status.
- Ensured GET requests work as expected without interference.

## 2. Code Prettification Pre-commit Hook

### Objective

Automatically format code to meet predefined styling guidelines using Prettier before each commit.

### Implementation

- **Prettier Setup**: Configured Prettier with a `.prettierrc` file specifying our coding style preferences.
- **Husky and lint-staged**: Installed and configured Husky along with lint-staged to run Prettier on staged files.
- **Pre-commit Hook**: Set up a pre-commit hook that triggers the lint-staged process.

### Configuration Snippet

```json
// package.json 
"husky": {   
    "hooks": {     
        "pre-commit": "lint-staged"   
        } 
    }, 
"lint-staged": {   
    "*.{js,jsx,ts,tsx,json,css,md}": "prettier --write" 
    }
```

### Testing

- Made changes to various files and staged them for commit.
- Verified that the pre-commit hook automatically formats the staged files.
- Ensured that commits proceed only if the files are properly formatted.