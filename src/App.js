
import './App.css';
import { Graphs } from './js-graph';
import img from './assets/images/graph.png'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Graphs>
          <img src={img} alt='asdasdasd' style={{height: 300}} />
          <br />
        </Graphs>
      </header>
    </div>
  );
}

export default App;
