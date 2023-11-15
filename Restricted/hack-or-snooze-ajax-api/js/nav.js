"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

//Show the story submit form when clicked
function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
}

$navSubmitStory.on("click", navSubmitClick);

//Show fav stories on click
function navFavsClick(evt) {
  console.debug("navFavsClick", evt);
  evt.preventDefault();
  hidePageComponents();
  putFavoritesListOnPage();
}

$body.on("click", "#nav-favorites", navFavsClick);

//Show own stories on click
function navOwnStories(evt) {
  console.debug("navOwnStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
  $ownStories.show();
}

$body.on("click", "nav-my-stories", navOwnStories);

//Show login or signup on click
function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

//Hide all but profile on click
function navProfileClick(evt) {
  console.debug("vanProfileClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $userProfile.show();
}

$navUserProfile.on("click", navProfileClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
