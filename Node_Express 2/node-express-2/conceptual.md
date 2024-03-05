### Conceptual Exercise

Answer the following questions below:

- What is a JWT?
  ``JSON Web Token``

- What is the signature portion of the JWT?  What does it do?
- `` It is used to verify the authenticity and integrity of the JWT and In essence, the signature ensures that the data contained in the JWT has not been tampered with, providing a level of trust between the parties involved in the communication``

- If a JWT is intercepted, can the attacker see what's inside the payload?
- ``yes, that's why encyption is important``

- How can you implement authentication with a JWT?  Describe how it works at a high level.
- ``User Login: The user provides their credentials (like a username and password) to the server.``
``Token Generation: If the credentials are valid, the server generates a JWT. This token includes a header, a payload (which often contains user information and any necessary metadata), and a signature. The server creates the signature by using a secret key to sign the combination of the header and payload.``
``Token Issuance: The server sends the generated JWT back to the client.``
``Token Storage: The client stores the JWT, often in local storage or a cookie.``
``Authenticated Requests: For subsequent requests to the server, the client attaches the JWT as an Authorization header. The server checks the signature of the incoming JWT to verify its authenticity.``
``Server Response: If the token is valid, the server processes the request and sends a response back to the client.``
``Token Expiration and Refresh: JWTs often have an expiration time. When a token expires, the server can issue a new one if the client provides a valid refresh token``

- Compare and contrast unit, integration and end-to-end tests.
- ``Unit testing is the most common used on individual modules or APIs. Of the three it is the least complex. Intergration testing is used more than E2E but less than unit, like unit it is used more modules and API interaction. However its scope also extends to interfaces and how data flows between the modules. E2E's scope is ALL sub-sytems, network dependencies, services and DBs. E2E is manual as compared to Unit which is more automated. Integration can be either or. E2E is also the most complex. In general, a good balance of all 3 is important for comprehensive coverage. ``

- What is a mock? What are some things you would mock?
- ``A mock, in software engineering, is a simulated object or module that acts as a stand-in for a real object or module``
- ``If your code interacts with external services (like a REST API), you can mock these to ensure your tests aren’t reliant on the availability or behavior of these services``

- What is continuous integration?
- ``Continuous Integration (CI) is a software development practice where developers regularly merge their code changes into a central repository, after which automated builds and tests are run``

- What is an environment variable and what are they used for?
- ``An environment variable is a dynamic “object” on a computer, containing an editable value, which may be used by one or more software programs``
- ``They are used for storing config data, setting the env type and storing App secrets (passwords and API keys)``

- What is TDD? What are some benefits and drawbacks?
- ``Test Driven Development, where developers write test code before the actual code they will be testing``
- ``Pros: Incourages the optimization of modular code, easier to maintain and refactor, less debugging``
- ``Cons: Additional time and effort, Difficulty with legacy code, requires clear requirements, overemphasis on testing``

- What is the value of using JSONSchema for validation?
- ``Schema provides a clear and concise mechanism to validate the structure of JSON data, it ensures consistency of data across different parts of a system, can be used to automate the validation of responses in APU testing and can serve as documentation for your data``

- What are some ways to decide which code to test?
- ``It's important to do a risk assessment, code that is critical for the operation of the app should be thoroughly tested. Code with many possible execution paths should be thoroughly tested, past bug issues should be tested, and of coarse and new or modified code as well``

- What does `RETURNING` do in SQL? When would you use it?
- ``The RETURNING clause in SQL is used in INSERT, UPDATE, or DELETE statements to return values of the modified rows and you would use it to avoid extra queries, retieve multiple rows also with agg functions``

- What are some differences between Web Sockets and HTTP?
- ``WebSockets and HTTP are both communication protocols used in client-server communication``
- ``In HTTP, each request opens a new TCP connection to the server, and the connection gets closed after the response is received, however, In WebSockets once a connection is established, it stays open until it is explicitly closed``

- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)?
