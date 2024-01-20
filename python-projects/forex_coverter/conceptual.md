### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?  
  - Python is a programming language that is integral to back end development, helping with the creation and interaction with servers. It interacts mostly with the terminal as opposed to interacting directly with the browser. It is more concerned with server side programming.  
  - Javascript on the other hand is a language integral to front end web development, interacts with the browser and is used to create functional and dynamic interactive websites. It is more concerncerned with the client side and user experience.

- Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you
  can try to get a missing key (like "c") *without* your programming
  crashing.
  - The first way would be to call the ``dict.get()`` method on this dictionary and pass in a default value like so:  
  ``simple_dict = {"a": 1, "b": 2}``  
  ``simple_dict.get("c", default value)``  
  - The other way would be be to use the ``dict.setdeafault()`` method, it works similar to the ``dict.get()`` method:  
  ``simple_dict = {"a": 1, "b": 2}``  
  ``simple_dict.setdefault("c", default value)``

- What is a unit test?  
  This is a test used to test one unit of functionality, typically one function or method.

- What is an integration test?  
  This is used to test that all the components of an app work well together.

- What is the role of web application framework, like Flask?  
  Web frameworks are a collection of the foundational tools necessary for web development. Flask maps URLs to the code they are requesting, connects to a database, creates and serves up customizable HTML templates, stores state information in a session, provides testing and debugging tools, and much more. 

- You can pass information to Flask either as a parameter in a route URL
  (like '/foods/pretzel') or using a URL query param (like
  'foods?type=pretzel'). How might you choose which one is a better fit
  for an application?  
  There isn't really a best practice per say, it depends on the situation. Generally if you need to describe the object or resource your are on, I'd advise using query params because it is a more clear and organized syntax but putting these parameters in the route url work just as well.

- How do you collect data from a URL placeholder parameter using Flask?  
  You specify the parameter in the route and then you go ahead and use that parameter as a variable in the view function like so:  
  ``app.route("food/<grocery>")``  
  ``def food_search(grocery):``  
          ``food = grocery``

- How do you collect data from the query string using Flask?  
  For a query string, the data can be found in the ``response.args`` dictionary.

- How do you collect data from the body of the request using Flask?  
  For a post requets, the data can be found in the ``response.form`` dictionary.

- What is a cookie and what kinds of things are they commonly used for?  
  Cookies are a way to store small bits of information on client side(browser). Cookies are stored as a name/string-value pair.

- What is the session object in Flask?  
  The session object is built off of using cookies. It allows the server to set different things in the session for the client to remember wihout having to create different cookies. It is also encypted so that the user can't change session data on the client side before sending it to the server.

- What does Flask's `jsonify()` do?  
  ``jsonify()`` takes data and converts it to ``JSON`` in ``Python``.