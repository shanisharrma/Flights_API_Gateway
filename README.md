This is a base node js project template, which anyone can use as it has been prepared, by keeping some of the most important code principles and project management recommendations. Feel free to change anything.

`src` -> Inside the src folder all th actual source code regarding the project will reside, this will not include any kind of test. (You might want to make separate tests folder.)

Lets take a look inside the `src` folder

- `config` -> In this folder anything and everything regarding any configuration of setup of a library or module will be done. For example: setting up `dotenv` so that we can use the environment variables anywhere in a cleaner fashion, this is done in the `server-config.js`. One more example can be to setup you logging library that can help you prepare meaningful logs, so configuration for this library should also be done here.

- `routes` -> In this routes folder, we register a route and binds the corresponding middleware and controller to it.

- `middlewares` -> They are just going to intercept the incoming requests where we can write our validators, authenticators, etc.

- `controllers` -> They are kind of the last middlewares as post them you call your business layer to execute the business logic. In controllers we jus receive the incoming requests and data and then pas it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output.

- `repositories` -> This folder contains all the logic using which we intercept the DB by writing queries, all the raw queries or ORM queries will go here.

- `services` -> This folder contains all the business logic and intercepts with repositories for data from the database.

- `utils` -> This folder contains helper methods, error classes, etc.

### Setup teh project

- Download this template from github and open it in your favorite text editor.
- Go inside the root folder path and execute the following command:

```
npm install
```

- In the root directory create a `.env` file and add the following env variables
  ```bash
  PORT=<port number of your choice>
  ```
  ex:
  ```bash
  PORT=5000
  ```
- Inside the `src/config` folder and execute the following command:

```bash
    npx sequelize init
```

- By executing the following command you will get migrations and seeders folder along with a `config.json` inside the `config` folder

- If you are setting up your development environment, then write the username of your db, username of your db, and in dialect mention whatever db you are using for ex:
  mysql, mariadb, etc.
- If you are setting up test or prod environment, make sure you also replace the host with the hosted db url.

- To run the server execute

```bash
npm run dev
```
