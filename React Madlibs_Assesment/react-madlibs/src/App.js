import './App.css';
import { Link } from "react-router-dom";
import Scunthorpe from './routes/Scunthorpe';
import Cupertino from './routes/Cupertino';
import PredictiveText from './routes/PredictiveText';

function App() {

  return (
    <div className="App">
      <h1>Mad-Takes in React</h1>
      <p>Create a madlib by clicking on any topic below</p>

      <Link to="/scunthorpe" element={<Scunthorpe />}>Scunthorpe Problem</Link>
      <br />
      <Link to="/cupertino" element={<Cupertino />}>Cupertino Effect</Link>
      <br />
      <Link to="/predictiveText" element={<PredictiveText />}>PredictiveText</Link>
    </div>
  );
}

export default App;
