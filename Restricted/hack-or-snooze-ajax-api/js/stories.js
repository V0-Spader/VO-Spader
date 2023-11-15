"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 * - showDeleteBtn: decides if there should be one or not
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, showDeleteBtn = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

//show fav/not-fav star if logged in
const showStar = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
        ${showDeleteBtn ? getDeleteBtnHTML() : ""}
        ${showStar ? getStartHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

//Delete BTN HTML
function getDeleteBtnHTML() {
  return `<span class="waste-bin">
            <i class="bi bi-bin"></i>
          </span>`;
}

//Make the fav star
function getStarHTML(story, user) {
  const isFav = user.isFav(story);
  const starType = isFav ? "-fill" : "";
  return `<span class="star">
            <i class="bi bi-star${starType}"></i>
          </span>`;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

//Deleting a story
async function deleteStory(evt) {
  console.debug("deleteStory");

  const $closestLi = $(evt.target).closest("li");
  const storyId = $closestLi.attr("id");

  await storyList.removeStory(currentUser, storyId);

  //re-pop story list
  putStoriesOnPage();
}

$ownStories.on("click", ".waste-bin", deleteStory);

//Submit new story form
async function submitNewStory (evt) {
  console.debug("submitNewStory");
  evt.preventDefault();

  //form info
  const title = $("#create-title").val();
  const url = $("#create-url").val();
  const author = $("#create-author").val();
  const username = currentUser.username;
  const storyData = {title, url, author, username};
  const story = await storyList.addStory(currentUser, storyData);

  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  //reset and make form go away
  $submitForm.slideUp("slow");
  $submitForm.trigger("reset");
}

$submitForm.on("submit", submitNewStory);

//How list for user's own stories works
function pullUpOwnStories() {
  console.debug("pullUpOwnStories");

  $ownStories.empty();
  if(currentUser.ownStories.length === 0) {
    $ownStories.append("<h5>No Stories Added</h5>");
  } else {
    //loop through content and pull up own stories
    for (let story of currentUser.ownStories) {
      let $story = generateStoryMarkup(story, true);
      $ownStories.append($story);
    }
  }
  $ownStories.show();
}

//How Favs list and starring works
//First put favs lsit on page
function pullUpFavs() {
  console.debug("pullUpFavs");

  $favoritedStories.empty();
  if(currentUser.favorites.length === 0) {
    $favoritedStories.append("<h5>No Favs Added</h5>");
  } else {
    //loop through and pull up favs
    for(let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoritedStories.append($story);
    }
  }
  $favoritedStories.show();
}

//fav/ un-fav stories
async function toggleFav(evt) {
  console.debug("toggleFav");

  const $target = $(evt.target);
  const $closestLi = $target.closest("li");
  const storyId = $closestLi.attr("id");

  //Due to the 25 story min, older stories will not always show, so we fetch using a static method
  const story = await Story.getstory(storyId);

  //check if story is a fav
  if($target.hasClass("bi-star-fill")) {
    //toggle star(fav) off
    await currentUser.removeFavorite(story);
    $target.closest("i").toggleClass("bi-star-fill bi-star");
  } else {
    //toggle star(fav) on 
    await currentUser.addFavorites(story);
    $target.closest("i").toggleClass("bi-star bi-star-fill");
  }

  $storiesLists.on("click", ".star", toggleFav);
}
