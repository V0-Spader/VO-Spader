import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {months, properNouns, properNouns2, websites} from '../utils/util';
import App from '../App';

export default function Scunthorpe() {

  const random = (array) => {
    let index = Math.floor(Math.random() * array.length);
    return array[index];
  }

  const [form, setFormData] = useState({
    proper: '',
    proper2: '',
    website: '',
    month: ''
  })

  const [reveal, setReveal] = useState(false);

  useEffect(()=> {
    setFormData(prevState => {
      return {
        ...prevState,
        proper: random(properNouns),
        proper2: random(properNouns2),
        month: random(months),
        website: random(websites)
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
        <h1>Scunthorpe problem</h1>

        <form onSubmit={(event)=> handleSubmit(event)}> 
          <label htmlFor="proper">Proper Noun:</label>
          <input id="proper" type="text" name="proper" placeholder="first name" value={form.proper} onChange={handleChange}  />
     
          <label htmlFor="proper2">Proper Noun:</label>
          <input id="proper2" type="text" name="proper2" placeholder="last name" value={form.proper2} onChange={handleChange} />
     
          <label htmlFor="website">Website: </label>
          <input id="website" type="text" name="website" placeholder="website" value={form.website} onChange={handleChange} />
     
          <label htmlFor="month">Month: </label>
          <input id="month" type="text" name="month" placeholder="month" value={form.month} onChange={handleChange} />
     
          <button>Go Mad!</button>
        </form>
        {reveal && <div><br/><br /><div>In {form.month} 2008, {form.proper} {form.proper2} reported on social media that they were unable to create an account for {form.website}.</div><button onClick={handleRestart}>Restart</button></div>}
      </main>
    );
}
