### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  `` Callbacks, Promises, Async/Await and Workers are all ways to manage async code ``

- What is a Promise?
  `` A Promise is an object representing the eventual completion or failure of an async operation. It's a placeholder for the eventual results``

- What are the differences between an async function and a regular function?
  `` A regular function returns the calue that was specified in the return statement, An async function returns a promise. Also Regular functions run synchronously.``

- What is the difference between Node.js and Express.js?
  `` Node: IS not a frame work or programming langueage, it is a runtime environment for executing server-side JS code.``
  `` Express: Is a frame work that is atop Node.js. It helps simplify the process of building web apps by handling api requests easier than node alone.``

- What is the error-first callback pattern?
  `` A cenvention used in Node.js for handling errors in Async operations. The first argument of the callback function is reserved for an error object``

- What is middleware?
  `` Sometimes reffered to as "plumbing", it's a type of software that sits between applications and platforms, it connects tow apps together so data and db's can easily pass between.``

- What does the `next` function do?
  `` A key part of middleware, next, when invoked, tells Express.js that the current middleware has completed and the next middleware in the stack can be called, wither that be an Async operation or error handling.``

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
`` Performance: The await keyword is used to pause the execution of the function until the Promise is resolved. In your code, you’re awaiting each request one after the other, which means the total time taken is the sum of all requests. These requests are independent of each other and could be made in parallel to improve performance. You can use Promise.all to wait for all the promises to resolve.``

``Error Handling: There’s no error handling in your code. If any of the requests fail, an unhandled promise rejection will occur. You should wrap your code in a try-catch block to handle potential errors.``

``Hardcoding: The usernames are hardcoded into the function. It would be more flexible to pass the usernames as parameters to the function.``

``Naming: The function name getUsers is fine, but the variable names elie, joel, and matt could be more descriptive. Consider using names that describe the data they hold, like user1, user2, and user3, or even better, an array of users. ``

``revised Code:``

``` JS
async function getUsers(usernames) {
  try {
    const users = await Promise.all(usernames.map(username => 
      $.getJSON(`https://api.github.com/users/${username}`)
    ));
    return users;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

getUsers(['elie', 'joelburton', 'mmmaaatttttt']);
```