# Share-itage
Does your family have a box of old handwritten, passed-down recipes?
Do you have an inbox folder filled with nondescript links to your current favorite recipes?

Share-itage makes it extremely easy to consolidate your recipe collection and share it with your family and friends who may be hundreds of miles away.
Upon registering, you're prompted to create a "family" in order to start using the app. After your family has been created, you can start adding your recipes using the "Add Recipe" button located in the side panel. All recipes will be accessible through the "Find a Recipe" page. When you click on a recipe card, you're shown all recipe details including ingredients, amounts, and instructions. From there, you can add notes, suggestions, or memories to any given recipe by clicking the "view comments" button at the top of each recipe. These notes will be viewable by anyone else in your "family", where they can also interact with the recipes. If you notice that you need to make a run to the grocery store for a few of the ingredients, simply click the "+" button next to the ingredient and a grocery list will appear in your side panel. Each user is given a personal "My Favorites" page, making it quick and easy to access recipes without having to go through the entire recipe book. Don't know what to make or want to try something new? The "Random Recipe" page will generate a random recipe from your "family's" cookbook. If you've created your family's account, you're automatically made an admin and have access to the "Admin Panel." From there, you can generate a unique registration link to send out to your family and friends. They simply visit the link and register for the app and are automatically added to your account, giving them access to all of your recipes. Each registration link is good for 30 minutes. Also from the "Admin Panel" you can view all members in your family, update their admin status, or remove them from the family completely. Each member of the family can add recipes to the account. All admins have the ability to edit and delete recipes, and each recipe creator has the ability to edit their own recipes.

Cooking, baking, and recipe sharing has always been a prominent passtime in my family.
We enjoy the tradition of old family recipes, but also enjoy updating those recipes, and finding new ones all together.
Between texting pictures of recipes back-and-forth, to bookmarking or saving links in an email folder, sharing our favorite recipes has never
been an easy task. It's a very disorganized process and often, actually makes it harder to go back and find something we've previously enjoyed.

I created Share-itage so that families have a quick, convenient, and fun way to not only share their recipes with each other, but interact with them as well.

## Duration: 
3 Week Sprint

## Screen Shots
![Recipes Page](/public/images/Share-itage-RecipesPage.png)
![Admin Panel](/public/images/Share-itage-AdminPage.png)

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `share-itage_app` 
SQL Setup for database tables can be found in the `database.sql` file

## Development Setup Instructions

- Run `npm install`
- Run `npm install crypto-random-string`
- Run `npm install react-copy-to-clipboard`
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Technologies Used
- React
- Redux
- Express
- Postgresql
- Node.js
- PG
- Javascript
- CSS
- HTML
- Passport
- Crypto-Random-String
- react-copy-to-clipboard
(a full list of dependencies can be found in `package.json`)

## Acknowledgement
Thanks to Casie Siekman for teaching me how to do all this awesome stuff and to all the staff and faculty at Prime Digital Academy who gave me the opportunity to
make this application a reality.
Thanks to my family for the ongoing, unconditional love and support in all my endeavors.

## Support
If you have suggestions or issues, please contact me at bryanhighhill@gmail.com







## TO-DO
<!-- ## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5001` -->



<!-- ## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy -->

