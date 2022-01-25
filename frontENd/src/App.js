import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { GameRender, TitleScreen, UserCreation } from './game';
import { StoryRender } from './GameComponents/storyAndOptions';

function App() {
  const [logged, setLogged] = useState(true)

  if(!logged){
    return (<div >
      <TitleScreen />
      <input type='submit' ></input>
      
    </div>
  )}


  return (
    <div className="App">
      <GameRender />
      
    </div>
  )

  
}

export default App;
