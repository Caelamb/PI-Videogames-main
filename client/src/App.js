import './App.css';
import Landing from "./views/landing/Landing"
import Home from './views/home/Home';
import Form from "./views/form/Form";
import Detail from "./views/detail/Detail";
import React from 'react';
import {  Route, Routes } from 'react-router-dom';
function App() {

  const [showHomePage, setshowHomePage] = React.useState(false);

  // Función para mostrar la HomePage al hacer clic en el botón "Ingresar"
  const handleEnterClick = () => {
    setshowHomePage(true);
  };

  let content;

  if (showHomePage) {
    content = <Home />;
  } else {
    content = <Landing onEnterClick={handleEnterClick} />;
  }

  return (
    <div className="App">
      <Routes>
       <Route path="/" element={content} />
       <Route exact path="/home" element={<Home />}/>
       <Route exact path="/form" element={<Form />} />
       <Route exact path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
