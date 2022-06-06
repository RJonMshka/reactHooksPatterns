import logo from './logo.svg';
import './App.css';
import Expandable from './Components/Expandable';

function App() {
  return (
    <div className="App">
      <Expandable onExpand={console.log}>
        <Expandable.Header>Exp Header</Expandable.Header>
        <Expandable.Icon />
        <Expandable.Body>Exp Body</Expandable.Body>
      </Expandable>
    </div>
  );
}

export default App;
