"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

/******************************************************************************
 * Story: a single story in the system
 */

class Story {

  /** Make instance of Story from data object about story:
   *   - {title, author, url, username, storyId, createdAt}
   */

  constructor({ storyId, title, author, url, username, createdAt }) {
    this.storyId = storyId;
    this.title = title;
    this.author = author;
    this.url = url;
    this.username = username;
    this.createdAt = createdAt;
  }

  //Fetchig a story from the api usign static method
  static async getStory(storyId) {
    const response = await fetch(`${BASE_URL}/stories/${storyId}`, {
      method: "GET",
    });
    const storyData = await response.json();
    const fetchedStory = storyData.story;
    return new Story(fetchedStory);
  }

  /** Parses hostname out of URL and returns it. */

  getHostName() {
    // UNIMPLEMENTED: complete this function!
    return new URL(this.url).host;
  }
}


/******************************************************************************
 * List of Story instances: used by UI to show story lists in DOM.
 */

class StoryList {
  constructor(stories) {
    this.stories = stories;
  }

  /** Generate a new StoryList. It:
   *
   *  - calls the API
   *  - builds an array of Story instances
   *  - makes a single StoryList instance out of that
   *  - returns the StoryList instance.
   */

  static async getStories() {
    // Note presence of `static` keyword: this indicates that getStories is
    //  **not** an instance method. Rather, it is a method that is called on the
    //  class directly. Why doesn't it make sense for getStories to be an
    //  instance method?

    // query the /stories endpoint (no auth required)
    const response = await fetch(`${BASE_URL}/stories`, {
      method: "GET",
    });
    const storiesData = await response.json();

    // turn plain old story objects from API into instances of Story class
    const stories = storiesData.stories.map(story => new Story(story));

    // build an instance of our own class using the new array of stories
    return new StoryList(stories);
  }

  /** Adds story data to API, makes a Story instance, adds it to story list.
   * - user - the current instance of User who will post the story
   * - obj of {title, author, url}
   *
   * Returns the new Story instance
   */

  async addStory(user, { title, author, url}) {
    const token = user.loginToken;

    const response = await fetch(`${BASE_URL}/stories`, {
      method: "POST",
      body: JSON.stringify({ token, story: { title, author, url } }),
      headers: { "content-type": "application/json", }
    });
    
    const storyData = await response.json();
    console.log("ADD STORY DATA", storyData);

    const story = new Story(storyData.story);
    this.stories.unshift(story);
    user.ownStories.unshift(story);

    return story;
  }

  //Delete story from lists and API
  async removeStory(user, storyId) {
    const token = user.loginToken;

    await fetch(`${BASE_URL}/stories/${storyId}`, {
      method: "DELETE",
      body: JSON.stringify({ token }),
      headers: { "content-type": "application/json", }
    });

    //once ID is removed, filter out the story
    this.stories = this.stories.filter(story => story.storyId !== storyId);

    //We will do the same thing for the user's story lists and favs
    user.ownStories = user.ownStories.filter(s => s.storyId !== storyId);
    user.favorites = user.favorites.filter(s => s.storyId !== storyId);
  }
}


/******************************************************************************
 * User: a user in the system (only used to represent the current user)
 */

class User {
  /** Make user instance from obj of user data and a token:
   *   - {username, name, createdAt, favorites[], ownStories[]}
   *   - token
   */

  constructor({
                username,
                name,
                createdAt,
                favorites = [],
                ownStories = []
              },
              token) {
    this.username = username;
    this.name = name;
    this.createdAt = createdAt;

    // instantiate Story instances for the user's favorites and ownStories
    this.favorites = favorites.map(s => new Story(s));
    this.ownStories = ownStories.map(s => new Story(s));

    // store the login token on the user so it's easy to find for API calls.
    this.loginToken = token;
  }

  /** Register new user in API, make User instance & return it.
   *
   * - username: a new username
   * - password: a new password
   * - name: the user's full name
   */

  static async signup(username, password, name) {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      body: JSON.stringify({ user: { username, password, name } }),
      headers: { "content-type": "application/json", }
    });

    const userData = await response.json();
    const {user} = userData;

    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }

  /** Login in user with API, make User instance & return it.

   * - username: an existing user's username
   * - password: an existing user's password
   */

  static async login(username, password) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      bosy: JSON.stringify({user: { username, password }}),
      header: {"content-type": "application/json"}
    });

    const userData = await response.json();
    const {user} = userData;

    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      userData.token
    );
  }

  /** When we already have credentials (token & username) for a user,
   *   we can log them in automatically. This function does that.
   */

  static async loginViaStoredCredentials(token, username) {
    try {
      const tokenParams = new URLSearchParams({token});

      const response = await fetch(`${BASE_URL}/users/${username}?${tokenParams}`, {
        method: "GET"
        }
      );

      const userData = await response.json();
      const {user} = userData;

      return new User(
        {
          username: user.username,
          name: user.name,
          createdAt: user.createdAt,
          favorites: user.favorites,
          ownStories: user.stories
        },
        token
      );
    } catch (err) {
      console.error("loginViaStoredCredentials failed", err);
      return null;
    }
  }

  //Add story to favs and update API
  async addFavorites(story) {
    this.favorites.push(story);
    await this._addOrRemoveFavorites("add", story);
  }

  //Remove story from favs and update API
  async removeFavorites(story) {
    this.favorites = this.favorites.filter(s => s.storyId !== story.storyId);
    await this._addOrRemoveFavorites("remove", story);
  }

  //Update API when story is fav or not
  async _addOrRemoveFavorites(newState, story) {
    const method = newState === "add" ? "POST": "DELETE";
    const token = this.loginToken;

    await fetch(`${BASE_URL}/users/${this.username}/favorites/${story.storyId}`, {
      method: method,
      body: JSON.stringify({token}),
      headers: {"content-type": "application/json", }
    });
  }
  
  //check if a story is fav
  isFavorite(story) {
    return this.favorites.some(s => (s.storyId === story.storyId));
  }
}
