# website
---

new website



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
---

To build the production bundle, run

```
npm run prod
```

This will generate the `/dist` directory to be sent to the web server.
