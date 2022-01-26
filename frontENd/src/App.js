
import './App.css';
import React, { useState } from 'react';
import { GameRender, TitleScreen, UserCreation } from './game';
// import { StoryRender } from './GameComponents/storyAndOptions';
import styles from './GameComponents/GameStyles.module.css';
import logo from './GameComponents/logo.svg'; // Não esquece de implementar imagem
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

function App() {
  //const [logged, setLogged] = useState(false)

  //if(!logged) return <TitleScreen />

  return (
    <div className="App">
      {/* <GameRender />  */}
      <Routes>
        <Route path='/signup' element={<UserCreation/>} />
        <Route path='/' element={<TitleScreen/>} />
        
      </Routes>
    </div>
  )

  
}





export default App;
