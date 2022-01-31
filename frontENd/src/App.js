
import './App.css';
import React, { useState } from 'react';
import { GameRender, GameRender1, GameRender11, GameRender12, GameRender13, GameRenderEnd, GameRenderEndPre, GameRenderOver1, GameRenderOver2, GameRenderOver3, GameRenderOverRun, GameRenderxx3, GameRenderxx31, TitleScreen, UserCreation, UserLogin } from './game';
// import { StoryRender } from './GameComponents/storyAndOptions';
// import styles from './GameComponents/GameStyles.module.css';
// import logo from './GameComponents/logo.svg'; // Não esquece de implementar imagem
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

function App() {
  //const [logged, setLogged] = useState(false)

  //if(!logged) return <TitleScreen />

  return (
    <div className="App">
      {/* <GameRender />  */}
      <Routes>
        <Route path='/api/signup' element={<UserCreation/>} />
        <Route path='/' element={<TitleScreen/>} />
        <Route path='/api/login' element={<UserLogin />} />
        <Route path='/api/game1' element={<GameRender1 />}/>
        <Route path='/api/game11' element={<GameRender11 />}/>
        <Route path='/api/game12' element={<GameRender12 />}/>
        <Route path='/api/game13' element={<GameRender13 />}/>
        <Route path='/api/game111' element={<GameRenderOver1 />}/>
        <Route path='/api/game121' element={<GameRenderOver1 />}/>
        <Route path='/api/game131' element={<GameRenderOver1 />}/>
        <Route path='/api/game112' element={<GameRenderOverRun />}/>
        <Route path='/api/game122' element={<GameRenderOverRun />}/>
        <Route path='/api/game132' element={<GameRenderOverRun />}/>
        <Route path='/api/game113' element={<GameRenderxx3 />}/>
        <Route path='/api/game123' element={<GameRenderxx3 />}/>
        <Route path='/api/game133' element={<GameRenderxx3 />}/>

        <Route path='/api/game1131' element={<GameRenderxx31 />}/>
        <Route path='/api/game1231' element={<GameRenderxx31 />}/>
        <Route path='/api/game1331' element={<GameRenderEndPre />}/>



        <Route path='/api/game1311' element={<GameRenderEnd />}/>
        <Route path='/api/game1312' element={<GameRenderOver3 />}/>



        
        
        
        
      </Routes>
    </div>
  )

  
}

export default App;