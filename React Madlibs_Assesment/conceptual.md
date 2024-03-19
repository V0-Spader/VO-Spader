### Conceptual Exercise

Answer the following questions below:

- `What is React? When and why would you use it?
- ``React is a JavaScript library developed by Facebook that allows developers to build user interfaces (UIs) for web and mobile applications``
- ``You use react when you want to build reusable components that can be shared across different parts of an application``
- ``You use it for its simplicity and efficiency``

- What is Babel?
- ``Babel takes (ES6+) code and transforms it into a version that is backward-compatible with older browsers or environments.``
  ``Essencialy it ensures that your web applications run smoothly across different browsers, regardless of their varying levels of support for     new language features.``

- What is JSX?
- ``JSX (JavaScript Syntax Extension): React uses JSX, which resembles HTML templates but is actually JavaScript. It allows developers to describe UI components in a more readable and declarative way.``

- How is a Component created in React?
- ``Define a function or class that returns JSX.``
  ``Export the component using export default.``
  ``You can then import and use your component in other parts of your application.``

- What are some difference between state and props?
- ``Props are for data transfer and are read-only.``
  ``State is for managing internal data and is mutable.``
  ``Both are essential for building dynamic and interactive React applications``

- What does "downward data flow" refer to in React?
- ``n React, data flows unidirectionally from parent components to child components.``

- What is a controlled component?
- ``Controlled components are those where form data is managed by the component’s state``

- What is an uncontrolled component?
- ``Uncontrolled components are those where form data is managed by the DOM itself``

- What is the purpose of the `key` prop when rendering a list of components?
- ``The key prop is a unique identifier assigned to elements within an array (such as when rendering a list)``
- ``It gives each element a stable identity``

- Why is using an array index a poor choice for a `key` prop when rendering a list of components?
- ``Lack of Stability: Array indices are not stable across renders``
- ``Reordering: If items are reordered, React may mistakenly think they are different components due to the changed index``
- ``Performance Impact: Using array indices can lead to unnecessary re-renders and negatively impact performance``

- Describe useEffect.  What use cases is it used for in React components?
- ``a React Hook that allows you to synchronize a component with an external system. It’s commonly used for handling side effects in your components``
- ``Cases: Fetching Data, Subscribing to Events, Updating the DOM, Timers and Intervals, Cleanup Logic``

- What does useRef do?  Does a change to a ref value cause a rerender of a component?
- ``useRef allows you to create a mutable reference to a value that persists across re-renders, so no it doesn't rerender``

- When would you use a ref? When wouldn't you use one?
- `` You use a ref for Accessing DOM Elements, Storing Previous Values, Avoiding Re-creation``
- ``You wouldnt use to many refs because this could overcomplcate your code making hard to understand and maintain``

- What is a custom hook in React? When would you want to write one?
- ``A custom hook in React is a reusable function that encapsulates stateful logic and can be shared across multiple components``
- ``You would use a custom hook for Abstracting Logic, Sharing Stateful Logic, and Keeping Components Clean``
