### Conceptual Exercise

Answer the following questions below:

- What is the purpose of the React Router?
- ``React Router is a standard library specifically designed for routing in React applications.``
- ``It enables navigation among different views or components within a single-page application.``

- What is a single page application?
- ``A single-page application (SPA) is a web application or website that interacts with the user by dynamically rewriting the current web page with new data from the web server, instead of the default method of a web browser loading entire new pages``

- What are some differences between client side and server side routing?
- ``Client-side routing is ideal for SPAs, dynamic content, and apps where fast transitions matter.``
- ``Server-side routing is better for SEO, static content, and when initial load time is critical.``

- What are two ways of handling redirects with React Router? When would you use each?
- ``The recpmmended way is the Navigate component: Use the Navigate component when you want to perform redirects in response to data``
- ``Another is useNavigate Hook is another: Use the useNavigate hook when you need to trigger a redirect based on user interactions or other dynamic conditions.``

- What are two different ways to handle page-not-found user experiences using React Router? 
- ``Using a Catch-All Route or a wild card route, this route will be rendered when no other route mathces the requested URL``
- ``Creating a custom 404 component``

- How do you grab URL parameters from within a component using React Router?
- ``you can 'useParams' Hook``

- What is context in React? When would you use it?
- ``React context provides a way to pass data down through the component tree to where it’s needed without using props.``
- ``React context is great when passing data that can be used in muitple components.``

- Describe some differences between class-based components and function
  components in React.
  ``Syntax: Function components are simpler and more concise, using arrow functions or regular functions.``
  ``State Handling: Class components use this.state, while function components use hooks like useState.``
  ``Lifecycle Methods: Class components have lifecycle methods, whereas function components use useEffect for side effects.``
  ``Readability: Function components are easier to read and understand due to their straightforward syntax.``
  ``Performance: Function components are generally more performant because they avoid the overhead of class instantiation.``

- What are some of the problems that hooks were designed to solve?
- ``Complex component logic, state managment in functional components, code reuse and compostion, lifecycle methods complexity and avoiding class boilerplate jsut to name a few.``