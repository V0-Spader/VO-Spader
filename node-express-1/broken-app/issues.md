# Broken App Issues

```Asynchronous Operations: The map function doesn’t wait for promises to resolve. So, results will be an array of promises, not the responses. You should use Promise.all to wait for all promises to resolve.```

```Error Handling: The catch block is missing an argument for the error object. It should be catch(err).```

```Middleware: Express.js doesn’t parse the body of HTTP requests by default. You need to use middleware like express.json() or body-parser to parse the JSON body of the request.```