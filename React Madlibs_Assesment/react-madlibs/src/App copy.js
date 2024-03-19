import './App.css';
import Form from './components/Form';
import FormInput from './components/FormInput';

function App() {
  return (
    <div className="App">
      <h1>Sign Up</h1>

      <Form formInitialValues={{
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: ''
      }}>
        <FormInput 
          label="First Name" 
          name="firstName" />
        <FormInput 
          label="Last Name" 
          name="lastName" />
        <FormInput 
          label="Email Address" 
          type="email" 
          name="emailAddress" />
        <FormInput 
          label="Password" 
          type="password" 
          name="password" />
      </Form>


      <br />
      <Form formInitialValues={{
        username: '',
        password: ''
      }}>
        <FormInput
          label="Username"
          name="username" />
        <FormInput
          label="password"
          name="password"
          type="password" />
      </Form>

    </div>
  );
}

export default App;
