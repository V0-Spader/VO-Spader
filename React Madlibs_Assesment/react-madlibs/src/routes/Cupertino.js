import {useEffect, useState} from 'react';
import {prefixes, nouns} from '../utils/util';
import { Link } from 'react-router-dom';
import App from '../App';

export default function Cupertino() {

  const random = (array) => {
    let index = Math.floor(Math.random() * array.length);
    return array[index];
  }

  const [form, setFormData] = useState({
    prefix: '',
    noun: '',
  })

  const [reveal, setReveal] = useState(false);

  useEffect(()=> {
    setFormData(prevState => {
      return {
        ...prevState,
        prefix: random(prefixes),
        noun: random(nouns),
      }
    })
  }, [])

  function handleChange(event){
    setFormData(prevState => {
      const {name, value} = event.target;
      return {
        ...prevState, 
        [name]: value
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setReveal(prev => !prev);
  }

  const handleRestart = () => {
    setReveal(prev => !prev);

  }

    return (
      <main>
        <Link to="/" element={<App />}>Back to Home</Link>
        <h1>Cupertino Effect</h1>

        <form onSubmit={(event)=> handleSubmit(event)}> 

          <label htmlFor="prefix">prefix:</label>
          <input id="prefix" type="text" name="prefix" placeholder="prefix" value={form.prefix} maxLength={5} onChange={handleChange} />

          <label htmlFor="noun">noun:</label>
          <input id="noun" type="text" name="noun" placeholder="first name" value={form.noun} onChange={handleChange}  />
     
          <button>Go Mad!</button>
        </form>
        {reveal && <div><br/><br /><div>{form.prefix}-{form.noun} doesn't exist in our dictionary.</div><button onClick={handleRestart}>Restart</button></div>}
      </main>
    );
}