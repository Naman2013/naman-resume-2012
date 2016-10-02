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

### URL's and Path Building

This project requires that we use relative paths to assets.  The Webpack build process
will automatically copy the assets directory and include it in dist for you.  That means
whenever you need to reference an asset, use the relative path:

`assets/{your-asset-path}`

### API's and Proxies

When working locally, the dev server has been configured to proxy to the
API server for you from the relative path for example:

`api/{your-api-path-here/?foo=bar&etc=etc}`

The build process also requires that your API calls begin with `api/` to be remapped
according to the production build process.

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

# Generating SSE URL's
---

### Example SSE URL:
---

`https://mars.slooh.com:3004/sse/teideallsky`

This url is constructed using properties from a telescopes information.  The telescope information
should include the `telePort` and `teleSystem` to build the link above.

Sample event data

[currentImgURL, previousImgURL, scheduledMissionId, missionStartTime, lastImgTime, currentServerTimestamp, systemStatus]

currentImgURL: The current image, also known as the bottom image

previousImgURL: The previous image, also known as the top image.

scheduledMissionId: Mission ID scheduled for that telescope.

missionStartTime: Start time for said mission.

lastImgTime: timestamp when the last image was captured at the observatory, IIRC.

currentServerTimestamp: the current server timestamp when the event was sent out.

systemStatus ( IN DEVELOPMENT ): a system status value that may be indicating online or offline
