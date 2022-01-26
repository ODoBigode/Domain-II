
import './App.css';
import React, { useState } from 'react';
import { GameRender, TitleScreen, UserCreation } from './game';
// import { StoryRender } from './GameComponents/storyAndOptions';
import styles from './GameComponents/GameStyles.module.css';
import logo from './GameComponents/logo.svg'; // Não esquece de implementar imagem

function App() {
  const [logged, setLogged] = useState(false)

  if(!logged) return <TitleScreen />

  return (
    <div className="App">
      <GameRender /> 
    </div>
  )

  
}


  


export default App;
