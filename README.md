## Install the dependecies

```shell
npm install --production
```

Then add start the app:

```html
node app.js
```

## Enable the app

http://localhost:3000

## Documentation

/app    - development files
/public - production files

I didn't setup any task runner like grunt or gulp since i managed it in my IDE (Webstorm) with the following criterias:
- any js file change browserify/minify to /public/build.js
- any less file change compile/minify to /public/app.min.css
- any html file change copy it to /public/views/*

# Publishing
Websocket is open for listening any data changes.
CRUD REST
First time the app load the init data from the jsonblob url.
I didn't setup any database engine to store the data, but for the testing store/manage them in a private varible.

# Chart
Websocket is open for listening any data changes.
The data itself cant't change on the UI, since you can check this type of my skills in the publishing modul.
Built a randomize event to change the data (every 15 seconds) on server side and can see how the UI following the changes.