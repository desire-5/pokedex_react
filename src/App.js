import React from 'react';
import logo from './logo.svg';
import './App.css';
import PokemonDatail  from './components/PokemonDetail';
import Main from './components/main';
import { BrowserRouter,Route,Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Main} />
      <Route exact path='/:id?' component={PokemonDatail} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
