# BANDIT NSI UI

# Description

This repository contains the code related to the National Statistics Institute which is used to publish statistics reports

# Run the application

## Prerequisites 
You don't need much in order to run the application:
* [NodeJS 18.15 LTS](https://nodejs.org/dist/v18.15.0/node-v18.15.0-x64.msi)
* NPM (which you should install alongside the previously mentioned NodeJS

In the project's root directory, you then need to run the following command
```shell
npm i
```

## Run the code
### Debug
To debug the code, you can simply run
```shell
npm run start
```

The code should transpile and be run without any extra step: though the webpage should be opened automatically in your default browser, the default URL is [http://localhost:3000](http://localhost:3000).

You may want to open an editor to go further, both JetBrains WebStorm or Visual Studio Code are good options but anything will do the job.

Since you probably want to run this application along with the bandit-acs, you will need to provide the backend's URL. You can do this two ways :
* Edit the public/env-config.js file to provide the URL
* Edit the .env file and run the env-variables.sh script, which should regenerate the env-config.js

### Production

The application's intent is to be run as a docker container. To build the container, it is quite easy:
Run the docker-build.ps1 script, which will prompt you for a new version. The image will be built and pushed over to [Space](https://space.tristesse.lol), which will make you able to pull or deploy it in an easier way without you having to worry about anything at all.