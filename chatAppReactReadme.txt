1. open empty folder chat-app
2. mkdir client and inside it, run create-react-app ./	-- creates a react app in the client folder.
3. mkdir server and inside it, run npm init -y		-- Initializes package.json file.
4. inside server, install dependencies with command, npm install --save cors nodemon express socket.io
5. inside client, install dependencies with command, npm install --save react-router-dom socket.io-client react-scroll-to-bottom react-emoji query-string
6. add ""start": "nodemon index.js"" inside the scripts section in package.json inside server folder.
7. delete src folder and create src folder again inside client folder adding "index.js" and "App.js" in the src folder.


-- deploying both server and client side of chat application------
1. deploy server to "Heroku". Login with hemant_2182_fresco@yahoo.com and "Fac3l3ss-1990"
	click create an app
	provide the name of the app
	click create app button
	Download the Heroku CLI
	heroku login
	heroku git:remote -a react-chat-messaging-app
	git push heroku master

	Sometimes this might not work. So, always add "Procfile" to your project. this let's heroku know that you are working with node.js 	application. add below lines to the file.
	web: node index.js
	
	Also inside of package.json file for you node.js application, remove nodemon from the scripts start section and replace it with node.
	"scripts": {
    		"start": "node index.js",
    		"test": "echo \"Error: no test specified\" && exit 1"
  	},
	go to the settings of the app to find the server url. https://react-chat-messaging-app.herokuapp.com/

2. deploy client to "netlify"
	Copy the heroku server url from your application and make changes to client to point to that server url.
	npm install netlify-cli -g
	Create account on netlify and login. Login with hemant_2182_fresco@yahoo.com and "Fac3l3ss-1990"
	Drag and Drop your client folder to netlify
	netlify login
	netlify status -> for netlify account status
	netlify help -> to see all help commands
	netlify deploy -> this ask a question like "Link this directory to an existing site || create and configure a new site."
			Select "create and configure a new site"
			Select the team
			Site name (optional)
			Publish Directory -> get out of this. do not perform this action. before doing this, run command "npm run build" to create 				a build folder for your react application. this will generate a new folder called build in the application directory.
			This is the folder tha we want to deploy.

			Specify publish directory as './build' -> this will  give you a url for your site and things work like a charm.
	
	After this, verify the functionality of the application on the url given. if works fine then run below command
	netlify deploy --prod 
	Specify publish direactory as './build'
	

