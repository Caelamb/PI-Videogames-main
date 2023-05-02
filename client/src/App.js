import './App.css';
import Home from './views/home/Home';
import Form from "./views/form/Form";
import Detail from "./views/detail/Detail";

function App() {
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
      <Home exact path="/" component={Home}/>
      <Form exact path="/detail/:id" component={Detail} />
      <Detail exact path="/form" component={Form} />
    </div>
  );
}

export default App;
