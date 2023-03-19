import React from 'react';
import { useSelector } from 'react-redux';
import SidePanel from '../SidePanel/SidePanel';
import './AboutPage.css';
import open from '../../Images/recipe-box-front-open.jpg';
import closed from '../../Images/recipe-box-front-closed.png';

function AboutPage() {
  const user = useSelector(store => store.user);

  return (
    <div className="content-container">
      {user.username
        ? <div className="user-nav">
            <SidePanel />
          </div>
        : <div></div>
      }

      <div className="description-container">
        <h1 className={user.username ? "app-title" : "app-title-logged-out"}>About Share-itage</h1>

        <div className="images-container">
          <div className="image1">
            <img className="box-image" src={closed} />
          </div>
          <div className="image2">
            <img className="box-image" src={open} />
          </div>
        </div>

        <div className="app-tag">
          Share-itage is a web-app developed by <a href="https://www.bryanhighhill.com" target="_blank">Bryan Highhill</a>
        </div>

        <div className="questions-container">
          <div className="white-fill">
            Does your family have a box of old handwritten, passed-down recipes?
            <br />
            Do you have an inbox folder filled with nondescript links to your current favorite recipes?
            <br />
            <br />
            <b>Share-itage</b> makes it extremely easy to consolidate your recipe collection and share it with your family and friends who may be hundreds of miles away.
            Upon registering, you're prompted to create a "family" in order to start using the app. After your family has been created, you can start adding your
            recipes using the "Add Recipe" button located in the side panel. All recipes will be accessible through the "Find a Recipe" page. When you click on a
            recipe card, you're shown all recipe details including ingredients, amounts, and instructions. From there, you can add notes, suggestions, or memories
            to any given recipe by clicking the "view comments" button at the top of each recipe. These notes will be viewable by anyone else in your "family",
            where they can also interact with the recipes. If you notice that you need to make a run to the grocery store for a few of the ingredients, simply click
            the "+" button next to the ingredient and a grocery list will appear in your side panel. Each user is given a personal "My Favorites" page, making it
            quick and easy to access recipes without having to go through the entire recipe book. Don't know what to make or want to try something new? The "Random
            Recipe" page will generate a random recipe from your "family's" cookbook. If you've created your family's account, you're automatically made an admin and
            have access to the "Admin Panel." From there, you can generate a unique registration link to send out to your family and friends. They simply visit the link
            and register for the app and are automatically added to your account, giving them access to all of your recipes. Each registration link is good for 30 minutes.
            Also from the "Admin Panel" you can view all members in your family, update their admin status, or remove them from the family completely. Each member of the
            family can add recipes to the account. All admins have the ability to edit and delete recipes, and each recipe creator has the ability to edit their own recipes.
          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutPage;
