import {useEffect, useState} from 'react';
import {verbs, nouns} from '../utils/util';
import { Link } from 'react-router-dom';
import App from '../App';

export default function PredictiveText() {

  const random = (array) => {
    let index = Math.floor(Math.random() * array.length);
    return array[index];
  }

  const [form, setFormData] = useState({
    verb: '',
    noun: '',
  })

  const [reveal, setReveal] = useState(false);

  useEffect(()=> {
    setFormData(prevState => {
      return {
        ...prevState,
        verb: random(verbs),
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
        <h1>Predictive Text</h1>

        <form onSubmit={(event)=> handleSubmit(event)}> 

          <label htmlFor="verb">verb:</label>
          <input id="verb" type="text" name="verb" placeholder="verb" value={form.verb} onChange={handleChange} />

          <label htmlFor="noun">noun:</label>
          <input id="noun" type="text" name="noun" placeholder="noun" value={form.noun} onChange={handleChange}  />
     
          <button>Go Mad!</button>
        </form>
        {reveal && <div><br/><br /><div>Hi. I {form.verb} thru the list  and forgot the {form.noun}.</div><button onClick={handleRestart}>Restart</button></div>}
      </main>
    );
}