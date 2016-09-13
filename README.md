## Development
---



### Local Development
---

For local development we are using the Webpack Dev Server utility.
It holds the compiled assets in memory, so you will not see anything
being generated from your local machine.

After you clone the repo:

1. `npm install`

2. `npm run`

3. Navigate to: [http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/)

### Building for Production

Due to the nature of this project, handles for altering API call addresses
have been built into the build process.

Some example builds include:

`npm run prod:mars`

`npm run prod:saturn`

#### Passing custom build addresses

You may also provide any address provided as an argument to the long form of the build command.

`rimraf dist && apiEnv=ANY-ENVIRONMENT-LOCATION webpack -p --progress`

### Common libraries and tools
---

1. [React Bootstrap](https://react-bootstrap.github.io/getting-started.html)
2. [Bootstrap CSS](http://getbootstrap.com/)
3. [React Router](https://github.com/reactjs/react-router)
4. [React](https://facebook.github.io/react/)



### Building for Production
---

To build the production bundle, run

`npm run prod`

This will generate the `/dist` directory to be sent to the web server.
